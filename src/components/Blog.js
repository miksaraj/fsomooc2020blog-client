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
	const removeBlog = props.removeBlog

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
			removeBlog(blog)
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
				{blog.user !== undefined && blog.user !== null &&
					<p>{blog.user.name}</p>
				}
				{blog.user !== undefined && blog.user !== null &&
					blog.user.name === props.user.name &&
					<button onClick={handleRemove}>Remove</button>
				}
			</div>
		</div>
	)
}

export default Blog