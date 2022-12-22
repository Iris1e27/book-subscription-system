import {Link, useParams} from 'react-router-dom';
import { Nav } from 'react-bootstrap';

let show_txt = 'Logout';
let show_link = '/';


export const WrapperID = (props) => {
  const user_params = useParams();
  let user_id = parseInt(user_params.user_id);
  let user_link = '/users/'+user_id;
  let book_link = '/books/'+user_id;
  let order_link = '/orders/'+user_id;
  let customer_link = '/'+user_id;

  return (
    <>
      <header className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
        <a className='navbar-brand col-md-3 col-lg-2 me-0 px-3' href={customer_link}>
          Book Subscription System
        </a>

        <div className='navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link className='nav-link px-3' as={Link} to={show_link}>
              {show_txt}
            </Nav.Link>
            <Nav.Link className='nav-link px-3' as={Link} to={customer_link}>
              Welcome User id: {user_id}
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
                    href={user_link}
                  >
                    UserProfile
                  </a>
                  <a
                    className='nav-link active'
                    aria-current='page'
                    href={book_link}
                  >
                    BookList
                  </a>
                  <a
                    className='nav-link active'
                    aria-current='page'
                    href={order_link}
                  >
                    OrderList
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