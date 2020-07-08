import React, { useState, useEffect } from 'react'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [user, setUser] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertType, setAlertType] = useState('')
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, pwd
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPwd('')
    } catch (e) {
      setAlertMessage('Error: invalid credentials.')
      setAlertType('error')
      setTimeout(() => {
        setAlertMessage(null)
        setAlertType('')
      }, 5000)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePwdChange = (event) => {
    setPwd(event.target.value)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewBlog(prevState => ({
      ...prevState, [name]: value
    }))
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    try {
      const title = newBlog.title
      const author = newBlog.author
      const data = await blogService.create(newBlog)
      setBlogs(blogs.concat(data))
      setNewBlog({
        title: '',
        author: '',
        url: ''
      })
      setAlertMessage(`New blog ${title} by ${author} added!`)
      setAlertType('success')
      setTimeout(() => {
        setAlertMessage(null)
        setAlertType('')
      }, 5000)
    } catch (e) {
      setAlertMessage(`Error: ${e.message}`)
      setAlertType('error')
      setTimeout(() => {
        setAlertMessage(null)
        setAlertType('')
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={alertMessage} type={alertType} />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          usernameOnChange={handleUsernameChange}
          pwd={pwd}
          pwdOnChange={handlePwdChange}
        /> :
        <BlogView
          user={user}
          blogs={blogs}
          logout={handleLogout}
          newBlog={newBlog}
          submitBlog={handleBlogSubmit}
          handleChange={handleChange}
        />
      }
    </div>
  )
}

export default App