import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Post(props) {
    let [authorUsername, setAuthorUsername] = useState('');

    // Fetch the author's name from the API
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/user/${props.authorId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setAuthorUsername(data.username);
                }
            });
    }, []);

    return (
        <div className='col-10 col-md-6 col-lg-4 mb-4'>
            <Card className='h-100'>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">By: {authorUsername}</Card.Subtitle>
                    <Card.Text>{props.summary}</Card.Text>
                    <Card.Link href={`/posts/${props.id}`}>Read More</Card.Link>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Post;