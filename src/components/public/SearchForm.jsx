"use client";

import { useState } from "react";
import { Search, MapPin, Droplet } from "lucide-react";
import { bloodGroups, divisions, districts } from "@/lib/data";

export default function SearchForm({ compact = false }) {
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`w-full rounded-3xl border border-base-200 bg-white p-4 shadow-xl lg:p-5 grid gap-4 ${
        compact ? "sm:grid-cols-[1fr_1fr_auto]" : "sm:grid-cols-5"
      }`}
    >
      {/* Blood Group */}
      <div className="col-span-2 flex flex-col gap-2 lg:flex-row lg:items-center">
  <label className="min-w-28 text-sm font-medium text-gray-700">
    Blood Group
  </label>

  <div className="grid flex-1 grid-cols-4 gap-2 sm:grid-cols-8">
    {bloodGroups.map((group) => (
      <label
        key={group}
        className={`flex h-11 cursor-pointer items-center justify-center rounded-full border text-sm font-medium transition-all ${
          bloodGroup === group
            ? "border-primary bg-primary text-white"
            : "border-gray-300 hover:border-primary hover:text-primary"
        }`}
      >
        <input
          type="radio"
          name="bloodGroup"
          value={group}
          checked={bloodGroup === group}
          onChange={() => setBloodGroup(group)}
          className="hidden"
        />
        {group}
      </label>
    ))}
  </div>
</div>

      {/* Division */}
      <div>
        <div className="flex h-12 items-center gap-3 rounded-xl border border-base-300 px-4 transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
          <MapPin className="h-5 w-5 text-primary shrink-0" />

          <select
            value={division}
            onChange={(e) => {
              setDivision(e.target.value);
              setDistrict("");
            }}
            className="w-full bg-transparent outline-none"
          >
            <option value="">Division</option>

            {divisions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* District / Upazila */}
      {!compact ? (
        <div>
          <div className="flex h-12 items-center gap-3 rounded-xl border border-base-300 px-4 transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            <MapPin className="h-5 w-5 text-primary shrink-0" />

            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!division}
              className="w-full bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">District</option>

              {division &&
                districts[division].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
        </div>
      ) : (
        <button
          type="submit"
          className="btn h-12 rounded-xl border-0 bg-primary px-6 text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      )}

      {!compact && (
        <button
          type="submit"
          className="btn h-12 rounded-xl border-0 bg-primary px-6 text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl"
        >
          <Search className="h-4 w-4" />
          Search Donors
        </button>
      )}
    </form>
  );
}