"use client";
import { Search, MapPin, Droplet } from "lucide-react";
import { bloodGroups, districts } from "@/lib/data";

export default function SearchForm({ compact = false }) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`w-full rounded-2xl border border-gray-200 bg-white shadow-lg p-4 sm:p-5 grid gap-3 ${
        compact ? "sm:grid-cols-[1fr_1fr_auto]" : "sm:grid-cols-4"
      }`}
    >
      <label className="form-control">
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:border-primary transition-colors">
          <Droplet className="h-4 w-4 text-primary shrink-0" />
          <select className="select select-ghost w-full p-0 focus:outline-none bg-transparent" defaultValue="">
            <option value="" disabled>Blood group</option>
            {bloodGroups.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
          </select>
        </div>
      </label>
      <label className="form-control">
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:border-primary transition-colors">
          <MapPin className="h-4 w-4 text-primary shrink-0" />
          <select className="select select-ghost w-full p-0 focus:outline-none bg-transparent" defaultValue="">
            <option value="" disabled>District</option>
            {districts.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </label>
      {!compact && (
        <label className="form-control">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:border-primary transition-colors">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <input type="text" placeholder="Upazila" className="input w-full p-0 focus:outline-none bg-transparent" />
          </div>
        </label>
      )}
      <button type="submit" className="btn rounded-xl bg-primary hover:bg-red-700 text-white border-none shadow-md gap-2">
        <Search className="h-4 w-4" />
        Search donors
      </button>
    </form>
  );
}
