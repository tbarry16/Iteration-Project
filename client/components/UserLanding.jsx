
import React, { useEffect, useState, useContext } from 'react';
import StateBreweries from './StateBreweries';
import VisitedBreweries from './VisitedBreweries';
import UserContext from './UserDetails';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLanding = () => {
  const [stateBreweries, setStateBreweries] = useState();
  const [visBreweries, setVisBreweries] = useState();
  const [user] = useContext(UserContext);
  const navigate = useNavigate();



  useEffect(() => {
    //Obtaining state upon user hitting landing page - user's state breweries and visited breweries
    getStateBreweries();
    getVisBreweries();
  }, []);

  useEffect(() => {
    navigate('/userlanding');
  }, [user]);

  const getStateBreweries = async () => {
    if (user) {
      try {
        const response = await axios.get('/api', {
          params: { state: user.homestate, id: user.id },
        })
        setStateBreweries(response.data.getBreweries)
      } catch (error) {
        console.log(error)
      }
    }
  };

  const getVisBreweries = async () => {
    if (user) {
      try {
        const response = await axios.get('/visited', {
          params: { state: user.homestate, id: user.id },
        })
        setVisBreweries(response.data.visited)
      } catch (error) {
        console.log(error)
      }
    }
  };

  useEffect(() => {
    console.log('State has changed');
    //state has changed but must be batching updates becaues not rerendering right away
  }, [stateBreweries, visBreweries]);

  const addStateToVisited = async (breweryDetails) => {
    // Add state brewery to visited brewery list
    const response = await axios.post('/visited/add', {
      addVisited: {
        breweryid: breweryDetails.id,
        breweryname: breweryDetails.name,
        brewerytype: breweryDetails.brewery_type,
        brewerystate: breweryDetails.state,
        brewerycity: breweryDetails.city,
        breweryphone: breweryDetails.phone,
        userId: user.id,
      },
      // params: { userId: user.usersid }, //Having trouble sending over user id as separate params
    })
    //Skips re-rendering sometimes....think due to automatchic batching...
    // setVisBreweries([...response.data.visited]);
    return getVisBreweries();
  };

  const removeVisited = async (breweryDetails) => {
    //Add state brewery to visited brewery list
    const response = await axios.delete('/visited/delete', {
      data: {
        breweryid: breweryDetails.id,
        breweryname: breweryDetails.name,
        brewerytype: breweryDetails.brewery_type,
        brewerystate: breweryDetails.state,
        brewerycity: breweryDetails.city,
        breweryphone: breweryDetails.phone,
        userId: user.id,
      },
      // params: { userId: user.usersid },
    })
    return getVisBreweries();
    // setVisBreweries([...response.data.visited])
  }

  if (stateBreweries) {
    //Only rendering after mount side effect runs to retrieve state breweries
    return (
      <div className="containerStyle">
        <StateBreweries
          stateBreweries={[...stateBreweries]}
          addStateToVisited={addStateToVisited}
        />
        <VisitedBreweries
          visBreweries={[...visBreweries]}
          removeVisited={removeVisited}
        />
      </div>
    )
  }
}

export default UserLanding;