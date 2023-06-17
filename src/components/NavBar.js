import { useContext } from 'react';
import { SessionContext } from '../Contexts';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  let session = useContext(SessionContext);

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
                    </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar;
