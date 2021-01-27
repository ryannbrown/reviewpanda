const handleReviewGet = (req, res, db) => {
    const {id } = req.params;
    db('reviews').where({id: id})
      .then(review => {
        if (review.length) {
          // console.log(review)
          res.json(review)
        } else {
          res.status(400).json([])
        }
      })
      .catch(err => res.status(400).json('error getting review'))
  }
  
  module.exports = {
    handleReviewGet
  }