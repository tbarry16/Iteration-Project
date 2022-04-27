const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');
const apiBrewRouter = require("./routes/apiBrewRouter");
const visitRouter = require("./routes/visitRouter");
const db = require("./db.js");


const userController = require('./userController');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", apiBrewRouter);

app.use("/visited", visitRouter);

app.use("/client", express.static(path.resolve(__dirname, "../client")));

app.get('/userlanding', (req, res) => {
  res.redirect('/')
})

app.get('/', userController.checkUser, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/template.html'));
});

app.get('/login', userController.checkUser, (req, res) => {
  if (res.locals.isLoggedIn) {
    res.status(200).json(res.locals);
  } else {
    res.redirect('/')
  }
})

app.post('/createUser', userController.createUser,  (req, res) => {
  res.json(res.locals.users);
});

app.post(
  '/login',
  userController.verifyLogin,
  userController.setCookie,
  userController.checkUser,
  (req, res) => {
    res.status(200).json(res.locals);
    console.log('login success!');
    // res.redirect('/userlanding');
  }
);

app.get('/logout', (req, res) => {
  res.clearCookie('BrewCookie')
  res.send('Successfully logged out')
})

// app.get('/', (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, '../client/template.html'));

// });

// ERROR HANDLER
//invoked if you pass an argument to next()
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };

  const errorObj = Object.assign(defaultErr, err);

  console.log("ERROR: ", errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

module.exports = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
