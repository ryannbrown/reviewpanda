const handleTopContribGet = (req, res, db) => {
    const {test_uuid } = req.params;
    console.log(test_uuid)
    db('reviews').select('*').distinctOn('email')
      .then(review => {
        console.log(review, "review")
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
    handleTopContribGet
  }