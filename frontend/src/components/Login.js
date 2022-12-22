import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

let admin_link = '/';
export const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleClickGoogle = async (e) => {
    e.preventDefault();

    window.location.href="http://127.0.0.1:5000"
  };

  // const handleClickLogin = async (e) => {
  //   e.preventDefault();
  //
  //   window.location.href="http://127.0.0.1:5000"
  // };

  let google_link = 'https://support.google.com/accounts/answer/27441?hl=zh-Hans';

  return (
    <>

      <header className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
        <a className='navbar-brand col-md-3 col-lg-2 me-0 px-3' href={admin_link}>
          Book Subscription System
        </a>

        <div className='navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link className='nav-link px-3' as={Link} to='/register'>
              Register
            </Nav.Link>
            <Nav.Link className='nav-link px-3' as={Link} to={admin_link}>
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

          <div className='py-5 text-center'>
            <p>In order to protect your account, please use <b>your google account</b> to login</p>
            <p>If you don't have a google account, please click <a href={google_link}>here</a> to register a google account first</p>
          </div>

          {/*<form>*/}
          {/*  <div className='row g-3'>*/}
          {/*    <center>*/}
          {/*    <div className='col-sm-6'>*/}
          {/*      <label className='form-label'>Email</label>*/}
          {/*      <input*/}
          {/*        className='form-control'*/}
          {/*        onChange={(e) => setEmail(e.target.value)}*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*    </center>*/}
          {/*  </div>*/}
          {/*  <center>*/}
          {/*  <hr className='my-4' />*/}
          {/*  <button className='w-30 btn btn-primary center' onClick={handleClickLogin}>*/}
          {/*    Log in*/}
          {/*  </button></center>*/}
          {/*</form>*/}
          {/*<p></p>*/}
          <center>
          <botton className='w-30 btn btn-primary center' onClick={handleClickGoogle}>Google Login</botton>
          </center>
        </main>
      </div>
    </>
  );
};