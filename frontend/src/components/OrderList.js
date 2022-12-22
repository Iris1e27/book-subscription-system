import React, {useEffect, useState} from "react";
import {WrapperID} from "./WrapperID";
import {Link, useParams} from "react-router-dom";
import ReactPaginate from "react-paginate";

const ORDER_SERVER_URL = 'http://127.0.0.1:8002'

export const OrderList = () => {

    const user_params = useParams();
    let user_id = parseInt(user_params.user_id);

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 15;
    const offset = currentPage * PER_PAGE;
    const currentPageData = orders
        .slice(offset, offset + PER_PAGE)
        .map(order => { return order.user_id === user_id && <tr key={order.order_id}>
                        <td>{order.order_id}</td>
                        <td>{order.user_id}</td>
                        <td>{order.book_id}</td>
                        <td>{order.book_name}</td>
                        <td>{order.price}</td>
                        <td>{order.quantity}</td>
                        <td>{order.subscribed_at}</td>
                    </tr>
                })
    const pageCount = Math.ceil(orders.length / PER_PAGE);

    useEffect(() => {
        (async () => {
            const response = await fetch(ORDER_SERVER_URL+'/orders');
            const content = await response.json();
            setOrders(content);
        })();

    }, [user_id]);


    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }


    return <WrapperID>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <Link to={`/users/buy-an-order/`+user_id} className="btn btn-sm btn-outline-secondary">Buy</Link>
        </div>

        <p></p>
        <p>Your order list</p>

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
    </WrapperID>
}