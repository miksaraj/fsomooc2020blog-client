import React from 'react'
import BlogList from './BlogList'
import NewBlogForm from './NewBlogForm'

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
            <NewBlogForm
                newBlog={newBlog}
                submitBlog={submitBlog}
                handleChange={handleChange}
            />
            <BlogList blogs={blogs} />
        </div>
    )   
}

export default BlogView