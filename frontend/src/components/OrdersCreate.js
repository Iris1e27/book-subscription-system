import {Wrapper} from "./Wrapper";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';

export const OrdersCreate = () => {
    const [user_id, setUserId] = useState('');
    const [book_id, setBookId] = useState('');
    const [book_name, setBookName] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const submit = async e => {
        e.preventDefault();

        await fetch('http://localhost:8000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({
                user_id, book_id, book_name, price
            })
        });

        await navigate(-1);
    }

    return <Wrapper>
        <form className="mt-3" onSubmit={submit}>
            <div className="form-floating pb-3">
                <input type="number" className="form-control" placeholder="Name"
                       onChange={e => setUserId(e.target.value)}
                />
                <label>user_id</label>
            </div>

            <div className="form-floating pb-3">
                <input type="number" className="form-control" placeholder="Price"
                       onChange={e => setBookId(e.target.value)}
                />
                <label>book_id</label>
            </div>

            <div className="form-floating pb-3">
                <input type="string" className="form-control" placeholder="Quantity"
                       onChange={e => setBookName(e.target.value)}
                />
                <label>book_name</label>
            </div>

            <div className="form-floating pb-3">
                <input type="number" className="form-control" placeholder="Quantity"
                       onChange={e => setPrice(e.target.value)}
                />
                <label>price</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </Wrapper>
}