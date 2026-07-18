"use client";

import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { bloodGroups, districts, divisions } from "@/lib/data";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const FilterBlodRequest = ({datas, paginationPage}) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [division, setDivision] = useState(
    searchParams.get("division") || ""
  );
  const [district, setDistrict] = useState(
    searchParams.get("district") || ""
  );
  const [bloodGroup, setBloodGroup] = useState(
    searchParams.get("bloodGroup") || ""
  );

  // URL update
  useEffect(() => {
    const params = new URLSearchParams();

    if (division) params.set("division", division);
    if (district) params.set("district", district);
    if (bloodGroup) params.set("bloodGroup", bloodGroup);
    if (paginationPage) params.set("page", paginationPage || 0);

    router.replace(`${pathname}?${params.toString()}`);
  }, [division, district, bloodGroup, pathname, router, paginationPage]);

  <select
  value={division}
  onChange={(e) => {
    setDivision(e.target.value);
    setDistrict("");
  }}
></select>

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="btn btn-outline rounded-xl border-gray-300 text-gray-600 gap-2 mb-16 shrink-0"
      >
        <Filter className="h-4 w-4" />
        Filter
      </button>

      {open && (
        <div className="absolute top-10 right-0 mt-2 w-72 rounded-xl border bg-base-100 shadow-xl p-4 space-y-4 z-50">

          {/* Division */}
          <div>
            <label className="label">
              <span className="label-text">Division</span>
            </label>

            <select
              className="select select-bordered w-full"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
            >
              <option value="">All Division</option>

              {divisions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="label">
              <span className="label-text">District</span>
            </label>

            <select
              disabled={!division}
              className="select select-bordered w-full"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="">All District</option>

              {division &&
                districts[division].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>

          {/* Blood Group */}
          <div>
            <label className="label">
              <span className="label-text">Blood Group</span>
            </label>

            <select
              className="select select-bordered w-full"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option value="">All Blood Group</option>

              {bloodGroups.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-primary btn-sm w-full"
            onClick={() => {
              setDivision("");
              setDistrict("");
              setBloodGroup("");
            }}
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBlodRequest;