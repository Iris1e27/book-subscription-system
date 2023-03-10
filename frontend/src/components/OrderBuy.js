import {WrapperID} from "./WrapperID";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';

const ORDER_SERVER_URL = 'http://127.0.0.1:8002'

export const OrderBuy = () => {
    const [user_id, setUserId] = useState('');
    const [book_id, setBookId] = useState('');
    const [book_name, setBookName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const navigate = useNavigate();

    const submit = async e => {
        e.preventDefault();

        await fetch(ORDER_SERVER_URL+'/orders', {
            method: 'POST',
            body: JSON.stringify({
                user_id, book_id, book_name, price, quantity
            })
        });

        await navigate(-1);
    }

    return <WrapperID>
        <form className="mt-3" onSubmit={submit}>
            <div className="form-floating pb-3">
                <input type="number" className="form-control" placeholder="user_id"
                       onChange={e => setUserId(e.target.value)}
                />
                <label>user_id</label>
            </div>

            <div className="form-floating pb-3">
                <input type="number" className="form-control" placeholder="book_id"
                       onChange={e => setBookId(e.target.value)}
                />
                <label>book_id</label>
            </div>

            <div className="form-floating pb-3">
                <input type="string" className="form-control" placeholder="book_name"
                       onChange={e => setBookName(e.target.value)}
                />
                <label>book_name</label>
            </div>

            <div className="form-floating pb-3">
                <input type="number" className="form-control" placeholder="price"
                       onChange={e => setPrice(e.target.value)}
                />
                <label>price</label>
            </div>

            <div className="form-floating pb-3">
                <input type="number" className="form-control" placeholder="quantity"
                       onChange={e => setQuantity(e.target.value)}
                />
                <label>quantity</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </WrapperID>
}