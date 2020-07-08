import React from 'react'

const NewBlogForm = ({ newBlog, submitBlog, handleChange }) => (
    <form onSubmit={submitBlog}>
        <div>
            Title:
            <input
                type="text"
                value={newBlog.title}
                name="title"
                onChange={handleChange}
            />
        </div>
        <div>
            Author:
            <input
                type="text"
                value={newBlog.author}
                name="author"
                onChange={handleChange}
            />
        </div>
        <div>
            Url:
            <input
                type="text"
                value={newBlog.url}
                name="url"
                onChange={handleChange}
            />
        </div>
        <button type="submit">Submit</button>
    </form>
)

export default NewBlogForm