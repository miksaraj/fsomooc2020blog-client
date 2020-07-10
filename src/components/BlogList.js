import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user, removeBlog }) => (
	<div>
		{blogs.map(blog =>
			<Blog
				key={blog.id}
				blog={blog}
				user={user}
				removeBlog={removeBlog}
			/>
		)}
	</div>
)

export default BlogList