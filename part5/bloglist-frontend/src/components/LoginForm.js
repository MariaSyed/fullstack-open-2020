import React, { useState } from 'react'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onChangeUsername = ({ target: { value } }) => setUsername(value)
  const onChangePassword = ({ target: { value } }) => setPassword(value)

  const onSubmit = (event) => {
    event.preventDefault()
    onLogin({ username, password })
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        username
        <input id="username" type="text" value={username} name="Username" onChange={onChangeUsername} />
      </div>
      <div>
        password
        <input id="password" type="password" value={password} name="Password" onChange={onChangePassword} />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

export default LoginForm
