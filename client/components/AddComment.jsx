import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const AddComment = (props) => {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState();
  const { userName, closeView, breweryName, fetchComments } = props;
  const theme = createTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      title: event.target[0].value,
      comment: event.target[2].value,
      date: event.target[5].value,
      username: userName,
      breweryname: breweryName
    }
    fetch(`/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        fetchComments(breweryName)
      })
      .then(() => {
        closeView(false);
      })
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 7,
              marginBottom: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h3">
              Your Review!
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                id="outlined"
                label="Title:"
                placeholder="Something Clever."
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "white" }}
              />
              <TextField
                fullwidth
                id="outlined-multiline-static"
                label="Comments:"
                multiline
                rows={4}
                placeholder="What'd you think?"
                fullWidth
                sx={{ mb: 2 }}
                style={{ backgroundColor: "white" }}
              />
              <TextField
                fullwidth
                id="date"
                type="date"
                min="2020-01-01"
                max="2022-04-31"
                fullWidth
                style={{ backgroundColor: "white" }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
              >
                Submit
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
                onClick={closeView}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default AddComment;

