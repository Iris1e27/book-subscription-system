import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

let show_txt = 'Login';
let show_link = '/login';
let welcome_link = '/';

export const Wrapper = (props) => {

  return (
    <>
      <header className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
        <a className='navbar-brand col-md-3 col-lg-2 me-0 px-3' href={welcome_link}>
          Book Subscription System
        </a>

        <div className='navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link className='nav-link px-3' as={Link} to={show_link}>
              {show_txt}
            </Nav.Link>
            <Nav.Link className='nav-link px-3' as={Link} to={welcome_link}>
              Welcome
            </Nav.Link>
          </Nav>
        </div>
      </header>

      <div className='container-fluid'>
        <div className='row'>
          <nav
            id='sidebarMenu'
            className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'
          >
            <div className='position-sticky pt-3'>
              <ul className='nav flex-column'>
                <li className='nav-item'>
                  <a
                    className='nav-link active'
                    aria-current='page'
                    href='/users'
                  >
                    Users
                  </a>
                  <a
                    className='nav-link active'
                    aria-current='page'
                    href='/books'
                  >
                    Books
                  </a>
                  <a
                    className='nav-link active'
                    aria-current='page'
                    href='/orders'
                  >
                    Orders
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
            {props.children}
          </main>
        </div>
      </div>
    </>
  );
};