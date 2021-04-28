import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { getUserDetails } from '../features/home/homeSlice';
import { FaTools, FaHome, FaCog } from 'react-icons/fa';

const Header = () => {
  const { displayName } = useSelector((state) => state.home.user);

  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const handleOpen = () => {
    console.log('open');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Navbar bg='white' expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>
            <img
              src={process.env.PUBLIC_URL + '/UHCLogo.png'}
              alt='UHC Logo'
              className='logo d-inline-block align-top'
            />
            UHC Bookmarker
            <h6 className='user-name'>
              Welcome, <strong>{displayName}</strong>
            </h6>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='top-navbar-nav' />
          <Navbar.Collapse id='top-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='#home'>
                <FaHome /> Dashboard
              </Nav.Link>
              <Nav.Link href='#link'>
                <FaCog /> Setting
              </Nav.Link>

              <NavDropdown
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
                title={
                  <div style={{ display: 'inline-block' }}>
                    <FaTools glyph='star' /> Tools{' '}
                  </div>
                }
                show={isOpen}
                id='basic-nav-dropdown'
              >
                <NavDropdown.Item href='#action/3.2'>
                  Import Bookmarks
                </NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>
                  Export Bookmarks
                </NavDropdown.Item>
                {/* <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>
                  Separated link
                </NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
