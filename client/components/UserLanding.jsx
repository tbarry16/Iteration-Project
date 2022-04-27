
import React, { useEffect, useState, useContext } from 'react';
import StateBreweries from './StateBreweries';
import VisitedBreweries from './VisitedBreweries';
import UserContext from './UserDetails';
import axios from 'axios';

const UserLanding = () => {
  //Batching state changes in React leading to onClick update lags????
  const [stateBreweries, setStateBreweries] = useState();
  const [visBreweries, setVisBreweries] = useState();
  const [user] = useContext(UserContext);

  useEffect(() => {
    //Obtaining state upon user hitting landing page - user's state breweries and visited breweries
    getBreweries();
  }, [])

  const getBreweries = async () => {
    if (user) {
      try {
        const response = await axios.get('/api', {
          params: { state: user.homestate, id: user.id },
        })
        setStateBreweries(response.data.getBreweries)
        setVisBreweries(response.data.visited)
      } catch (error) {
        console.log(error)
      }
    }
  };

  /*************************************************** */

  //Try to desctructure getBreweries into two separate API calls (one to public API, one to PostgreSQL): need to separate the /api GET call on the server side into two different routes. Then call those routes in two different functions in this file.

  //Then we can restructure this page in order to re-render the Visited Breweries whenever the state in visBreweries has changed, without mkaing a public API call every

  /*************************************************** */

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
    setVisBreweries([...response.data.visited]);
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

    setVisBreweries([...response.data.visited])
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