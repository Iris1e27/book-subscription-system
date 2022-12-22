import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

let admin_link = '/';
export const Register = () => {
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

//   $.validateEmail("ev-f35dcb124285d93528dd3837478ee2fc");
//
// // OnClick
// $("#submit").click(function () {
//   $("#email").validateEmail(function (response) {
//     console.log(response);
//   })
// })

  const handleClickRegister = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:8000/users', {
            method: 'POST',
            body: JSON.stringify({
                email, address
            })
        });

    window.location.href = '/login'
  };

  let google_link = 'https://support.google.com/accounts/answer/27441?hl=zh-Hans';

  return (
    // <Wrapper>
    <>
      <header className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
        <a className='navbar-brand col-md-3 col-lg-2 me-0 px-3' href={admin_link}>
          Book Subscription System
        </a>

        <div className='navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link className='nav-link px-3' as={Link} to='/login'>
              Login
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
            <h2>Register For Your New Account</h2>
          </div>

          <div className='py-5 text-center'>
            <p>In order to protect your account, we only accept <b>a valid google account</b> for your register</p>
            <p>If you don't have a google account, please click <a href={google_link}>here</a> to register a google account first</p>
          </div>

          <form>

            <div className='row g-3'>
              <center>
              <div className='col-sm-6'>
                <label className='form-label'>Email</label>
                <input
                  className='form-control'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              </center>
            </div>
            <p></p>
            <div className='row g-3'>
              <center>
              <div className='col-sm-6'>
                <label className='form-label'>Address</label>
                <input
                  className='form-control'
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              </center>
            </div>

            <center>
            <hr className='my-4' />
            <button className='w-30 btn btn-primary center' onClick={handleClickRegister}>
              Register
            </button></center>
          </form>
        </main>
      </div>

    </>
  );
};