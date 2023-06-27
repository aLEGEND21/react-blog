import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Post from '../components/Post';
import { SessionContext } from '../Contexts';

function Profile() {
    const { id } = useParams();
    let [user, setUser] = useState({});
    let session = useContext(SessionContext);
    let isOwnProfile = user._id === session.id;
    
    // Load the user's data from the API
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/user/${id}`)
            .then(response => response.json())
            .then(data => setUser(data));
    }, [id]);

    return (
        <Container>
            <Row className='mt-5'>
                <div className="d-none d-lg-block col-lg-5 mb-5">
                    <h1>[Profile Data]</h1>
                </div>
                <div className="col-12 col-lg-7">
                    <h1 className='display-5 mb-3 text-center'>
                        {session.username == user.username ? 'Your Posts'
                    : `${user.username}'s Posts`}
                    </h1>
                    {user?.posts?.map(post => {
                        post.author = user;
                        return <Post key={post._id} {...post} showAdminControls={isOwnProfile} /> 
                    })}
                </div>
            </Row>
        </Container>
    );
}

export default Profile;
