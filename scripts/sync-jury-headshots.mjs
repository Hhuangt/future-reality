import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "jury");
const juryDataPath = path.join(root, "src", "juryData.ts");
const sheetCsv =
  "https://docs.google.com/spreadsheets/d/1VyxS0wqSVLMAWql8mqV7o8_b_XmLQ3jiDpTARW-Ar2o/export?format=csv&gid=125239168";

const cookieFile = path.join(
  process.env.HOME ?? "",
  ".cache/gdown/cookies.txt"
);

function slug(name) {
  return name
    .split(/[—–|]/)[0]
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (ch === "\r") {
      continue;
    } else {
      field += ch;
    }
  }

  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }

  const headers = rows.shift();
  return rows.map((cells) =>
    Object.fromEntries(headers.map((header, idx) => [header, cells[idx] ?? ""]))
  );
}

function driveId(url) {
  const match = url.match(/id=([A-Za-z0-9_-]+)/);
  return match?.[1] ?? null;
}

function canUseHeadshot(permission) {
  if (!permission) return true;
  const lower = permission.toLowerCase();
  if (lower.includes("not to be featured")) return false;
  if (lower.includes("organization only")) return false;
  return true;
}

function loadCookiesFromNetscape(filePath) {
  if (!fs.existsSync(filePath)) return [];

  const cookies = [];
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    if (!line || line.startsWith("#")) continue;
    const [domain, , cookiePath, secure, expires, name, ...valueParts] = line.split("\t");
    const value = valueParts.join("\t");
    if (!domain || !name) continue;

    cookies.push({
      name,
      value,
      domain,
      path: cookiePath || "/",
      expires: Number(expires) || -1,
      httpOnly: false,
      secure: secure === "TRUE",
      sameSite: "Lax",
    });
  }

  return cookies;
}

async function downloadHeadshot(page, fileId, destPath) {
  const viewUrl = `https://drive.google.com/file/d/${fileId}/view`;
  await page.goto(viewUrl, { waitUntil: "domcontentloaded", timeout: 60000 });

  if (page.url().includes("accounts.google.com")) {
    throw new Error(
      "Google sign-in required — sign into Chrome with an account that can open the headshot links"
    );
  }

  const forbidden = await page
    .locator("text=You need access")
    .or(page.locator("text=Access denied"))
    .first()
    .isVisible()
    .catch(() => false);
  if (forbidden) {
    throw new Error(
      "Drive returned “You need access” — share each headshot (or the folder) as “Anyone with the link” viewer, or with your Google account"
    );
  }

  const preview = page.locator('img[src*="googleusercontent"], img[src*="drive-viewer"]').first();
  await preview.waitFor({ state: "visible", timeout: 30000 });
  const src = await preview.getAttribute("src");
  if (!src) throw new Error("Preview image URL missing");

  const response = await page.request.get(src);
  if (!response.ok()) throw new Error(`Preview fetch failed (${response.status()})`);

  const buffer = await response.body();
  fs.writeFileSync(destPath, buffer);
}

function patchJuryData(photoMap) {
  let source = fs.readFileSync(juryDataPath, "utf8");

  for (const [id, photoPath] of Object.entries(photoMap)) {
    const needle = `"id": "${id}"`;
    const idx = source.indexOf(needle);
    if (idx === -1) continue;

    const slice = source.slice(idx, idx + 500);
    if (slice.includes('"photo"')) continue;

    source = source.replace(needle, `"id": "${id}",\n    "photo": "${photoPath}"`);
  }

  fs.writeFileSync(juryDataPath, source, "utf8");
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const csv = await fetch(sheetCsv).then((res) => res.text());
  const rows = parseCsv(csv);

  const targets = rows
    .map((row) => {
      const name = row["Full Name"]?.trim();
      const permission = row["Public profile permission"] ?? "";
      const headshot = row["Headshot (1:1 Ratio)"]?.trim() ?? "";
      if (!name || !headshot || !canUseHeadshot(permission)) return null;
      const id = driveId(headshot);
      if (!id) return null;
      return { id: slug(name), name, fileId: id };
    })
    .filter(Boolean);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const cookies = loadCookiesFromNetscape(cookieFile).filter((cookie) =>
    /google\.com$/.test(cookie.domain) || cookie.domain.includes("googleusercontent.com")
  );
  if (cookies.length) {
    await context.addCookies(cookies);
  }

  const page = await context.newPage();
  const photoMap = {};
  const failures = [];

  for (const target of targets) {
    const dest = path.join(outDir, `${target.id}.jpg`);
    try {
      await downloadHeadshot(page, target.fileId, dest);
      photoMap[target.id] = `/jury/${target.id}.jpg`;
      console.log(`saved ${target.name} -> ${dest}`);
    } catch (error) {
      failures.push({ name: target.name, reason: String(error) });
      console.error(`failed ${target.name}: ${error}`);
    }
  }

  await browser.close();

  if (Object.keys(photoMap).length) {
    patchJuryData(photoMap);
    console.log(`updated ${Object.keys(photoMap).length} photo paths in src/juryData.ts`);
  }

  if (failures.length) {
    console.error("\nSome headshots could not be downloaded:");
    for (const failure of failures) {
      console.error(`- ${failure.name}: ${failure.reason}`);
    }
    process.exitCode = failures.length === targets.length ? 1 : 0;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
