import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from './Wrapper';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

export const Login = () => {
  const [id] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log('data:' + JSON.stringify(data));

      if (data.success) {
        // await navigate('/products');
      } else {
        // Login failed, display an error message
        setError(data.message);
      }
    } catch (error) {
      // An error occurred, display a message
      setError(error.message);
    }
    //await navigate('');
  };

  //   const submit_google = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const response = await fetch('http://localhost:8000/google', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           email,
  //           password,
  //         }),
  //       });
  //       const data = await response.json();
  //       console.log('data:' + JSON.stringify(data));

  //       if (data.success) {
  //         // await navigate('/products');
  //       } else {
  //         // Login failed, display an error message
  //         setError(data.message);
  //       }
  //     } catch (error) {
  //       // An error occurred, display a message
  //       setError(error.message);
  //     }

  return (
    <>
      <header className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
        <a className='navbar-brand col-md-3 col-lg-2 me-0 px-3' href='#'>
          Book Subscription System
        </a>

        <div className='navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link className='nav-link px-3' as={Link} to='/register'>
              Register
            </Nav.Link>

            <Nav.Link className='nav-link px-3' as={Link} to='#'>
              Welcome
            </Nav.Link>
          </Nav>
        </div>
      </header>

      <div className='container'>
        <main>
          <div className='py-5 text-center'>
            <h2>Login To Your Account</h2>
          </div>

          <form onSubmit={submit}>
            <div className='row g-3'>
              <div className='col-sm-6'>
                <label className='form-label'>Email</label>
                <input
                  className='form-control'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <hr className='my-4' />
            <button className='w-100 btn btn-primary btn-lg' type='submit'>
              Log in
            </button>
          </form>
        </main>
      </div>
    </>
  );
};