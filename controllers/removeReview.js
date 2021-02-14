const handleReviewRemove = (req, res, db) => {
    const { review_uuid } = req.body
    console.log(req.body)
    console.log(review_uuid)
    db('reviews').where({review_uuid}).del()
    .then(user => {
        res.json('deleted');
      })
    // .then(res.send("Review Deleted!"))
      .catch(err => res.status(400).json('error getting review'))
  }
  
  module.exports = {
    handleReviewRemove
  }