import {useEffect, useState} from "react";
import {Wrapper} from "./Wrapper";
import {Link} from "react-router-dom";

export const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8000/orders');
            const content = await response.json();
            setOrders(content);
        })();
    }, []);

    const del = async order_id => {
        if (window.confirm('Are you sure to delete this record?')) {
            await fetch(`http://localhost:8000/orders/${order_id}`, {
                method: 'DELETE'
            });

            setOrders(orders.filter(obj => obj.order_id !== order_id));
        }
    }

    return <Wrapper>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <Link to={`/create-an-order`} className="btn btn-sm btn-outline-secondary">Add</Link>
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
                    <th scope="col">subcribed_at</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => {
                    return <tr key={order.order_id}>
                        <td>{order.order_id}</td>
                        <td>{order.user_id}</td>
                        <td>{order.book_id}</td>
                        <td>{order.book_name}</td>
                        <td>{order.price}</td>
                        <td>{order.subcribed_at}</td>
                        <td>
                            <a href="#" className="btn btn-sm btn-outline-secondary"
                               onClick={e => del(order.order_id)}
                            >
                                Delete
                            </a>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    </Wrapper>
}