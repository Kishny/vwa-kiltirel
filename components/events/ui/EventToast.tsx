"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

type Props = {
  visible: boolean;
  message: string;
};

export function EventToast({ visible, message }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-vwa-dark/95 px-4 py-2 shadow-xl backdrop-blur-md md:bottom-6"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Check className="h-4 w-4 text-vwa-accent" aria-hidden="true" />
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}