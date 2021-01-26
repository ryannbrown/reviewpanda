const handleRegister = (req, res, db, bcrypt) => {
    const { email, first_name, last_name, password, subscribed } = req.body;
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
              joined: new Date()
            })
            .then(user => {
              res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
      })
      .catch(err => res.status(400).json('unable to register'))
  }
  
  module.exports = {
    handleRegister: handleRegister
  };