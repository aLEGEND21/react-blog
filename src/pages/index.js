import React, { useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';

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
			{posts.map(post => {
				return (
					<div key={post._id}>
						<h1>{post.title}</h1>
						<p>{post.summary}</p>
					</div>
				)
			})}
    	</Container>
  	);
}

export default Home;
