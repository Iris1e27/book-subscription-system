import {useEffect, useState} from "react";
import {Wrapper} from "./Wrapper";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";

export const User = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 15;
    const offset = currentPage * PER_PAGE;
    const currentPageData = users
        .slice(offset, offset + PER_PAGE)
        .map(user => {
                    return <tr key={user.user_id}>
                        <td>{user.user_id}</td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td>
                            <a href="#" className="btn btn-sm btn-outline-secondary"
                               onClick={e => del(user.user_id)}
                            >
                                Delete
                            </a>
                        </td>
                        <td>
                            <a
                              href='#'
                              className='btn btn-sm btn-outline-secondary'
                              onClick={(e) => update(user.user_id)}
                            >
                              Update
                            </a>
                        </td>
                    </tr>
                })
    const pageCount = Math.ceil(users.length / PER_PAGE);

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8000/users');
            const content = await response.json();
            setUsers(content);
        })();
    }, []);

    const del = async (user_id) => {
        if (window.confirm('Are you sure to delete this record?')) {
            await fetch(`http://localhost:8000/users/${user_id}`, {
                method: 'DELETE'
            });

            setUsers(users.filter(obj => obj.user_id !== user_id));
        }
    }

    const update = async (user_id) => {
    const update_str = String(window.prompt('Type a string to change the address', ''));

    await fetch(`http://localhost:8000/users/${user_id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        update_str,
      }),
    });

    window.location.reload();
  };

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }


    return <Wrapper>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <Link to={`/create-a-user`} className="btn btn-sm btn-outline-secondary">Add</Link>
        </div>

        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th scope="col">user_id</th>
                    <th scope="col">email</th>
                    <th scope="col">address</th>
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
    </Wrapper>
}