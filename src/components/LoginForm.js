import React, { useState } from 'react'

const LoginForm = ({ login }) => {
	const [username, setUsername] = useState('')
	const [pwd, setPwd] = useState('')

	const handleLogin = (event) => {
		event.preventDefault()
		login({ username, pwd })
		setUsername('')
		setPwd('')
	}

	const handleUsernameChange = (event) => {
		setUsername(event.target.value)
	}

	const handlePwdChange = (event) => {
		setPwd(event.target.value)
	}


	return (
		<form onSubmit={handleLogin}>
			<div>
                Username:
				<input
					type="text"
					id="username"
					value={username}
					name="Username"
					onChange={handleUsernameChange}
				/>
			</div>
			<div>
                Password:
				<input
					type="password"
					id="pwd"
					value={pwd}
					name="Password"
					onChange={handlePwdChange}
				/>
			</div>
			<button type="submit" id="login-btn">Login</button>
		</form>
	)
}

export default LoginForm