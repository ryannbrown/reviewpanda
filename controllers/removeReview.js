const handleReviewRemove = (req, res, db) => {
    const { review_uuid, review_count, total_stars } = req.body
    console.log(req.body)
    console.log(review_uuid)

    console.log(total_stars)

    let newAvg = total_stars / review_count


  db.transaction(trx => {
    db('reviews').where({review_uuid}).del()
   .returning('test_uuid')
      .then(uuid => {
        console.log("test uuid", uuid[0])
        // console.log(user)
          // console.log(data)
        return trx('all_tests')
          .where('uuid', uuid[0])
          .update({'review_count' : review_count,
        review_avg: newAvg})
          .then(
            res.json('success'))
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })




    // db('reviews').where({review_uuid}).del()
    // .then(user => {
    //     res.json('deleted');
    //   })
    // // .then(res.send("Review Deleted!"))
    //   .catch(err => res.status(400).json('error getting review'))
  }
  
  module.exports = {
    handleReviewRemove
  }