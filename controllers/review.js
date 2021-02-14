
const uuid = require('uuid').v4
const handleReviewPost = (req, res, db, uuidv4) => {
    const { title, test_uuid, rating, email, description } = req.body;
    let test_title = title;
    if (!test_uuid || !rating || !email || !description, !title) {
      console.log("we have a problem")
      console.log(test_uuid, rating, email, description)
      // return res.status(400).json('incorrect form submission');
    }

  

    console.log("Looks good: ", title, test_uuid, rating, email, description)
    db('reviews')
    .insert([
      {
          // TODO ADD LINK ON SITE WHERE TEST IS
      test_title: test_title,
      test_uuid: test_uuid,
      rating: rating,
      email: email,
      description: description,
      review_uuid:  uuid()
    }
       ])
    .then(res.send("POST request to the homepage"))
    .catch(err =>  console.log(err))
  }
  
  module.exports = {
    handleReviewPost: handleReviewPost
  };