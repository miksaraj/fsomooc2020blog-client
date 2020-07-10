import React, { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
	const [newBlog, setNewBlog] = useState({
		title: '',
		author: '',
		url: ''
	})

	const handleChange = (event) => {
		const { name, value } = event.target
		setNewBlog(prevState => ({
			...prevState, [name]: value
		}))
	}

	const handleBlogSubmit = (event) => {
		event.preventDefault()
		createBlog(newBlog)
		setNewBlog({
			title: '',
			author: '',
			url: ''
		})
	}

	return (
		<form onSubmit={handleBlogSubmit} className="newBlogForm">
			<div>
            Title:
				<input
					type="text"
					id="title"
					value={newBlog.title}
					name="title"
					onChange={handleChange}
				/>
			</div>
			<div>
            Author:
				<input
					type="text"
					id="author"
					value={newBlog.author}
					name="author"
					onChange={handleChange}
				/>
			</div>
			<div>
            Url:
				<input
					type="text"
					id="url"
					value={newBlog.url}
					name="url"
					onChange={handleChange}
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	)
}

export default NewBlogForm