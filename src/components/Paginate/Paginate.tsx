import ReactPaginate from "react-paginate";

import css from "./Paginate.module.css";
interface PaginateProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Paginate({
  totalPages,
  currentPage,
  onPageChange,
}: PaginateProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
      renderOnZeroPageCount={null}
    />
  );
}
