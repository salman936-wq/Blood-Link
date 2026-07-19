"use client"
import { useState } from "react";
import { MapPin, Droplet, Copy, Phone } from "lucide-react";

export default function UserCollection({ data }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (id, phone) => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((d) => (
        <div
          key={d._id}
          className="rounded-2xl border border-gray-200 bg-white shadow-md shadow-gray-100/50 p-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <img
            src={d.image}
            alt={d.fullName || d.name}
            className="h-14 w-14 rounded-xl object-cover flex-shrink-0"
          />

          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-gray-900 truncate">
              {d.fullName || d.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{d.district}</span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 text-primary text-xs font-semibold px-2.5 py-1 mt-2">
              <Droplet className="h-3 w-3" /> {d.bloodGroup}
            </span>
          </div>

          <div className="relative flex-shrink-0">
            <button
              onClick={() => handleCopy(d._id, d.phone)}
              className="p-2 rounded-lg border border-gray-200 hover:border-primary hover:text-primary text-gray-400 transition-colors"
            >
              <Phone className="h-4 w-4" />
            </button>

            {copiedId === d._id && (
              <span className="absolute -top-8 right-0 whitespace-nowrap bg-gray-900 text-white text-[11px] font-medium px-2 py-1 rounded-md shadow-md animate-in fade-in">
                Copied number
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}