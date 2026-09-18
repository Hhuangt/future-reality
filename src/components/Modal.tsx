import { motion, AnimatePresence } from "motion/react";
import { useEffect, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
          id="modal-overlay"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-[#1b1c1c]/40 backdrop-blur-xs"
            onClick={onClose}
            id="modal-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.05 }}
            className="relative w-full max-w-2xl bg-brand-bg border-[1.5px] border-brand-dark p-6 md:p-8 outline-hidden z-10 select-text shadow-[5px_5px_0px_0px_rgba(26,26,26,1)]"
            id="modal-container"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-brand-dark pb-4 mb-6">
              <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-brand-dark">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="group flex items-center justify-center border border-transparent hover:border-brand-dark p-1 transition-all duration-150 text-brand-dark hover:bg-brand-dark hover:text-white cursor-pointer"
                aria-label="Close modal"
                id="modal-close-btn"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar text-brand-dark">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
