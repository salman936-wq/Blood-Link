"use client";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="text-sm text-gray-600">{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}
