const Pagination = () => {
  return (
    <div className="flex justify-center space-x-1 my-10">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(page => (
        <button key={page} className="btn btn-sm">
          {page}
        </button>
      ))}
      <button className="btn btn-sm">Next</button>
    </div>
  );
};

export default Pagination;
