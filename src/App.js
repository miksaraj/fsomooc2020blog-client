import React, { useState, useEffect, useRef } from 'react'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [alertMessage, setAlertMessage] = useState(null)
	const [alertType, setAlertType] = useState('')
	const blogFormRef = useRef()

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

	const login = async (userObj) => {
		try {
			const user = await loginService.login(userObj)
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
		} catch (e) {
			setAlertMessage('Error: invalid credentials.')
			setAlertType('error')
			setTimeout(() => {
				setAlertMessage(null)
				setAlertType('')
			}, 5000)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const createBlog = async (blogObj) => {
		try {
			blogFormRef.current.toggleVisibility()
			const title = blogObj.title
			const author = blogObj.author
			const data = await blogService.create(blogObj)
			setBlogs(blogs.concat(data))
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
				<LoginForm login={login} /> :
				<BlogView
					user={user}
					blogs={blogs}
					logout={handleLogout}
					createBlog={createBlog}
					ref={blogFormRef}
				/>
			}
		</div>
	)
}

export default App