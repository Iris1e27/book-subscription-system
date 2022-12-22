import React, { useEffect, useState } from 'react';
import { WrapperID } from './WrapperID';
import ReactPaginate from "react-paginate";

const BOOK_SERVER_URL = 'http://127.0.0.1:8001'

export const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 15;
    const offset = currentPage * PER_PAGE;
    const currentPageData = books
        .slice(offset, offset + PER_PAGE)
        .map((book) => {
              return (
                <tr key={book.book_id}>
                  <td>{book.book_id}</td>
                  <td>{book.book_name}</td>
                  <td>{book.price}</td>
                  <td>{book.quantity}</td>
                </tr>
              );
            })
    const pageCount = Math.ceil(books.length / PER_PAGE);

  useEffect(() => {
    (async () => {
      const response = await fetch(BOOK_SERVER_URL+'/books');
      const content = await response.json();
      setBooks(content);
    })();
  }, []);


  function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
  }

  return (
    <WrapperID>

        <p></p>
        <p>Our book list</p>

      <div className='table-responsive'>
        <table className='table table-striped table-sm'>
          <thead>
            <tr>
              <th scope='col'>book_id</th>
              <th scope='col'>book_name</th>
              <th scope='col'>price</th>
              <th scope='col'>quantity</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData}
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
          </tbody>
        </table>
      </div>
    </WrapperID>
  );
};