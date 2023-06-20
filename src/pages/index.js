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
				<div className="col-12 col-lg-7">
					<p className="text-center display-5 text-white mb-4">Your Feed</p>
					{posts.map(post => {
						return (
							<Post key={post._id} {...post} />
						)
					})}
				</div>
				<div className="col-lg-5 d-none d-lg-block">
					<h1>[Search Feature]</h1>
				</div>
			</Row>
    	</Container>
  	);
}

export default Home;
