"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, MapPin, Droplet } from "lucide-react";
import { bloodGroups, divisions, districts } from "@/lib/data";

export default function SearchForm({ compact = false, paginationPage }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL থেকে initial value নেওয়া হচ্ছে (division বাদে, division শুধু UI ফিল্টারিং এর জন্য)
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState(searchParams.get("district") || "");
  const [bloodGroup, setBloodGroup] = useState(searchParams.get("bloodGroup") || "");

  // submit trigger - এটা বাড়লেই useEffect চলবে
  const [searchTrigger, setSearchTrigger] = useState(0);

  useEffect(() => {
    if (searchTrigger === 0) return; // প্রথমবার mount এ চালানো লাগবে না

    const params = new URLSearchParams();

    if (district) params.set("district", district);
    if (bloodGroup) params.set("bloodGroup", bloodGroup);
    if (paginationPage) params.set("page", paginationPage || 0);
    // division এখানে ইচ্ছাকৃতভাবে বাদ দেওয়া হয়েছে

    router.push(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTrigger]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setSearchTrigger((prev) => prev + 1);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
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

      {/* Division - শুধু district filter করার জন্য, URL এ যাবে না */}
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