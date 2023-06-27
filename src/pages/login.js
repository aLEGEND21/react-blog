import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { SessionContext, SessionDispatchContext } from '../Contexts';

let loginAlertStyle = {
    marginBottom: '0.5rem',
};

function Login() {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [error, setError] = useState(false);
    let session = useContext(SessionContext);
    let sessionDispatch = useContext(SessionDispatchContext);
    const navigate = useNavigate();

    // Prevent logged in users from accessing this page
    useEffect(() => {
        if (session.username !== null) {
            navigate('/');
        }
    }, []);

    let handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) {
            return setError("Please fill out all fields");
        }

        // Check that the credentials are valid
        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password}),
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    return setError("Incorrect username or password");
                } else {
                    sessionDispatch({
                        type: 'login',
                        payload: {
                            loggedIn: true,
                            username: data.username,
                            id: data.id,
                        }
                    })
                    navigate('/');
                }
            }).catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <Container className='col-8 col-md-6 col-xl-4 mt-5'>
            {/* Login failure alert */}
            {
                error ?
                <Alert variant='danger' style={loginAlertStyle} onClose={() => setError(false)} dismissible>
                    {error}
                </Alert>
                :
                <></>
            }

            <Container className='bg-white border-none rounded px-5 pt-5 pb-4'>

                <h1 className='text-center'>Login</h1>
        
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='formBasicUsername'>
                        <Form.Label className='small'>Username</Form.Label>
                        <Form.Control type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    
                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label className='small'>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
        
                    <div className='d-flex justify-content-center pt-1'>
                        <Button variant='primary' type='submit' className='text-white'>Log In</Button>
                    </div>
        
                    <div className='d-flex justify-content-center pt-4'>
                        <Form.Text className='text-muted'>
                            Don't have an account? <a href='/register'>Register</a>
                        </Form.Text>
                    </div>
                </Form>
            </Container>
        </Container>
      );
}

export default Login;
