import { motion, AnimatePresence } from "motion/react";
import { useEffect, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  kicker?: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, kicker, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10" id="modal-overlay">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            id="modal-backdrop"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className="frame-corners relative w-full max-w-2xl bg-brand-surface border border-brand-line p-6 md:p-9 z-10"
            id="modal-container"
          >
            <div className="flex items-start justify-between gap-6 border-b border-brand-line pb-5 mb-6">
              <div className="space-y-2">
                {kicker && <span className="label text-brand-copper block">{kicker}</span>}
                <h3 className="font-display text-2xl md:text-3xl uppercase text-brand-ink leading-tight">{title}</h3>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 h-10 w-10 flex items-center justify-center border border-brand-line text-brand-ink hover:border-brand-cream transition-colors cursor-pointer"
                aria-label="Close"
                id="modal-close-btn"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="max-h-[68vh] overflow-y-auto pr-1 text-brand-ink">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
