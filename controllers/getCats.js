const handleCatsFetch = (req, res, db) => {
    console.log('we are here')
    db('all_tests').distinct('panda_cat')
      .then(cat => {
        for (var i = cat.length - 1; i >= 0; --i) {
          if (cat[i].panda_cat == "Interventions" || cat[i].panda_cat =='Resources') {
              cat.splice(i,1);
          }
      }

        if (cat.length) {
          res.json(cat)
        } 
        
      })
      .catch(err => res.status(400).json(err))
  }
  
  module.exports = {
    handleCatsFetch
  }