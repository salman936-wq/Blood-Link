"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PaginationBlodReq = ({ totalPages }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Current page from URL
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="join flex justify-center mt-10">
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <input
            key={page}
            type="radio"
            name="pagination"
            className="join-item btn btn-square"
            aria-label={page.toString()}
            checked={currentPage === page}
            onChange={() => handlePageChange(page)}
          />
        );
      })}
    </div>
  );
};

export default PaginationBlodReq;