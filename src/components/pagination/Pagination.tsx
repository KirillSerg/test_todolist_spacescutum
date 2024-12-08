import { DOTS, usePagination } from "../../hooks/usePagination";
import styles from "./pagination.module.css";

type Props = {
  onPageChange: (value: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};

export const Pagination: React.FC<Props> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <ul className={styles["pagination-container"]}>
      {/* Left navigation arrow */}
      <li
        className={`${styles["pagination-item"]} ${
          currentPage === 1 && styles["disabled"]
        }`}
        onClick={onPrevious}
      >
        <div className={`${styles["arrow"]} ${styles["left"]}`} />
      </li>
      {paginationRange &&
        paginationRange.map((pageNumber, i) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li
                key={pageNumber.toString() + i}
                className={`${styles["pagination-item"]} ${styles["dots"]}`}
              >
                &#8230;
              </li>
            );
          }

          // Render our Page Pills
          return (
            <li
              key={pageNumber.toString() + i}
              className={`${styles["pagination-item"]} ${
                pageNumber === currentPage && styles["selected"]
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
      {/*  Right Navigation arrow */}
      <li
        className={`${styles["pagination-item"]} ${
          currentPage === lastPage && styles["disabled"]
        }`}
        onClick={onNext}
      >
        <div className={`${styles["arrow"]} ${styles["right"]}`} />
      </li>
    </ul>
  );
};
