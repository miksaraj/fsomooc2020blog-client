import React from 'react'

const LoginForm = (props) => {
    const {
        handleLogin,
        username,
        usernameOnChange,
        pwd,
        pwdOnChange
    } = props

    return (
        <form onSubmit={handleLogin}>
            <div>
                Username:
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={usernameOnChange}
                />
            </div>
            <div>
                Password:
                <input
                    type="password"
                    value={pwd}
                    name="Password"
                    onChange={pwdOnChange}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm