import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { BsFillCalendarFill, BsFillPersonFill } from 'react-icons/bs';
import { PiHashLight } from 'react-icons/pi';
import '../scss/Post.scss'

function Post(props) {
    return (
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
                    <Button variant='danger' size='sm'  className='adminControl ms-auto d-block text-white'>
                        <AiOutlineDelete />
                    </Button>
                </div>
                : null
                }
            </div>
        </Link>
    );
}

export default Post;