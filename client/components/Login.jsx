import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserContext from './UserDetails'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate()
  const [user, updateUser] = useContext(UserContext);
  // const [user, setUser] = useState(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault() //So that form submission doesn't trigger a page refresh

    // send the username and password to the server
    try {
      const response = await axios.post('/login', {
        userInfo: {
          username: username,
          password: password,
        },
      })
      console.log(response.data);

      //If success then update context for logged in user and redirect them...
      if (response.data === 'Username does not exist' || response.data === 'Incorrect password') {
        alert(response.data)
      } else if (response.data.userInfo.id) {
        updateUser(response.data.userInfo);
        navigate('/userlanding'); //if successfull, send to UserLanding route
      }
    } catch (error) {
      console.log(error)
    }
    // params: { userId: user.usersid }, //Having trouble sending over user id as separate params
  }

  return (
    <div className="loginForm">
      <h1>Login</h1>

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              autoFocus
              autocomplete="off"
              className="submitItem"
              name="username"
              type="text"
              placeholder="username"
              onChange={({ target }) => setUsername(target.value)}
            ></input>
          </div>
          <div>
            <input
              autocomplete="off"
              className="submitItem"
              name="password"
              type="password"
              placeholder="password"
              onChange={({ target }) => setPassword(target.value)}
            ></input>
          </div>
          <input className="submitButton" type="submit" value="Login"></input>
        </form>
      </div>
    </div>
  )
}

export default Login
