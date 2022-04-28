import React, { useState, useEffect } from 'react';
import Brewery from './Brewery.jsx';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Comment from './Comment';
import AddComment from './AddComment';

const ViewComments = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [comments, setComments] = useState([]);
  const { breweryName, userName, closeView } = props;

  // fetch * from comment table where breweryID = brewId
  useEffect(() => {
    fetchComments(breweryName)
  }, [])

  function fetchComments(breweryName) {
    return fetch(`/comments/${breweryName}`)
      .then(data => data.json())
      .then(data => setComments(data))
  }

  //assign data to an array of objects
  const commentArray = comments.map((comment, index) => {
    return (
      <Comment className="reviewLine"
        {...comment}
        key={index}
      />
    )
  })

  return (
    <div>
      <div>
        <div className="reviewBox">
          <h2>Reviews:</h2>
          {commentArray.length ? commentArray : <p>No reviews :( Be the first to write one!</p>}
          <button onClick={closeView} className="closeB">Close</button>
          <button onClick={handleOpen} className="reviewB">Add Review</button>
        </div>
      </div>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-AddComment"
        aria-describedby="form-to-add-comments"
        className="outer-modal2"
      >
        <div className="inner-modal">
          <AddComment
            breweryName={breweryName}
            userName={userName}
            closeView={handleClose}
            fetchComments={fetchComments}
          />
        </div>
      </Modal>
    </div>
  )
}

export default ViewComments;