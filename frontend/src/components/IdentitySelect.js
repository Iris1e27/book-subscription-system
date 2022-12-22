import {Nav} from "react-bootstrap";

export const IdentitySelect = () => {

  const handleClickAdmin = async (e) => {
    e.preventDefault();
    const admin_password = prompt('Type password', '');

    if (admin_password === "123456") {
        window.location.href="/admin";
    } else {
      return;
    }

  };

  const handleClickCustomer = async (e) => {
    e.preventDefault();

    window.location.href="/login"
  };

    return <>
      <header className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
        <a className='navbar-brand col-md-3 col-lg-2 me-0 px-3'>
          Book Subscription System
        </a>

        <div className='navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link className='nav-link px-3' >
              Welcome
            </Nav.Link>
          </Nav>
        </div>
      </header>

      <div className="container">
        <center>
        <p></p>
        <botton className='w-30 btn btn-primary center' onClick={handleClickAdmin}>Login as Admin</botton>
        <p></p>
        <botton className='w-30 btn btn-primary center' onClick={handleClickCustomer}>Login as Customer</botton>
        </center>
      </div>

    </>
}