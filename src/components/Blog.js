import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = (props) => {
	const [visible, setVisible] = useState(false)
	const [blog, setBlog] = useState(props.blog)
	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const handleLike = async () => {
		try {
			const likes = blog.likes + 1
			await blogService.update(blog.id, { likes })
			setBlog(prevState => ({
				...prevState, 'likes': likes
			}))
		} catch (e) {
			console.error(e.message)
		}
	}

	const handleRemove = async () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.name}?`)) {
			try {
				await blogService.del(blog.id)
			} catch (e) {
				console.error(e.message)
			}
		}
	}

	return (
		<div style={blogStyle}>
			<div onClick={toggleVisibility} className="blogTitle">
				<strong>{blog.title}</strong>, by {blog.author}
			</div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>View</button>
			</div>
			<div style={showWhenVisible} className="blogExtra">
				<button onClick={toggleVisibility}>Hide</button>
				<p>{blog.url}</p>
				<p>Likes: {blog.likes} <button onClick={handleLike}>Like</button></p>
				{blog.user !== undefined && <p>{blog.user.username}</p>}
				{blog.user !== undefined &&
					blog.user.username === props.user.username &&
					<button onClick={handleRemove}>Remove</button>
				}
			</div>
		</div>
	)
}

export default Blog