const handleCatsFetch = (req, res, db) => {
    console.log('we are here')
    // const {id } = req.params;
    db.select('*').from('par_cats')
      .then(cat => {
          console.log(cat)
        if (cat.length) {
          // console.log(cat)
          res.json(cat)
        } 
        
        // else {
        //   res.status(400).json([])
        // }
      })
      .catch(err => res.status(400).json(err))
  }
  
  module.exports = {
    handleCatsFetch
  }