const handlePopTestsGet = (req, res, db) => {

    db('all_tests').where('review_count', '>', 0).orderBy('review_count', 'desc').limit(6)
      .then(tests => {
        if (tests.length) {
          // console.log(test)
          res.json(tests)
        } else {
          res.status(400).json([])
        }
      })
      .catch(err => res.status(400).json('error getting test'))
  }
  
  module.exports = {
    handlePopTestsGet
  }