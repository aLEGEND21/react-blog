import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

function NewPost() {
    let [title, setTitle] = useState('');
    let [summary, setSummary] = useState('');
    let [content, setContent] = useState('');
    let [tags, setTags] = useState([]);
    let [thumbnail, setThumbnail] = useState();
    let [error, setError] = useState();
    let session = useContext(SessionContext);
    let navigate = useNavigate();

    // Prevent logged out users from accessing this page
    useEffect(() => {
        if (session.username === null) {
            navigate('/login');
        }
    }, []);

    // Disable the tag select if the user has already selected 2 tags
    useEffect(() => {
        let tagSelect = document.getElementById('tagSelect');
        if (tagSelect === null) return;
        if (tags.length === 2) {
            tagSelect.disabled = true;
            tagSelect.options[1].selected = true;
        } else {
            tagSelect.disabled = false;
            tagSelect.options[0].selected = true;
        }
    }, [tags]);

    let handleTagSelect = (e) => {
        let tag = e.target.value;
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        } else {
            e.target.options[0].selected = true; // Manually reset the placeholder since the useEffect won't trigger
        }
    }
    
    let handleTagRemove = (tag) => {
        // Return a function that removes the tag from the tags array. This is required for the Tag component to work.
        return () => {
            setTags(tags.filter(t => t !== tag));
        }
    }
    
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
        } else if (tags.length === 0) {
            return setError("At least one tag must be selected");
        } else if (thumbnail === undefined) {
            return setError("Thumbnail must be a valid image file");
        }

        // Upload the thumbnail to the server
        let formData = new FormData();
        formData.append('File', thumbnail);
        fetch(`${process.env.REACT_APP_API_URL}/media/upload`, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    console.log(data);
                    return setError("Thumbnail could not be uploaded");
                } else {
                    let fileUrl = `${process.env.REACT_APP_API_URL}/media/${data.filename}`; // The URL of the file on the server

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
                                author: session.id,
                                thumbnailUrl: fileUrl,
                                tags: tags,
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
            });        
    }

    let handleReset = (e) => {
        e.preventDefault();

        // Reset the form
        setTitle('');
        setSummary('');
        setContent('');
        setTags([]);
        setThumbnail();
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
                            {tags.map((tagType, index) => {
                                return <Tag key={index} value={tagType} handleRemove={handleTagRemove}/>
                            })}
                        </div>
                    </Form.Group>
                    <Form.Group className='pt-3'>
                        <Form.Label>Thumbnail Image</Form.Label>
                        <Form.Control type="file" accept=".png,.jpg,.jpeg" onChange={(e) => setThumbnail(e.target.files[0])}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className='text-white mt-4'>
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
