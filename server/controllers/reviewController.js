const db = require('../db.js');


const reviewController = {}

reviewController.addReview = async (req, res, next) => {

    const { title, comment, date, username, breweryname } = req.body;
    const values = [title, comment, date, username, breweryname];
    console.log('req.body: ', req.body);
    const insertReviewQuery = `INSERT INTO reviews (title, comment, date, username, breweryname) VALUES ($1, $2, $3, $4, $5)`
    db.query(insertReviewQuery, values)

    return next()
}

reviewController.getReviews = async (req, res, next) => {
  console.log(req.params)
  const breweryName = req.params.brewery;
  const values = [breweryName];
  const queryString = `SELECT * FROM reviews WHERE breweryname = ($1)`;
  try {
    const reviews = await db.query(queryString, values);
    res.locals.reviews = reviews.rows;
    console.log(res.locals.reviews);
    return next();
  } catch (err) {
    throw new Error({
      log: 'error in the brewController getVisited method',
      message: { err: 'error in the brewController getVisited method' },
    });
  }
}


module.exports = reviewController;