import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SessionContext } from '../Contexts';

let alertStyle = {
    marginBottom: '0.5rem',
};

function NewPost() {
    let [title, setTitle] = useState('');
    let [summary, setSummary] = useState('');
    let [content, setContent] = useState('');
    let [error, setError] = useState('');
    let session = useContext(SessionContext);
    let navigate = useNavigate();

    // Prevent logged out users from accessing this page
    useEffect(() => {
        if (session.username === null) {
            navigate('/login');
        }
    }, []);
    
    let handleSubmit = (e) => {
        e.preventDefault();

        // Validate the user input
        if (title === '') {
            return setError("Title cannot be empty");
        } else if (title.length > 100) {
            return setError("Title cannot be longer than 100 characters");
        } else if (summary === '') {
            return setError("Summary cannot be empty");
        } else if (summary.length > 200) {
            return setError("Summary cannot be longer than 200 characters");
        } else if (content === '') {
            return setError("Content cannot be empty");
        }

        // Add post to database
        fetch(`${process.env.REACT_APP_API_URL}/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    summary: summary,
                    content: content,
                    //authorID: Session.get('userID'),
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    console.log(data);
                    return setError("Post could not be created");
                } else {
                    navigate('/');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    let handleReset = (e) => {
        e.preventDefault();

        // Reset the form
        setTitle('');
        setSummary('');
        setContent('');
    }

    return (
        <Container className='col-10 col-md-9 col-xl-8 mt-5'>
            {/* Error alert */}
            {
                error ?
                <Alert variant='danger' style={alertStyle} onClose={() => setError(false)} dismissible>
                    {error}
                </Alert>
                :
                <></>
            }
            <Container className='bg-white border-none rounded p-4'>
                <Form onSubmit={handleSubmit} onReset={handleReset}>
                    <h1 className='text-center pt-4'>New Post</h1>
                    <Form.Group className="pt-3" controlId="postTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="pt-3" controlId="postSummary">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control type="text" placeholder="Enter summary" value={summary} onChange={(e) => setSummary(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="pt-3" controlId="postContent">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows={6} placeholder="Lorem ipsum dolor sit amet..." value={content} onChange={(e) => setContent(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className='text-light mt-4'>
                        Post
                    </Button>
                    <Button variant="outline-danger" type="reset" className='mt-4 ms-2'>
                        Discard
                    </Button>
                </Form>
            </Container>
        </Container>
    );
}

export default NewPost;
