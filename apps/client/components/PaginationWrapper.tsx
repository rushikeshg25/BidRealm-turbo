"use client";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
type PaginationProps = {
  totalPages: number;
};

const PaginationWrapper = ({ totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            className={
              currentPage - 1 === 0 ? `pointer-events-none opacity-50` : ""
            }
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={createPageURL(i + 1)}
              className={
                currentPage - 1 === 0 ? `pointer-events-none opacity-50` : ""
              }
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            className={
              currentPage - 1 === 0 ? `pointer-events-none opacity-50` : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>

    // <div className='flex items-center justify-center gap-3'>
    //   <Button size='icon' asChild>
    //     <Link
    //       href={createPageURL(currentPage - 1)}
    //       className={
    //         currentPage - 1 === 0 ? `pointer-events-none opacity-50` : ""
    //       }
    //     >
    //       <ChevronLeft />
    //     </Link>
    //   </Button>
    //   <Button size='icon' asChild>
    //     <Link
    //       href={createPageURL(currentPage + 1)}
    //       className={
    //         currentPage >= totalPages ? `pointer-events-none opacity-50` : ""
    //       }
    //     >
    //       <ChevronRight />
    //     </Link>
    //   </Button>
    // </div>
  );
};

export default PaginationWrapper;
