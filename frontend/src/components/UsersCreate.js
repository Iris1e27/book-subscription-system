import {Wrapper} from "./Wrapper";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';

export const UsersCreate = () => {
    const [userID, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const submit = async e => {
        e.preventDefault();

        await fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({
                userID, email, address
            })
        });

        await navigate(-1);
    }

    return <Wrapper>
        <form className="mt-3" onSubmit={submit}>
            <div className="form-floating pb-3">
                <input type="number"
                       className="form-control"
                       placeholder="user_id"
                       onChange={e => setUserId(e.target.value)}
                />
                <label>user_id</label>
            </div>

            <div className="form-floating pb-3">
                <input type="string"
                       className="form-control"
                       placeholder="e_mail"
                       onChange={e => setEmail(e.target.value)}
                />
                <label>email</label>
            </div>

            <div className="form-floating pb-3">
                <input type="string"
                       className="form-control"
                       placeholder="address"
                       onChange={e => setAddress(e.target.value)}
                />
                <label>address</label>
            </div>

            <button className='w-100 btn btn-lg btn-primary' type='submit'>
          Submit
        </button>
      </form>
    </Wrapper>
}