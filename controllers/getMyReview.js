const handleMyReview = (req, res, db) => {
    const {test_uuid, email } = req.params;
    db('reviews').distinctOn('email').where({test_uuid, email})
    // .where({id, email})
      .then(review => {
        // console.log(review)
        if (review.length) {
          // console.log(review)
          res.json(review)
        } else {
          res.status(400).json(['error getting review'])
        }
      })
      .catch(err => res.status(400).json('error getting review'))
      // .catch(err => console.log(err))
  }
  
  module.exports = {
    handleMyReview
  }