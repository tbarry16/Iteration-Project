import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserDetails';
import Modal from '@mui/material/Modal';
import ViewComments from './ViewComments';

const Brewery = (props) => {
  const [user] = useContext(UserContext)
  const breweryComp = props.breweryComp
  let bAttribs = {}
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (breweryComp === 'state') {
    //State Component props
    bAttribs.name = props.name
    bAttribs.id = props.id
    bAttribs.brewery_type = props.brewery_type
    bAttribs.state = props.state
    bAttribs.city = props.city
    bAttribs.phone = props.phone
    bAttribs.street = props.street
    bAttribs.street = props.street
    bAttribs.address_2 = props.address_2
    bAttribs.addStateToVisited = props.addStateToVisited
  } else {
    //Visited Breweries Component props
    bAttribs.id = props.id
    bAttribs.usersid = props.usersid
    bAttribs.breweryname = props.breweryname
    bAttribs.brewerytype = props.brewerytype
    bAttribs.brewerystate = props.brewerystate
    bAttribs.brewerycity = props.brewerycity
    bAttribs.breweryphone = props.breweryphone
    bAttribs.removeVisited = props.removeVisited
  }

  //Conditional logic for type of component want to render
  if (breweryComp === 'state') {
    //render state component brewery

    return (
      <div className="listStyle">
        <div className="textStyle">
          <span>{bAttribs.name}</span>
          <br />
          <span>{bAttribs.street}</span>
          <br />
          <span>{bAttribs.phone || 'Phone # Not Availabe'}</span>
          <br />
          <button
            className="addButton"
            onClick={(e) => {
              bAttribs.addStateToVisited({
                id: bAttribs.id,
                name: bAttribs.name,
                brewery_type: bAttribs.brewery_type,
                state: bAttribs.state,
                city: bAttribs.city,
                phone: bAttribs.phone,
                // usersid: user.usersid,
              })
            }}
          >
            Add to Visited
          </button>
          <button onClick={() => handleOpen(false)} className="review1">
            Reviews
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-ViewComment"
            aria-describedby="modal-modal-description"
            className="outer-modal"
          >
            <div className="inner-modal">
              <ViewComments
                breweryName={bAttribs.name}
                userName={user.username}
                closeView={handleClose}
              />
            </div>
          </Modal>
          <br />
        </div>
      </div>
    )
  } else {
    //render visited component brewery
    return (
      <div className="listStyle">
        <div className="textStyle">
          <span>{bAttribs.breweryname}</span>
          <br />
          <span>{bAttribs.brewerystate}</span>
          <br />
          <span>{bAttribs.brewerycity}</span>
          <br />
          <button
            className="removeButton"
            onClick={(e) => {
              bAttribs.removeVisited({
                id: bAttribs.id,
                name: bAttribs.breweryname,
                brewery_type: bAttribs.brewerytype,
                state: bAttribs.brewerystate,
                city: bAttribs.brewerycity,
                phone: bAttribs.breweryphone,
              })
            }}
          >
            Remove
          </button>
          <button onClick={() => handleOpen(false)} className="review1">
            Reviews
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-ViewComment"
            aria-describedby="modal-modal-description"
            className="outer-modal"
          >
            <div className="inner-modal">
              <ViewComments
                breweryName={bAttribs.breweryname}
                userName={user.username}
                closeView={handleClose}
              />
            </div>
          </Modal>
          <br />
        </div>
      </div>
    )
  }
}

export default Brewery
