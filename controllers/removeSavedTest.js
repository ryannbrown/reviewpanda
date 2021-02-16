
// var knex = require('knex')({ debug: false, client: 'pg' });
const uuid = require('uuid').v4
const handleRemoveSavedTest = (req, res, db, uuidv4) => {
    const { email, test_uuid } = req.body;
  
console.log("removing", email, test_uuid)

    if (!test_uuid || email == 'undefined') {
      console.log("we have a problem")
  
      // return;
      return res.status(400).json('incorrect form submission');
    }

    // db('reviews')                               //users table
    // .where({email})
    // .update({
    //     array_column_name: knex.raw('array_append(array_column_name, ?)', [data_to_append])
    // })

    db('user_profiles').where({email}).update({saved: db.raw(`array_remove(saved, ?)`, [test_uuid.item])})
    .then(res.send("POST request to the homepage"))
    .catch(err =>  console.log(err))
  }
  
  module.exports = {
    handleRemoveSavedTest: handleRemoveSavedTest
  };