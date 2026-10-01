import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const juryDir = path.join(root, "public", "jury");
const juryDataPath = path.join(root, "src", "juryData.ts");

const extensions = [".jpg", ".jpeg", ".png", ".webp"];

function patchJuryData(photoMap) {
  let source = fs.readFileSync(juryDataPath, "utf8");

  for (const [id, photoPath] of Object.entries(photoMap)) {
    const idPattern = new RegExp(`"id": "${id}"`);
    const match = idPattern.exec(source);
    if (!match) continue;

    const start = match.index;
    const end = source.indexOf("}", start);
    const block = source.slice(start, end);
    if (block.includes('"photo"')) {
      source = source.replace(
        new RegExp(`("id": "${id}"[\\s\\S]*?"photo": ")[^"]*"`),
        `$1${photoPath}"`
      );
    } else {
      source = source.replace(`"id": "${id}"`, `"id": "${id}",\n    "photo": "${photoPath}"`);
    }
  }

  fs.writeFileSync(juryDataPath, source, "utf8");
}

function main() {
  if (!fs.existsSync(juryDir)) {
    console.error("No public/jury/ folder yet.");
    process.exit(1);
  }

  const files = fs.readdirSync(juryDir);
  const photoMap = {};

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!extensions.includes(ext)) continue;
    const id = path.basename(file, ext);
    photoMap[id] = `/jury/${file}`;
  }

  if (!Object.keys(photoMap).length) {
    console.error("No images in public/jury/ (expected names like rain-zhang.jpg).");
    process.exit(1);
  }

  patchJuryData(photoMap);
  console.log(`Linked ${Object.keys(photoMap).length} headshots in src/juryData.ts`);
  for (const [id, p] of Object.entries(photoMap)) {
    console.log(`  ${id} -> ${p}`);
  }
}

main();
