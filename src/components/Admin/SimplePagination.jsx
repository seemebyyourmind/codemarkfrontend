

export function SimplePagination({ currentPage,numberPage, onPageChange }) {
  const next = () => {
    if (currentPage === numberPage) return;
    onPageChange(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  return (
    <div className="flex items-center gap-4 ">
      <button
        className={`px-4 py-2 border rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
        onClick={prev}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <span className="text-gray-700">
        Page <strong className="text-black dark:text-white">{currentPage}</strong> of <strong className="text-black dark:text-white">{numberPage}</strong>
      </span>
      <button
        className={`px-4 py-2 border rounded-lg ${currentPage === 10 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
        onClick={next}
        disabled={currentPage === numberPage}
      >
        &gt;
      </button>
    </div>
  );
}