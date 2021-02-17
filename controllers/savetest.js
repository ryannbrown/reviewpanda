
var knex = require('knex')({ debug: false, client: 'pg' });
const uuid = require('uuid').v4
const handleSaveTest = (req, res, db, uuidv4) => {
    const { email, test_uuid, title } = req.body;

    const array = []
    array.push(test_uuid, title)
    console.log(array)
  
console.log(email, test_uuid)

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

    // db('user_profiles').where({email}).update({saved: db.raw('array_append(saved, ?, ?)', [test_uuid, title ])})

    // db('user_profiles').where({email}).update(db.raw(`SET saved = saved || ${test_uuid}`) )



    db('user_profiles').where({email}).update({saved: db.raw('array_append(saved, ?)', [array])})

    // UPDATE cds_users SET saved = saved || '{${data.itemId}}' WHERE email = $1
    .then(res.send("POST request to the homepage"))
    .catch(err =>  console.log(err))
  }
  
  module.exports = {
    handleSaveTest: handleSaveTest
  };