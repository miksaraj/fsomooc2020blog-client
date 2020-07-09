import React from 'react'
import BlogList from './BlogList'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'

const BlogView = (props) => {
    const {
        user,
        blogs,
        logout,
        newBlog,
        submitBlog,
        handleChange,
    } = props

    return (
        <div>
            <h2>Blogs</h2>
            <div>
                <p>{user.name} logged in</p>
                <button onClick={logout}>Logout</button>
            </div>
            <Togglable buttonLabel="New blog">
                <NewBlogForm
                    newBlog={newBlog}
                    submitBlog={submitBlog}
                    handleChange={handleChange}
                />
            </Togglable>
            <BlogList blogs={blogs} />
        </div>
    )   
}

export default BlogView