const handleGetUsersReviews = (req, res, db) => {
    const {uuid} = req.params;

    console.log(uuid)


    db.transaction(trx => {
        trx.select('*')
        .from('user_profiles')
        .where('uuid', uuid )
        .returning('email')
        .then(user => {
            console.log(user[0].email)
          return trx('reviews')
            .returning('*')
            .where('email', user[0].email)
            .then(userReviews => {
              res.json(userReviews);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
      })


    // db('reviews').where({email})
    // // .where({id, email})
    //   .then(review => {
    //     // console.log(review)
    //     if (review.length) {
    //       // console.log(review)
    //       res.json(review)
    //     } else {
    //       res.status(400).json(['error getting review'])
    //     }
    //   })
    //   .catch(err => res.status(400).json('error getting review'))
      // .catch(err => console.log(err))
  }
  
  module.exports = {
    handleGetUsersReviews
  }