type Props = {
  totalPages: number;
  currentPage: number;
  onClick: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onClick,
}) => {
  return (
    <nav>
      <button
        onClick={() => onClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onClick(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => onClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </nav>
  );
};
