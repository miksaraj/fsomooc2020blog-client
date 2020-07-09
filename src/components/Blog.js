import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}
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

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility}>
        <strong>{blog.title}</strong>, by {blog.author}
      </div>
      <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes} <button>Like</button></p>
          {blog.user !== undefined && <p>{blog.user.username}</p>}
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    </div>
  )
}

export default Blog
