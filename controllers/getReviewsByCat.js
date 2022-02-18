
// TODO: change the name of this to tests not reviews

// const subquery = knex('all_tests').where('status', 'active').andWhere('title', 'like', `${alphaFilter}%`).select('*');

handleFetchByCat = (req, res, db) => {
    let {cat, alphaFilter} = req.params;
    // alphaFilter = 'A';

    if (alphaFilter =='showAll') {
alphaFilter = '%';
    }
    
    db.select('*').from('all_tests').where(function() {
      this.where('panda_cat', cat)
      .andWhere('title', 'like', `${alphaFilter}%`)
    }).orderBy('title')
    // .where({id, email})
      .then(review => {
          // console.log(review)
        if (review.length) {
        //   console.log(review)
          res.json(review)
        } else {
          res.status(400).json([])
        }
      })
      .catch(err => res.status(400).json({err}))
  }
  
  module.exports = {
handleFetchByCat
  }