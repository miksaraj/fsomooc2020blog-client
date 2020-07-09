import React from 'react'
import BlogList from './BlogList'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'

const BlogView = React.forwardRef((props, ref) => {
	const {
		user,
		blogs,
		logout,
		createBlog
	} = props

	return (
		<div>
			<h2>Blogs</h2>
			<div>
				<p>{user.name} logged in</p>
				<button onClick={logout}>Logout</button>
			</div>
			<Togglable buttonLabel="New blog" ref={ref}>
				<NewBlogForm createBlog={createBlog} />
			</Togglable>
			<BlogList blogs={blogs} user={user} />
		</div>
	)
})

BlogView.displayName = 'BlogView'

export default BlogView