import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tag from '../components/Tag';
import { SessionContext } from '../Contexts';
import { tagTypes } from '../constants';

let alertStyle = {
    marginBottom: '0.5rem',
};

function EditPost() {
    const { id } = useParams();
    let [post, setPost] = useState({});
    let [error, setError] = useState();
    let session = useContext(SessionContext);
    let navigate = useNavigate();

    // Refresh the post data from the API
    let refreshPost = () => {
        fetch(`${process.env.REACT_APP_API_URL}/post/${id}`)
            .then(response => response.json())
            .then(data => setPost(data));
    }

    // Load the post data from the API
    useEffect(() => {
        refreshPost();
    }, [id]);

    // Prevent users from editing posts they don't own
    useEffect(() => {
        if (session.username === null) {
            navigate('/login');
        } else if ('author' in post && post.author._id !== session.id) {
            navigate('/');
        }
    }, [id, post]);

    // Disable the tag select if the user has already selected 2 tags
    useEffect(() => {
        let tagSelect = document.getElementById('tagSelect');
        if (tagSelect === null) return;
        if (post.tags?.length === 2) {
            tagSelect.disabled = true;
            tagSelect.options[1].selected = true;
        } else {
            tagSelect.disabled = false;
            tagSelect.options[0].selected = true;
        }
    }, [post.tags]);

    let handleTagSelect = (e) => {
        let tag = e.target.value;
        if (!post.tags.includes(tag)) {
            setPost({ ...post, tags: [...post.tags, tag] });
        } else {
            e.target.options[0].selected = true; // Manually reset the placeholder since the useEffect won't trigger
        }
    }
    
    let handleTagRemove = (tag) => {
        // Return a function that removes the tag from the tags array. This is required for the Tag component to work.
        return () => {
            setPost({ ...post, tags: post.tags.filter(t => t !== tag) });
        }
    }
    
    let handleSubmit = (e) => {
        e.preventDefault();

        // Validate the user input
        if (post.title === '') {
            return setError("Title cannot be empty");
        } else if (post.title.length > 100) {
            return setError("Title cannot be longer than 100 characters");
        } else if (post.summary === '') {
            return setError("Summary cannot be empty");
        } else if (post.summary.length > 200) {
            return setError("Summary cannot be longer than 200 characters");
        } else if (post.content === '') {
            return setError("Content cannot be empty");
        } else if (post.tags.length === 0) {
            return setError("At least one tag must be selected");
        }

        // Send the post data to the API
        fetch(`${process.env.REACT_APP_API_URL}/post/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    navigate(`/posts/view/${id}`);
                }
            }
        );
    }

    let handleReset = (e) => {
        e.preventDefault();

        // Reload the post data from the API
        refreshPost();
    }

    return (
        <Container className='col-10 col-md-9 col-xl-8 my-5'>
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
                    <h1 className='text-center pt-4'>Edit Post</h1>
                    <Form.Group className="pt-3" controlId="postTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })}/>
                    </Form.Group>
                    <Form.Group className="pt-3" controlId="postSummary">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control type="text" placeholder="Enter summary" value={post.summary} onChange={(e) => setPost({ ...post, summary: e.target.value })}/>
                    </Form.Group>
                    <Form.Group className="pt-3" controlId="postContent">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows={6} placeholder="Lorem ipsum dolor sit amet..." value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })}/>
                    </Form.Group>
                    <Form.Group className="pt-3" controlId="postTags">
                        <Form.Label>Tags</Form.Label>
                        <Form.Select id="tagSelect" onChange={handleTagSelect}>
                            <option value={null} hidden >Select up to 2 tags</option>
                            <option value={null} hidden disabled>Maximum number of tags selected</option>
                            {tagTypes.map((tagType, index) => {
                                return <option key={index} value={tagType}>{tagType}</option>
                            })}
                        </Form.Select>
                        <div className='pt-2 '>
                            {post.tags?.map((tagType, index) => {
                                return <Tag key={index} value={tagType} handleRemove={handleTagRemove}/>
                            })}
                        </div>
                    </Form.Group>
                    <Button variant="primary" type="submit" className='text-white mt-4'>
                        Edit
                    </Button>
                    <Button variant="outline-danger" type="reset" className='mt-4 ms-2'>
                        Reset
                    </Button>
                </Form>
            </Container>
        </Container>
    );
}

export default EditPost;
