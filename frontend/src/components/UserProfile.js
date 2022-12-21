import React from "react";
import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {WrapperID} from "./WrapperID";

export const UserProfile = () => {
  const user_params = useParams();
  let user_id = user_params.user_id;
  const [user, setUser] = useState([]);

   useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8000/users/'+user_id);
            const content = await response.json();
            setUser(content);
        })();
    }, [user_id]);


    // console.log(user_params);
    const handleClick = e => {
      window.location.href='/'
    }

  return (
      <WrapperID>
    <div>
      <div className="card">

        <h1>Your User Profile</h1>

        <p>User ID: </p>
        <p className="title">{user_params.user_id}</p>
        <p>User Email: </p>
        <p className="title">{user.email}</p>
        <p>User Address:</p>
        <p className="title">{user.address}</p>

        <a href="#">
          <i className="fa fa-dribbble" />
        </a>
        <a href="#">
          <i className="fa fa-twitter" />
        </a>
        <a href="#">
          <i className="fa fa-linkedin" />
        </a>
        <a href="#">
          <i className="fa fa-facebook" />
        </a>
      <p>
          <button onClick={handleClick}>Back To Home</button>
        </p>
      </div>
    </div>
      </WrapperID>
  );
};

