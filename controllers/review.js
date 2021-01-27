const handleReviewPost = (req, res, db) => {
    const { id, rating, email, description } = req.body;
    if (!id || !rating || !email || !description) {
      return res.status(400).json('incorrect form submission');
    }
    db('reviews').insert({
        id,
        rating,
        email,
        description
    }).then(res.send("POST request to the homepage"))
    .catch(err => res.status(400).json('wrong credentials'))
  }
  
  module.exports = {
    handleReviewPost: handleReviewPost
  };