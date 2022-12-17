import {useEffect, useState} from "react";
import {Wrapper} from "./Wrapper";
import {Link} from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8002/users');
            const content = await response.json();
            setUsers(content);
        })();
    }, []);

    const del = async id => {
        if (window.confirm('Are you sure to delete this record?')) {
            await fetch(`http://localhost:8002/users/${id}`, {
                method: 'DELETE'
            });

            setUsers(users.filter(p => p.id !== id));
        }
    }

    return <Wrapper>

        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">password</th>
                    <th scope="col">email</th>
                    <th scope="col">Total Amount</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => {
                    return <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td>{user.email}</td>
                        <td>{user.total_amount}</td>
                        <td>
                            <a href="#" className="btn btn-sm btn-outline-secondary"
                               onClick={e => del(user.id)}
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