import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsCalendar, BsPerson } from 'react-icons/bs';

let postImageStyle = {
    maxHeight: '18rem',
}

let postContentStyle = {
    fontSize: '18px',
    whiteSpace: 'pre-wrap', // Preserve line breaks
}

function ViewPost() {
    const { id } = useParams();
    let [post, setPost] = useState({});
    let [author, setAuthor] = useState('');

    // Load the post and author data from the API
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/post/${id}`)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setPost(data);
                fetch(`${process.env.REACT_APP_API_URL}/user/${data.authorId}`)
                    .then((results) => {
                        return results.json();
                    })
                    .then((data) => {
                        setAuthor(data.username);
                    });
            });
    }, [id]);

    return (
        <div className='mt-5'>
            <div className='col-10 col-md-8 col-lg-6 offset-1 offset-md-2 offset-lg-3'>
                <p className='display-6 text-center'>{post.title}</p>
                <img src={post.thumbnailUrl} className='rounded d-block mx-auto mt-5' style={postImageStyle}/>
                <p className='lead text-center mt-5'>{post.summary}</p>
                <p className='mt-5' style={postContentStyle}>{post.content}</p>
                <hr className='mt-4'/>
                <ul className='list-inline mt-3 text-center'>
                    <li className='list-inline-item'>
                        <BsPerson /> {author}
                    </li>
                    <li className='list-inline-item ms-4'>
                        <BsCalendar /> {new Date(post.createdAt).toLocaleDateString()}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ViewPost;
