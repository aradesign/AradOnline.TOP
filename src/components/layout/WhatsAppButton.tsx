"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton({ whatsapp }: { whatsapp: string }) {
  const message = encodeURIComponent(
    "سلام، می‌خواهم درباره ساخت سایت مشاوره بگیرم."
  );
  const url = `https://wa.me/${whatsapp}?text=${message}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40"
      aria-label="واتساپ"
    >
      <MessageCircle size={28} fill="white" />
    </motion.a>
  );
}
