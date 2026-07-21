"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const statuses = [
  "Pending",
  "Inprogress",
  "Completed",
  "Cancelled",
];

const FilterMyRequest = ({ paginationPage }) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleStatus = (status) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    if (paginationPage) {
      params.set("page", paginationPage);
    }

    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="btn btn-outline gap-2"
      >
        <Filter size={18} />
        Status
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-base-100 shadow-lg z-50">
          <button
            onClick={() => handleStatus("")}
            className="btn btn-ghost w-full justify-start rounded-none"
          >
            All Status
          </button>

          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => handleStatus(status)}
              className="btn btn-ghost w-full justify-start rounded-none"
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterMyRequest;