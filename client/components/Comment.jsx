import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserDetails';
import Modal from '@mui/material/Modal';

const Comment = (props) => {
  const { title, comment, date } = props;

  return (
    <div className="reviewStyle">
      <div className="textStyle">
        <span>{title}</span>
        <br />
        <span>{comment}</span>
        <br />
        <span>{date}</span>
      </div>
    </div>
  )
}

export default Comment;
