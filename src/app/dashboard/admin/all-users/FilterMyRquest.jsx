"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const userTypes = ["Admin", "Donor", "Volunteer"];

export default function FilterMyRequest({ paginationPage }) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleStatus = (type) => {
    const params = new URLSearchParams(searchParams.toString());

    if (type) {
      params.set("userType", type.toLowerCase());
    } else {
      params.delete("userType");
    }

    if (paginationPage) {
      params.set("page", paginationPage);
    }

    router.replace(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  const currentType = searchParams.get("userType");

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="btn btn-outline gap-2"
      >
        <Filter size={18} />
        {currentType || "User Type"}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-base-100 shadow-lg z-50">
          <button
            onClick={() => handleStatus("")}
            className="btn btn-ghost w-full justify-start rounded-none"
          >
            All User
          </button>

          {userTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleStatus(type)}
              className="btn btn-ghost w-full justify-start rounded-none"
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}