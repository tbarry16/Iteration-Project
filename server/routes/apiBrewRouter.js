const express = require('express');
const db = require('../db.js')
const brewController = require('../controllers/brewController');

const router = express.Router();

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client('940209212062-b9l97pr2kqluhhm8snj8djsn9prk771p.apps.googleusercontent.com')

router.get('/',
  // brewController.getVisited,
  brewController.getBreweries,
  (req, res) => {
    // console.log('made it back from controller to apiBrewRouter GET middleware');
    // console.dir(`Local Brews: ${res.locals.visited}`);
    // return res.status(200).json(res.locals.getBreweries, res.locals.visited);
    return res.status(200).json(res.locals);
  }
);


router.post('/google-login', async (req, res, next) => {
  const {tokenId} = req.body
  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: '940209212062-b9l97pr2kqluhhm8snj8djsn9prk771p.apps.googleusercontent.com'
  });
  const { email, family_name, given_name, sub } = ticket.getPayload();

  //Query DB to check if user exists. if so 
      //Set res.cookie appropriately
      //return Res.redirect to /
  const userQuery = `SELECT * FROM users WHERE username='${sub}'`
  const result = await db.query(userQuery)
  console.log(result)
  if (result.rows.length) {
    console.log('in result length ')
    res.locals.hasAccount = true
    res.cookie('BrewCookie', sub, {httpOnly: true})
    return res.status(200).json(res.locals)
  }
  //otherwise send back data 
  res.status(200).json({email, family_name, given_name, sub})
});










// ///////////////////////////////////////////////////////////////////////////
// // Not sure if this is how to do the second get to ONLY getVisted //
// router.get("/:state/visited", brewController.getVisited, (req, res) => {
//   console.log("made it back from controller to apiBrewRouter GET middleware");
//   console.log(res.locals.getBreweries);
//   return res.status(200).json(res.locals.visited);
// });

///////////////////////////////////////////////////////////////////////////
// Would this also need to get Updated visited once it's been deleted
// router.delete(
//   "/:state/:id",
//   brewController.deleteVisitedBrew,
//   brewController.getVisited,
//   (req, res) => {
//     console.log(
//       "made it back from controller to the apiBrewRouter DELETE middleware"
//     );
//   }
// );

// router.post(
//   "/:state/:id",
//   brewController.addVisited,
//   brewController.getVisited,
//   (req, res) => {
//     console.log(
//       "made it back from controller to the apiBrewRouter POST middleware"
//     );
//     return res.status(200).json(res.locals.visited);
//   }
// );

module.exports = router;
