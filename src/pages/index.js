import React, { useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Post from '../components/Post';
import Tag from '../components/Tag';
import { BsSearch } from 'react-icons/bs';
import { tagTypes } from '../constants';
import '../scss/Home.scss';

function Home() {
	let [posts, setPosts] = useState([]);
	let [searchType, setSearchType] = useState('title');
	let [searchQuery, setSearchQuery] = useState('');
	let [tags, setTags] = useState([]);

	// Fetch posts from the API
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/posts`)
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					let posts = data.data;

					// Filter the posts by the search query
					if (searchQuery !== '') {
						posts = posts.filter(post => {
							if (searchType === 'title') {
								return post.title.toLowerCase().includes(searchQuery.toLowerCase());
							} else if (searchType === 'author') {
								return post.author.username.toLowerCase().includes(searchQuery.toLowerCase());
							}
						});
					}

					// Filter the posts by the tags
					if (tags.length > 0) {
						posts = posts.filter(post => {
							let isMatch;
							tags.forEach(tag => {
								isMatch = post.tags.includes(tag);
							});
							return isMatch;
						});
					}

					setPosts(posts);
				}
			});
	}, [searchType, searchQuery, tags]);

	// Disable the tag select if the user has already selected 2 tags
    useEffect(() => {
        let tagSelect = document.getElementById('tag-select');
        if (tagSelect === null) return;
        if (tags.length === 2) {
            tagSelect.disabled = true;
            tagSelect.options[1].selected = true;
        } else {
            tagSelect.disabled = false;
            tagSelect.options[0].selected = true;
        }
    }, [tags]);

	// Handle which tags have been selected
	let handleTagSelect = (e) => {
        let tag = e.target.value;
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        } else {
            e.target.options[0].selected = true; // Manually reset the placeholder since the useEffect won't trigger
        }
    }

	let handleTagRemove = (tag) => {
        // Return a function that removes the tag from the tags array. This is required for the Tag component to work.
        return () => {
            setTags(tags.filter(t => t !== tag));
        }
    }

  	return (
    	<Container>
			<Row className="justify-content-center mt-5">
				<div id="search-container" className='col-lg-5 offset-lg-1 order-lg-last mb-5 px-0'>
					<Form id="search-form" className="sticky-lg-top" autoComplete='off' onSubmit={(e) => e.preventDefault()} >
						<label className='ps-1 pb-1 text-light'>Showing {posts.length} result{posts.length == 1 ? '' : 's'}</label>
						<InputGroup>
							<Form.Select id="search-type-select" className="bg-secondary border-secondary text-grey" onChange={(e) => setSearchType(e.target.value)}>
								<option value="title">By Title</option>
								<option value="author">By Author</option>
							</Form.Select>
							<Form.Control type="text" placeholder="Search" id="search-bar" className='bg-secondary border-secondary text-grey' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
							<Button variant="secondary" id="search-decoration" className='text-grey'>
								<BsSearch className='mt-n1'/>
							</Button>
						</InputGroup>
						<Form.Group className="pt-3">
							<Form.Select id="tag-select" className="bg-secondary border-secondary text-grey" onChange={handleTagSelect}>
								<option value={null} hidden >View posts with tag(s)</option>
								<option value={null} hidden disabled>Maximum number of tags selected</option>
								{tagTypes.map((tagType, index) => {
									return <option key={index} value={tagType}>{tagType}</option>
								})}
							</Form.Select>
							<div className='pt-2 '>
								{tags.map((tagType, index) => {
									return <Tag variant="secondary" key={index} value={tagType} handleRemove={handleTagRemove} />
								})}
							</div>
						</Form.Group>
					</Form>
				</div>
				<div className="col-12 col-lg-6">
					{/*<p className="text-center display-5 text-white mb-4">Your Feed</p>*/}
					{posts.map(post => {
						return (
							<Post key={post._id} {...post} />
						)
					})}
				</div>
			</Row>
    	</Container>
  	);
}

export default Home;
