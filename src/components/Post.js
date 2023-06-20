import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillCalendarFill, BsFillPersonFill } from 'react-icons/bs';
import '../css/Post.css'

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

    /*return (
        <Link to={`/posts/view/${props._id}`} className='postContainer col-12 text-decoration-none text-reset mb-4 row align-items-center'>
                <div className='col-6 ps-4 postTextContainer'>
                    <p className='postAuthor'><BsFillPersonFill /> {authorUsername}</p>
                    <p className='postTitle'>{props.title}</p>
                    <p className='postDate'>{new Date(props.createdAt).toLocaleDateString()}</p>
                </div>
                <div className='col-6 px-0 ps-2'>
                    <img src={props.thumbnailUrl} className='postImage mx-auto' />
                </div>
        </Link>
    );*/

    return (
        <Link to={`/posts/view/${props._id}`} className='postContainer row text-decoration-none text-reset'>
            <div className='postSection col-6 col-lg-7'>
                <ul className='postMeta list-inline ms-3'>
                    <li className='postAuthor list-inline-item'>
                        <BsFillPersonFill /> {authorUsername}
                    </li>
                    <li className='postDate list-inline-item ps-1'>
                        <BsFillCalendarFill /> {new Date(props.createdAt).toLocaleDateString()}
                    </li>
                </ul>
                <p className='postTitle ms-3'>
                    {props.title}
                </p>
                <p className='postSummary ms-3'>
                    {props.summary}
                </p>
            </div>
            <div className='postSection col-6 col-lg-5 d-flex'>
                <img className='postImage my-auto ms-auto me-3' src={props.thumbnailUrl} />
            </div>
        </Link>
    );
}

export default Post;