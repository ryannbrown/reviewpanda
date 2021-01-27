const handleProfileGet = (req, res, db) => {
    const {email } = req.params;
    db.select('*').from('user_profiles').where({email})
      .then(user => {
        if (user.length) {
          // console.log(user)
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