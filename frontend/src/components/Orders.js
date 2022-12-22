import {useEffect, useState} from "react";
import {Wrapper} from "./Wrapper";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";


const ORDER_SERVER_URL = 'http://127.0.0.1:8002'

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 15;
    const offset = currentPage * PER_PAGE;
    const currentPageData = orders
        .slice(offset, offset + PER_PAGE)
        .map(order => {
                    return <tr key={order.order_id}>
                        <td>{order.order_id}</td>
                        <td>{order.user_id}</td>
                        <td>{order.book_id}</td>
                        <td>{order.book_name}</td>
                        <td>{order.price}</td>
                        <td>{order.quantity}</td>
                        <td>{order.subscribed_at}</td>
                        <td>
                            <a href="#" className="btn btn-sm btn-outline-secondary"
                               onClick={e => del(order.order_id)}
                            >
                                Delete
                            </a>
                        </td>
                        <td>
                            <a
                              href='#'
                              className='btn btn-sm btn-outline-secondary'
                              onClick={(e) => update(order.order_id)}
                            >
                              Update
                            </a>
                        </td>
                    </tr>
                })
    const pageCount = Math.ceil(orders.length / PER_PAGE);

    useEffect(() => {
        (async () => {
            const response = await fetch(ORDER_SERVER_URL+'/orders');
            const content = await response.json();
            setOrders(content);
        })();
    }, []);

    const del = async (order_id) => {
        if (window.confirm('Are you sure to delete this record?')) {
            await fetch(ORDER_SERVER_URL+`orders/${order_id}`, {
                method: 'DELETE'
            });

            setOrders(orders.filter(obj => obj.order_id !== order_id));
        }
    }

    const update = async (order_id) => {
        const update_num = Number(window.prompt('Type a number to change the quantity', ''));
        if (update_num === 0) {
                return;
            }
        await fetch(ORDER_SERVER_URL+`orders/${order_id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            update_num,
          }),
        });

        window.location.reload();
    };

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }


    return <Wrapper>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <Link to={`/orders/create-an-order`} className="btn btn-sm btn-outline-secondary">Add</Link>
        </div>

        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th scope="col">order_id</th>
                    <th scope="col">user_id</th>
                    <th scope="col">book_id</th>
                    <th scope="col">book_name</th>
                    <th scope="col">price</th>
                    <th scope="col">quantity</th>
                    <th scope="col">subscribed_at</th>
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