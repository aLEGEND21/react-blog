import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { BsFillCalendarFill, BsFillPersonFill } from 'react-icons/bs';
import { PiHashLight } from 'react-icons/pi';
import '../scss/Post.scss'

function Post(props) {
    let [showDeleteModal, setShowDeleteModal] = useState(false);

    // Handle the delete button being clicked. This prevents the navigation to the post view page and opens the modal instead.
    let handleModalOpen = (e) => {
        e.preventDefault();
        setShowDeleteModal(true);
    }

    // Handle the delete confirmation being clicked
    let handleDelete = () => {
        fetch(`${process.env.REACT_APP_API_URL}/post/${props._id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.reload();
                } else {
                    alert('An error occurred while deleting the post.')
                    console.log(data);
                }
            });
    }

    return (
        <>
        <Link to={`/posts/view/${props._id}`} className='postContainer row text-decoration-none text-reset'>
            <div className='postSection col-6 col-lg-7 position-relative'>
                <ul className='postMeta list-inline ms-3'>
                    <li className='postAuthor list-inline-item'>
                        <Link to={`/profile/${props.author._id}`} className='text-reset text-decoration-none'>
                            <BsFillPersonFill /> {props.author.username}
                        </Link>
                    </li>
                    <li className='postDate list-inline-item ps-1'>
                        <BsFillCalendarFill /> {new Date(props.createdAt).toLocaleDateString()}
                    </li>
                </ul>
                <p className='postTitle ms-3 text-truncate'>
                    {props.title}
                </p>
                <p className='postSummary ms-3'>
                    {props.summary}
                </p>
                <div className='ms-3 position-absolute bottom-0 mb-3'>
                    {props.tags.map(tag => {
                        return (
                            <div className='postTag d-inline px-2 py-1 me-2'>
                                <PiHashLight className='tag-hash-icon'/>
                                {tag}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='postSection col-6 col-lg-5 d-flex justify-content-end'>
                <img className='postImage my-auto me-3' src={props.thumbnailUrl} />
                {
                // Display admin controls to edit and delete posts
                props.showAdminControls ?
                <div className='postAdminControls position-absolute me-3 mt-3 p-1 rounded'>
                    <Link to={`/posts/edit/${props._id}`} className='text-reset text-decoration-none'>
                        <Button variant='primary' size='sm' className='adminControl ms-auto d-block mb-2 text-white'>
                            <BiEdit />
                        </Button>
                    </Link>
                    <Button variant='danger' size='sm'  className='adminControl ms-auto d-block text-white' onClick={handleModalOpen}>
                        <AiOutlineDelete />
                    </Button>
                </div>
                : null
                }
            </div>
        </Link>

        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this post?
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-secondary' onClick={() => setShowDeleteModal(false)}>
                    Cancel
                </Button>
                <Button variant='danger' onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default Post;