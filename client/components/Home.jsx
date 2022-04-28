import React, { useContext, useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import UserContext from './UserDetails'

const Home = () => {
  let navigate = useNavigate()
  const [user] = useContext(UserContext)
  const [googleLoginData, setGoogleLoginData] = useState(null)
  const [needLocation, setNeedLocation] = useState(false)

  useEffect(() => {
    console.log(user);
  }, [user])

  //If user is already logged in via coolies/storage (TBD by Colton) then redirect to their landing page

  function loginClick() {
    if (user) {
      navigate('/userlanding')
    } else {
      navigate('/login')
    }
  }

  function createClick() {
    navigate('/createuser')
  }

  const handleSubmit = () => {
    const { family_name, given_name, sub } = googleLoginData
    fetch('/createuser', {
      method: 'POST',
      headers: {
        'Content=Type': 'application/json'
      },
      body: {
        newuser: {
          firstname: given_name, 
          lastname: family_name, 
          homestate: document.getElementById('homestate-input').value, 
          username: sub, 
          password: 'google-auth'
        }
      }
    })
  }

  const handleFailure = (result) => {
    alert(result)
  }

  const handleLogin =(googleData) => {
    // console.log(googleData)

    const {tokenId } = googleData;
    // const { email, familyName, givenName} = googleData.profileObj

    // console.log(tokenId)
    // console.log(googleId)
    // console.log(email)
    // console.log(familyName)
    // console.log(givenName)

    fetch('/api/google-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tokenId
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('data in response:', data)
      setGoogleLoginData(data)
      setNeedLocation(true)
    })
  }
  let locationForm;
  if (needLocation) {
    locationForm = [<form onSubmit={handleSubmit}>
      <label>Home state:</label>
      <input id='homestate-input' type='text' placeholder='state'></input>
      <button type='submit'>Submit</button>
      </form>]
  }
  
  if (user) {
    return navigate('/userlanding')
  } else {
    return (
      <div className="home">
        <button className="create-Btn" onClick={() => createClick()}>
          New to FindMyBrews? Click here for your Passport!
        </button>
        <button className="login-Btn" onClick={() => loginClick()}>
          Already have your Passport? Click here to log in!
        </button>
        <GoogleLogin
          clientId={'940209212062-b9l97pr2kqluhhm8snj8djsn9prk771p.apps.googleusercontent.com'}
          buttonTest="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
        ></GoogleLogin>
        {locationForm}
      </div>
    )
  }
}

export default Home
