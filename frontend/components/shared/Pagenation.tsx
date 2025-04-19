"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

type PagenationProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>; // Correctly typed state setter
  page: number;
  totalItems: number;
  itemsPerPage: number;
};

const Pagenation = ({
  setPage,
  page,
  totalItems,
  itemsPerPage,
}: PagenationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage); // this 4 its the itemsPerPage

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevious} disabled={page === 1} />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink onClick={() => setPage(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={handleNext} disabled={page === totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Pagenation;
