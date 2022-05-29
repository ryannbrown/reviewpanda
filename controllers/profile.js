require('dotenv').config()
const mailchimp = require("@mailchimp/mailchimp_marketing");



mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us14",
});

const addContact =  async (email, first_name, last_name) => {
  const listId = process.env.LIST_ID
  const response = await mailchimp.lists.updateListMember(
    listId,
    email,
    {first_name: first_name, last_name: last_name }
    // {merge_fields: {
    //   "INTTOUSE":optionSelected
    // }}
  )
  console.log(response);
}



const handleProfileGet = (req, res, db) => {
    const {email } = req.params;
    db.select('*').from('user_profiles').where({email})
      .then(user => {
        if (user.length) {
          // console.log("li user", user)
           addContact(user.email, user.first_name, user.last_name)
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