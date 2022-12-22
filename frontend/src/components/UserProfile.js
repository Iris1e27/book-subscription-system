import React from "react";
import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import { WrapperID } from './WrapperID';


const USER_SERVER_URL = 'http://127.0.0.1:8000'

export const UserProfile = () => {
  const user_params = useParams();
  let user_id = parseInt(user_params.user_id);
  const [user, setUser] = useState([]);

   useEffect(() => {
        (async () => {
            const response = await fetch(USER_SERVER_URL+'/users/'+user_id);
            const content = await response.json();
            setUser(content);
        })();
    }, [user_id]);

    const del = async (user_id) => {
        if (window.confirm('Are you sure to delete this record?')) {
            await fetch(USER_SERVER_URL+`/users/${user_id}`, {
                method: 'DELETE'
            });

            window.location.href='/'
        }
    }

     const update = async (user_id) => {
        var update_str = prompt('Type a string to change the address', '');

        if (update_str === null) {
            return;
        }

        await fetch(USER_SERVER_URL+`/users/${user_id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                update_str,
            }),
        });

        window.location.reload();
    };


  return (
      <WrapperID>
    <div>
        <p></p>
        <p>Your user profile</p>
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
                    <tr key={user.user_id}>
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
                </tbody>
            </table>
        </div>
    </div>
          </WrapperID>
  );
};

