const handleTopContribGet = (req, res, db) => {
    const {test_uuid } = req.params;
    console.log(test_uuid)


    // db.select(['avatar', 'user_uuid'], db.raw('Count(*)')).from('reviews').groupByRaw(['user_uuid', 'avatar']).orderBy('Count(*)', 'desc')
    db.raw(`SELECT avatar, user_uuid, Count(*)
    FROM reviews
    GROUP BY user_uuid, avatar
    ORDER BY COUNT(*) DESC`)
      .then(review => {
        console.log(review.rows, "reviews")
        if (review) {
          let data = review.rows
          // console.log(review)
          res.json(data)
        } else {
          res.status(400).json([])
        }
      })
      .catch(err => res.status(400).json('error getting review'))

    // app.get("/api/cats", (req, res) => {
    //     getCats.handleCatsFetch(req, res, db);
    //   });



    // db.transaction(trx => {
    //   trx.select('*')
    //   .from('reviews')
    //   .where('uuid', uuid )
    //   .distinctOn('email')
    //   .returning('user_uuid')
    //   .then(user => {
    //       // console.log(user[0].email)
    //     return trx('reviews')
    //       .returning('*')
    //       .where('email', user[0].email)
    //       .then(userReviews => {
    //         res.json(userReviews);
    //       })
    //   })
    //   .then(trx.commit)
    //   .catch(trx.rollback)
    // })


    // db('reviews').select('*').distinctOn('email')
    //   .then(review => {
    //     console.log(review, "review")
    //     if (review.length) {
    //       // console.log(review)
    //       res.json(review)
    //     } else {
    //       res.status(400).json([])
    //     }
    //   })
    //   .catch(err => res.status(400).json('error getting review'))
  }
  
  module.exports = {
    handleTopContribGet
  }







  // db('reviews').select('*').distinctOn('email')
  // .then(review => {
  //   console.log(review, "review")
  //   if (review.length) {
  //     // console.log(review)
  //     res.json(review)
  //   } else {
  //     res.status(400).json([])
  //   }
  // })
  // .catch(err => res.status(400).json('error getting review'))