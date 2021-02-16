
const uuid = require('uuid').v4
const handleReviewPost = (req, res, db, uuidv4) => {
    const { avatar, title, test_uuid, rating, email, description, full_name, date_posted } = req.body;
    let test_title = title;


    if (!test_uuid || !rating || !email || !description  || !title || email == 'undefined') {
      console.log("we have a problem")
      console.log(test_uuid, rating, email, description)
      // return;
      return res.status(400).json('incorrect form submission');
    }

  

    console.log("Looks good: ", email)
    db('reviews')
    .insert([
      {
          // TODO ADD LINK ON SITE WHERE TEST IS
      test_title: test_title,
      test_uuid: test_uuid,
      rating: rating,
      email: email,
      description: description,
      full_name,
      avatar,
      review_uuid:  uuid(),
      date_posted: new Date()
    }
       ])
    .then(res.send("POST request to the homepage"))
    .catch(err =>  console.log(err))
  }
  
  module.exports = {
    handleReviewPost: handleReviewPost
  };