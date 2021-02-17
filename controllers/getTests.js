const handleTestsFetch = (req, res, db) => {
    // const {id } = req.params;
    db.select().from('all_tests')
      .then(test => {
        if (test.length) {
          // console.log(test)
          res.json(test)
        } else {
          res.status(400).json([])
        }
      })
      .catch(err => res.status(400).json('error getting test'))
  }
  
  module.exports = {
    handleTestsFetch
  }