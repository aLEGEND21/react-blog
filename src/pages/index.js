import React, { useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Post from '../components/Post';

function Home() {
	let [posts, setPosts] = useState([]);

	// Fetch posts from the API
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/posts`)
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					setPosts(data.data);
				}
			});
	}, []);

  	return (
    	<Container>
			<Row className="justify-content-center mt-5">
				{posts.map(post => {
					return (
						<Post key={post._id} {...post} />
					)
				})}
			</Row>
    	</Container>
  	);
}

export default Home;
