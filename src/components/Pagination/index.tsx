import React from "react";
import ReactPaginate from "react-paginate";

import { useSelector, useDispatch } from "react-redux";
import { filterSelector, setCurrentPage } from "../../redux/slices/filterSlice";

import styles from "./Pagination.module.scss";

type PaginationProps = {
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const { currentPage } = useSelector(filterSelector);
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event: any) =>
        dispatch(setCurrentPage(event.selected + 1))
      }
      pageRangeDisplayed={8}
      pageCount={totalPages}
      forcePage={currentPage ? currentPage - 1 : -1}
      //   forcePage={currentPage}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
