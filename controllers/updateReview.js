
// const uuid = require('uuid').v4
const handleUpdateReviewPost = (req, res, db, uuidv4) => {
    const {review_uuid, rating, description } = req.body;
    // let test_title = title;
    // if (!test_uuid || !rating || !email || !description, !title) {
    //   console.log("we have a problem")
    //   console.log(test_uuid, rating, email, description)
    //   // return res.status(400).json('incorrect form submission');
    // }cons

  

    // console.log("Looks good: ", title, test_uuid, rating, email, description)
    db('reviews')
    .where('review_uuid',  review_uuid)
    .update(
      {
      rating: rating,
      description: description,
    }
       )
    .then(res.send("POST request to the homepage"))
    .catch(err =>  console.log(err))
  }
  
  module.exports = {
    handleUpdateReviewPost: handleUpdateReviewPost
  };