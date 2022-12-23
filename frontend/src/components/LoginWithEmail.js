import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { AutoComplete } from 'antd';

const USER_SERVER_URL = 'http://127.0.0.1:8000';
let admin_link = '/';

export const LoginwithEmail = () => {
  const [email, setEmail] = useState('');
  const [user_id, setUser_id] = useState('');
  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    let res = ['gmail.com', '163.com', 'qq.com'].map((domain) => ({
      label: `@${domain}`,
    }));
    setOptions(res);
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();

    await fetch(USER_SERVER_URL + '/users/login', {
      method: 'POST',
      body: JSON.stringify({
        user_id,
        email,
      }),
    });
    window.location.href = '/users/' + String(user_id);
  };

  const handleChangeEmail = (data) => {
    setEmail(data);
  };

  const handleChangeUser_id = (data) => {
    setUser_id(data);
  };

  return (
    // <Wrapper>
    <>
      <header className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
        <a
          className='navbar-brand col-md-3 col-lg-2 me-0 px-3'
          href={admin_link}
        >
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
            <h2>Log in to Your Existing Account</h2>
          </div>

          <div className='row g-3'>
            <center>
              <div className='col-sm-6'>
                <p>Email</p>
                <AutoComplete
                  options={options}
                  style={{
                    width: 200,
                  }}
                  onSearch={handleSearch}
                  onChange={handleChangeEmail}
                  placeholder='input here'
                />
              </div>
            </center>
          </div>

          <p></p>
          <div className='row g-3'>
            <center>
              <div className='col-sm-6'>
                <p>User id</p>
                <AutoComplete
                  style={{
                    width: 200,
                  }}
                  onChange={handleChangeUser_id}
                  placeholder='input here'
                />
              </div>
            </center>
          </div>

          <center>
            <hr className='my-4' />
            <botton
              className='w-30 btn btn-primary center'
              onClick={handleClickLogin}
            >
              Login
            </botton>
          </center>
        </main>
      </div>
    </>
  );
};
