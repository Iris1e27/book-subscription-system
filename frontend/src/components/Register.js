import { Wrapper } from './Wrapper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

export const Register = () => {
  const [userID, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  // const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    await fetch(
      'http://localhost:8000/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000/',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({
          userID,
          email,
          address,
          // password,
        }),
      },
      (window.location.href = '/')
    );

    await navigate(-1);
  };

  return (
    // <Wrapper>
    <>
      <header className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
        <a className='navbar-brand col-md-3 col-lg-2 me-0 px-3' href='#'>
          Book Subscription System
        </a>

        <div className='navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link className='nav-link px-3' as={Link} to='/login'>
              Login
            </Nav.Link>

            <Nav.Link className='nav-link px-3' as={Link} to='#'>
              Welcome
            </Nav.Link>
          </Nav>
        </div>
      </header>

      <div className='container'>
        <form className='mt-3' onSubmit={submit}>

          <div className='form-floating pb-3'>
            <input
              type='string'
              className='form-control'
              placeholder='e_mail'
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>email</label>
          </div>

          <div className='form-floating pb-3'>
            <input
              type='string'
              className='form-control'
              placeholder='address'
              onChange={(e) => setAddress(e.target.value)}
            />
            <label>address</label>
          </div>

          <button className='w-100 btn btn-lg btn-primary' type='submit'>
            Submit
          </button>
        </form>
        {/* // </Wrapper> */}
      </div>
    </>
  );
};