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
  const [comments, setComments] = useState();
  const { brewId, userName, closeView } = props;

  // fetch * from comment table where breweryID = brewId
  // useEffect(() => {
  //   fetch(`/comments/${brewId}`)
  //     .then(data => data.json())
  //     .then(data => setComments(data))
  // })

  //hardcoded sample data
  const commentList = [
    {
      title: 'Hello',
      comment: 'Really Good Beer',
      date: 'Monday',
    },
    {
      title: 'Howdy',
      comment: 'Beer sucks',
      date: 'Tuesday',
    },
    {
      title: 'Hi',
      comment: 'Beer sucks or Good',
      date: 'Wensday',
    },
    {
      title: 'Here',
      comment: 'Beer too strong',
      date: 'Thursday',
    },
    {
      title: 'There',
      comment: 'Beer too bitter',
      date: 'Friday',
    }
  ]

  //assign data to an array of objects
  const commentArray = commentList.map((comment, index) => {
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
          {commentArray}
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
            userName={userName}
            closeView={handleClose}
          />
        </div>
      </Modal>
    </div>
  )
}

export default ViewComments;