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