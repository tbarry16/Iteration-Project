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
  const { userName, closeView } = props;
  const theme = createTheme();

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Your Review!
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                id="outlined"
                label="Title:"
                defaultValue="Something Clever."
              />
              <TextField
                id="outlined-multiline-static"
                label="Comments:"
                multiline
                rows={4}
                defaultValue="What'd you think?"
              />
              <TextField
                id="date"
                label="Date:"
                type="date"
                min="2020-01-01"
                max="2022-04-31"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <button onClick={closeView}>Close</button>
    </div>
  )
}

export default AddComment;

