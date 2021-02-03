const handleTestFetch = (req, res, db) => {
    const {id } = req.params;
    db('pearson_tests').where({id})
      .then(test => {
        if (test.length) {
          console.log(test)
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