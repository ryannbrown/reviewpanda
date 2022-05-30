require('dotenv').config()
const mailchimp = require("@mailchimp/mailchimp_marketing");



mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us14",
});

const addContact =  async (email, first_name, last_name) => {
  console.log('data going into mc', email, first_name, last_name )
  const listId = process.env.LIST_ID
  const response = await mailchimp.lists.setListMember(
    listId,
    email,
    {first_name: first_name, last_name: last_name }
    // {merge_fields: {
    //   "INTTOUSE":optionSelected
    // }}
  ) .catch(err => console.log(err))
  console.log("Response", response);
}



const handleProfileGet = (req, res, db) => {
    const {email } = req.params;
    db.select('*').from('user_profiles').where({email})
      .then(user => {
        if (user.length) {
          // console.log("li user", user)
           addContact(user[0].email, user[0].first_name, user[0].last_name)
          res.json(user[0])
        } else {
          res.status(400).json('Not found')
        }
      })
      .catch(err => res.status(400).json('error getting user'))
  }
  
  module.exports = {
    handleProfileGet
  }