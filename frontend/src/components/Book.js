import { useEffect, useState } from 'react';
import { Wrapper } from './Wrapper';
import { Link } from 'react-router-dom';

export const Book = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:8001/books');
      const content = await response.json();
      setBooks(content);
    })();
  }, []);

  const del = async (book_id) => {
    if (window.confirm('Are you sure to delete this record?')) {
      await fetch(`http://localhost:8001/books/${book_id}`, {
        method: 'DELETE',
      });

      setBooks(books.filter((obj) => obj.book_id !== book_id));
    }
  };

  const update = async (book_id) => {
    const update_num = Number(window.prompt('Type a number to change the quantity', ''));

    await fetch(`http://localhost:8001/books/${book_id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        update_num,
      }),
    });

    window.location.reload();
  };

  return (
    <Wrapper>
      <div className='pt-3 pb-2 mb-3 border-bottom'>
        <Link
          to={`/create-a-book`}
          className='btn btn-sm btn-outline-secondary'
        >
          Add
        </Link>
      </div>

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
            {books.map((book) => {
              return (
                <tr key={book.book_id}>
                  <td>{book.book_id}</td>
                  <td>{book.book_name}</td>
                  <td>{book.price}</td>
                  <td>{book.quantity}</td>
                  <td>
                    <a
                      href='#'
                      className='btn btn-sm btn-outline-secondary'
                      onClick={(e) => del(book.book_id)}
                    >
                      Delete
                    </a>
                  </td>
                  <td>
                    <a
                      href='#'
                      className='btn btn-sm btn-outline-secondary'
                      onClick={(e) => update(book.book_id)}
                    >
                      Update
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};
