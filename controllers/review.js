
const uuid = require('uuid').v4
const handleReviewPost = (req, res, db, uuidv4) => {
    const { id, rating, email, description } = req.body;
    if (!id || !rating || !email || !description) {
      console.log("we have a problem")
      return res.status(400).json('incorrect form submission');
    }
    db('reviews')
    .insert([
      {
      id: id,
      rating: rating,
      email: email,
      description: description,
      review_id:  uuid()
    }
       ])
    .then(res.send("POST request to the homepage"))
    .catch(err => res.status(400).json('wrong credentials'))
  }
  
  module.exports = {
    handleReviewPost: handleReviewPost
  };