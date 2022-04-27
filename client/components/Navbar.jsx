import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserDetails';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { cookie } from 'react-cookie'


const Navbar = (props) => {
  const [user, updateUser] = useContext(UserContext);

  let navigate = useNavigate();

  const handleLogout = (e) => {
    console.log('handleLogout');
    fetch('/logout')
      .then(data => console.log(data))
      .then(() => updateUser(null))
      .catch(err => console.log(err))

    navigate('/')
    // delete document.cookie.BrewCookie;
    // document.cookie = 'BrewCookie=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  };
  return (
    <>
      <header>
        <div className='brand nav'>FindMyBrews&#127867;</div>
        {/*Leaving this as a UL/LI so that we want to add more navbar options */}
        <ul className='nav_links'>
          {user && (
            <li>
              {/* <Button className='logout-Btn' to='/login' onClick={handleLogout}> */}
              <button className='logout-Btn' onClick={handleLogout}>
                Logout
              </button >
              {/* </Link> */}
            </li>
          )}
        </ul>
      </header>
    </>
  );
};

export default Navbar;
