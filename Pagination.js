import React, { useState } from 'react';
const Pagination = () => {
  // Create an array of 50 items
  const arrItems = Array.from({ length: 20 }, (_, i) => `Result  ${i + 1}`);
  // State to track the current page (starts at page 1)
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(arrItems.length / pageSize);
  //start is the index of the first item to show on the current page.
  /*If page = 1:
  (1 - 1) * 5 = 0 → start from index 0 (first item).

    If page = 2:
    (2 - 1) * 5 = 5 → start from index 5 (the 6th item).
 */
  const startIndex = (page - 1) * pageSize;

  // Slice items array to show only items for the current page
  const currentItems = arrItems.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <ul>
        {currentItems.map((item) => {
          return <li key={item}> {item} </li>;
        })}
      </ul>

      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setPage(i + 1)}
          style={{ fontWeight: page === i + 1 ? 'bold' : 'normal' }}
        >
          {i + 1}
        </button>
      ))}
      <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        Next
      </button>
    </>
  );
};

export default Pagination;
