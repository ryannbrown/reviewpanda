
const sanitizeHtml = require('sanitize-html');
const uuid = require('uuid').v4
const handleReviewPost = (req, res, db, uuidv4) => {
    let { avatar, title, test_uuid, test_abbrev, rating, email, description, full_name, date_posted, user_uuid, has_uploaded_img, review_count, total_stars, reliable, userFriendly, costEffective } = req.body;
    let test_title = title;
    console.log("user uuid", user_uuid)

    let newAvgCalc = total_stars + rating;
let newAvg = newAvgCalc / review_count;
    console.log( rating, review_count)

    console.log(newAvg)

    const cleanHtml = sanitizeHtml(description)

    // console.log(cleanHtml);


    if (!test_uuid || !rating || !email || !description  || !title || email == 'undefined') {
      console.log("we have a problem")
      console.log(test_uuid, rating, email, description)
      // return;
      return res.status(400).json('incorrect form submission');
    }

    if (has_uploaded_img) {
      avatar = `https://reviewpanda.s3.amazonaws.com/${avatar}`;
    }

    console.log(avatar)

  

    console.log("Looks good: ", email)



    db.transaction(trx => {
      db('reviews')
      .insert([
        {
            // TODO ADD LINK ON SITE WHERE TEST IS
            user_uuid,
        test_title: test_title,
        test_uuid: test_uuid,
        test_abbrev,
        rating: rating,
        reliable,
        userFriendly,
        costEffective,
        email: email,
        description: cleanHtml,
        full_name,
        avatar,
        review_uuid:  uuid(),
        date_posted: new Date(),
        review_count: review_count,
        review_avg: newAvg
      }
         ])
         .returning('*')
      .then(review => {
        // console.log(user)
          // console.log(data)
        return trx('all_tests')
          .returning('*')
          .where('uuid', review[0].test_uuid)
          .update(
              {
              review_count: review_count,
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
    handleReviewPost: handleReviewPost
  };