import React, { useEffect, useState, useRef, useContext } from 'react';
//import Session from 'react-session-api'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserProfile from '../Profile';
import { SessionContext, SessionDispatchContext } from '../Contexts';

function NavBar() {
  //const [session, setSession] = useSession(sessionStore);
  const [userProfile, setUserProfile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  let session = useContext(SessionContext);

  /*(useEffect(() => {
    if (props.userProfile.getName() !== null) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);*/

  /*useEffect(() => {
    if (UserProfile.username !== null) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [UserProfile.username]);*/

  return (
    <Navbar bg='primary' variant='dark' expand="lg">
        <Container>
            <Navbar.Brand href="/">React Blog</Navbar.Brand>
            <Navbar.Toggle className='border-0' />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    { 
                    session.loggedIn ? 
                    <>
                    <Nav.Link href="/posts/new">New Post</Nav.Link>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                    </>
                    :
                    <>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                    </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar;
