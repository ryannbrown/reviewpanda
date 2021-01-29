const handleMyReview = (req, res, db) => {
    const {id, email } = req.params;
    db('reviews').distinctOn('email').where({id, email})
    // .where({id, email})
      .then(review => {
        if (review.length) {
          console.log(review)
          res.json(review)
        } else {
          res.status(400).json([])
        }
      })
      .catch(err => res.status(400).json('error getting review'))
  }
  
  module.exports = {
    handleMyReview
  }