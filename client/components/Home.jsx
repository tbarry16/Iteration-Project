import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import UserContext from './UserDetails'

const Home = () => {
  let navigate = useNavigate()
  const [user] = useContext(UserContext)



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
        {/* <Link to="/home">Home</Link>  */}
      </div>
    )
  }
}

export default Home
