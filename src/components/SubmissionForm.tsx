import { useState, FormEvent } from "react";
import { Submission } from "../types";

interface SubmissionFormProps {
  type: "work" | "partner" | "opencall" | "inquiry";
  onSuccess: (submission: Submission) => void;
  initialCategory?: string;
}

export default function SubmissionForm({ type, onSuccess, initialCategory }: SubmissionFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(initialCategory || "");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Please add your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setFormError("Please add a valid email address.");
      return;
    }
    if (type !== "inquiry" && !title.trim() && type !== "partner") {
      setFormError("Please add a project title.");
      return;
    }
    if (!message.trim()) {
      setFormError("Please add a short message.");
      return;
    }

    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      const newSubmission: Submission = {
        id: Math.random().toString(36).substring(2, 9),
        type: type === "inquiry" ? "partner" : type,
        name,
        email,
        title: title || undefined,
        category: category || undefined,
        organization: organization || undefined,
        message: `${message}${url ? ` | Project URL: ${url}` : ""}`,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      try {
        const existing = localStorage.getItem("fvr_submissions");
        const list = existing ? JSON.parse(existing) : [];
        list.push(newSubmission);
        localStorage.setItem("fvr_submissions", JSON.stringify(list));
      } catch (err) {
        console.error("Localstorage save failed", err);
      }

      setIsSubmitting(false);
      onSuccess(newSubmission);

      // Clear state
      setName("");
      setEmail("");
      setTitle("");
      setCategory("");
      setOrganization("");
      setMessage("");
      setUrl("");
    }, 800);
  };

  const field =
    "w-full bg-transparent border-b border-brand-line py-2.5 font-sans text-[15px] text-brand-ink placeholder:text-brand-muted/60 focus:outline-none focus:border-brand-amber transition-colors";
  const labelCls = "label text-[10px] text-brand-muted mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-7" id={`form-${type}`} noValidate>
      {formError && (
        <p role="alert" className="border-l-2 border-brand-accent pl-3 font-sans text-sm text-brand-cream">
          {formError}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <label className="flex flex-col">
          <span className={labelCls}>{type === "partner" ? "Your name" : "Full name"}</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={field} autoComplete="name" required />
        </label>
        <label className="flex flex-col">
          <span className={labelCls}>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} autoComplete="email" required />
        </label>
      </div>

      {type === "partner" && (
        <label className="flex flex-col">
          <span className={labelCls}>Organization</span>
          <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} className={field} autoComplete="organization" />
        </label>
      )}

      {(type === "work" || type === "opencall") && (
        <label className="flex flex-col">
          <span className={labelCls}>Project title</span>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={field} required />
        </label>
      )}

      {type === "opencall" && (
        <label className="flex flex-col">
          <span className={labelCls}>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${field} bg-brand-surface cursor-pointer`} required>
            <option value="">Select a category</option>
            <option value="AI Films">AI Films</option>
            <option value="Hybrid Narratives">Hybrid Narratives</option>
            <option value="Immersive Experiences">Immersive Experiences</option>
            <option value="Experimental Storytelling">Experimental Storytelling</option>
          </select>
        </label>
      )}

      {(type === "work" || type === "opencall") && (
        <label className="flex flex-col">
          <span className={labelCls}>Link (optional)</span>
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} className={field} />
        </label>
      )}

      <label className="flex flex-col">
        <span className={labelCls}>{type === "partner" ? "How would you like to collaborate?" : "Message"}</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full bg-transparent border border-brand-line p-3 font-sans text-[15px] text-brand-ink leading-relaxed focus:outline-none focus:border-brand-amber resize-none transition-colors"
          required
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 bg-brand-accent text-brand-bg font-sans text-[12px] font-extrabold uppercase tracking-[0.2em] hover:bg-brand-accent-bright transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        id={`submit-btn-${type}`}
      >
        {isSubmitting ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
