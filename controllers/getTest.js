const handleTestFetch = (req, res, db) => {
    const {uuid } = req.params;
    db('all_tests').where({uuid})
      .then(test => {
        if (test.length) {
          // console.log(test)
          res.json(test[0])
        } else {
          res.status(400).json([])
        }
      })
      .catch(err => res.status(400).json('error getting test'))
  }
  
  module.exports = {
    handleTestFetch
  }