
// const uuid = require('uuid').v4
const handleAddImg = (req, res, db,) => {

    const {image, uuid } = req.body;



    db.transaction(trx => {
        db('user_profiles')
        .where('uuid',  uuid)
        .returning('*')
        .update(
          {
          avatar: image,
            has_uploaded_img: true
        }
           )
        .then(user => {
            // console.log(data)
          return trx('reviews')
            .returning('*')
            .where('user_uuid', user[0].uuid)
            .update(
                {
                avatar: `https://reviewpanda.s3.amazonaws.com/${image}`
              }
                 )
            .then(userReviews => {
              res.json(userReviews);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
      })




    // const {image, uuid } = req.body;
// console.log(image)
//     db('user_profiles')
//     .where('uuid',  uuid)
//     .update(
//       {
//       avatar: image
//     }
//        )
//     .then(res.send("POST request to the homepage"))
//     .catch(err =>  console.log(err))
  }
  
  module.exports = {
    handleAddImg: handleAddImg
  };