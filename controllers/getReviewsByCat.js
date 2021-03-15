
// TODO: change the name of this to tests not reviews
handleFetchByCat = (req, res, db) => {
    const {cat} = req.params;
    db.select('*').from('all_tests').where('panda_cat', cat).orderBy('review_avg')
    // .where({id, email})
      .then(review => {
        //   console.log(review)
        if (review.length) {
        //   console.log(review)
          res.json(review)
        } else {
          res.status(400).json([])
        }
      })
      .catch(err => res.status(400).json('error getting review'))
  }
  
  module.exports = {
handleFetchByCat
  }