import React from 'react'
import BlogList from './BlogList'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'

const BlogView = (props) => {
    const {
        user,
        blogs,
        logout,
        createBlog,
        ref
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
            <BlogList blogs={blogs} />
        </div>
    )   
}

export default BlogView