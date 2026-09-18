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
      setFormError("Name/Representative field is required.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setFormError("A valid email address is required.");
      return;
    }
    if (type !== "inquiry" && !title.trim() && type !== "partner") {
      setFormError("Project/Pitch title is required.");
      return;
    }
    if (!message.trim()) {
      setFormError("Description or message is required.");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id={`form-${type}`}>
      {formError && (
        <div className="border border-red-500 text-red-600 p-3 bg-red-50 text-xs font-sans tracking-wide">
          {formError}
        </div>
      )}

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Fields */}
        <div className="flex flex-col">
          <label className="font-mono text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-1">
            {type === "partner" ? "YOUR NAME / REPRESENTATIVE" : "FULL NAME"}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rachel Sterling"
            className="border-b border-brand-dark text-brand-dark py-2 focus:outline-hidden placeholder-[#c6c6c6] font-sans text-sm focus:border-brand-accent bg-transparent transition-colors"
            required
          />
        </div>

        {/* Email Fields */}
        <div className="flex flex-col">
          <label className="font-mono text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-1">
            EMAIL ADDRESS
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. connect@domain.com"
            className="border-b border-brand-dark text-brand-dark py-2 focus:outline-hidden placeholder-[#c6c6c6] font-sans text-sm focus:border-brand-accent bg-transparent transition-colors"
            required
          />
        </div>
      </div>

      <div className="space-y-6 mt-6">
        {/* Organization for Partners */}
        {type === "partner" && (
          <div className="flex flex-col">
            <label className="font-mono text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-1">
              ORGANIZATION / INSTITUTION NAME
            </label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g. Museum of Algorithmic Arts"
              className="border-b border-brand-dark text-brand-dark py-2 focus:outline-hidden placeholder-[#c6c6c6] font-sans text-sm focus:border-brand-accent bg-transparent transition-colors"
            />
          </div>
        )}

        {/* Project Title for Work and Open Call */}
        {(type === "work" || type === "opencall") && (
          <div className="flex flex-col">
            <label className="font-mono text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-1">
              PROJECT / ARTWORK TITLE
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Synaptic Echoes v2"
              className="border-b border-brand-dark text-brand-dark py-2 focus:outline-hidden placeholder-[#c6c6c6] font-sans text-sm focus:border-brand-accent bg-transparent transition-colors"
              required
            />
          </div>
        )}

        {/* Category Selector */}
        {type === "opencall" && (
          <div className="flex flex-col">
            <label className="font-mono text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-1">
              PROPOSED CATEGORY
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border-b border-brand-dark text-brand-dark py-2 focus:outline-hidden font-sans text-sm bg-brand-bg appearance-none cursor-pointer focus:border-brand-accent transition-colors"
              required
            >
              <option value="">Select an Open Call Category</option>
              <option value="AI Films">AI Films</option>
              <option value="Hybrid Narratives">Hybrid Narratives</option>
              <option value="Immersive Experiences">Immersive Experiences</option>
              <option value="Experimental Storytelling">Experimental Storytelling</option>
            </select>
          </div>
        )}

        {/* Project URL */}
        {(type === "work" || type === "opencall") && (
          <div className="flex flex-col">
            <label className="font-mono text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-1">
              PORTFOLIO, DRAFT, OR CODE REPOSITORIES LINK (OPTIONAL)
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. https://github.com/creators/project"
              className="border-b border-brand-dark text-brand-dark py-2 focus:outline-hidden placeholder-[#c6c6c6] font-sans text-sm focus:border-brand-accent bg-transparent transition-colors"
            />
          </div>
        )}

        {/* Message / Decription Text */}
        <div className="flex flex-col">
          <label className="font-mono text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-1">
            {type === "work"
              ? "METHODOLOGY & CONCEPT STATEMENT"
              : type === "partner"
              ? "PARTNERSHIP VISION & INTEREST"
              : type === "opencall"
              ? "CONCEPT PITCH / TECHNICAL WORKFLOW DESCRIPTION"
              : "YOUR INQUIRY MESSAGE"}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder={
              type === "work"
                ? "Describe the algorithms, training pipelines, and underlying systems used to translate your creative imagination."
                : type === "partner"
                ? "Explain how your brand, center, or foundation would like to collaborate with Future Reality."
                : type === "opencall"
                ? "Provide a clear abstract outlining your vision, required display hardware, and software platforms."
                : "Type your message here..."
            }
            className="border border-brand-dark p-3 text-brand-dark focus:outline-hidden placeholder-[#c6c6c6] font-sans text-sm focus:border-brand-accent bg-transparent resize-none leading-relaxed transition-colors"
            required
          />
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 px-8 py-4 bg-brand-dark text-white hover:bg-brand-accent transition-all duration-200 uppercase font-mono font-bold text-[11px] tracking-widest flex items-center justify-center gap-2 w-full disabled:bg-neutral-600 disabled:cursor-not-allowed shadow-[3px_3px_0px_0px_rgba(230,57,70,0.5)] hover:shadow-[5px_5px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] cursor-pointer"
        id={`submit-btn-${type}`}
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin block h-3 w-3 border-2 border-white border-t-transparent"></span>
            SUBMITTING TO REGISTRY...
          </>
        ) : (
          "SUBMIT TO CENTRAL ARCHIVE"
        )}
      </button>
    </form>
  );
}
