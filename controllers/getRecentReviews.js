const handleRecentReviewGet = (req, res, db) => {




  
    // const {test_uuid } = req.params;
    // console.log(test_uuid)
    db.select().from('recent_reviews').orderBy('id', 'DESC').returning('*')
    // db('reviews').distinctOn('test_title').orderBy('date_posted')
      .then(review => {
        console.log(review, "review")
        if (review.length) {
          // console.log(review)
          res.json(review)
        } else {
          res.status(400).json([])
        }
      })
      .catch(err => console.log(err))
  }
  
  module.exports = {
    handleRecentReviewGet
  }