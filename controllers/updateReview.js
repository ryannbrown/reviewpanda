
// const uuid = require('uuid').v4
const handleUpdateReviewPost = (req, res, db, uuidv4) => {
    const {review_uuid, rating, description, full_name, test_abbrev, total_stars, review_count, reliable, userFriendly,
      costEffective, } = req.body;

    console.log(total_stars)


    let newAvgCalc = total_stars + rating
    let newAvg = newAvgCalc / review_count;

    console.log(newAvg)


    db.transaction(trx => {


      db('reviews')
      .where('review_uuid',  review_uuid)
      .update(
        {
        rating: rating,
        reliable,
        userFriendly,
        costEffective,
        description: description,
        test_abbrev
      }
         ).returning('*')
         .then(review => {
          // console.log(user)
            // console.log(data)
          return trx('all_tests')
            .returning('*')
            .where('uuid', review[0].test_uuid)
            .update(
                {
                review_avg: newAvg
              }
                 )
            .then(
              res.json('success'))
        })
   
      .then(trx.commit)
      .catch(trx.rollback)
    })
    }

  
  
  module.exports = {
    handleUpdateReviewPost: handleUpdateReviewPost
  };