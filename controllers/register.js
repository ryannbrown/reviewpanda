const uuid = require('uuid').v4

const handleRegister = (req, res, db, bcrypt) => {
    const { email, first_name, last_name, password, subscribed, prof_title, license } = req.body;
    let title = prof_title
    let license_number = license
    let defaultImg = 'https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png'
    if (!email || !first_name || !last_name || !password) {
      return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
      db.transaction(trx => {
        trx.insert({
          password: hash,
          email: email
        })
        .into('user_logins')
        .returning('email')
        .then(loginEmail => {
          return trx('user_profiles')
            .returning('*')
            .insert({
              email: loginEmail[0],
              first_name: first_name,
              last_name: last_name,
              subscribed: subscribed,
              title,
              avatar: defaultImg,
              uuid: uuid(),
              license_number,
              joined: new Date()
            })
            .then(user => {
              res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
      })
      // .catch(err => res.status(400).json('unable to register'))
      .catch(err => console.log(err))
  }
  
  module.exports = {
    handleRegister: handleRegister
  };