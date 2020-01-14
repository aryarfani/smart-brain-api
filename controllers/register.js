const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);

  // transaction is to make sure that two relational table created together
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        console.log(loginEmail)
        return trx('users')
          .returning('*') // to return the actual data
          .insert({
            name: name,
            email: loginEmail[0],
            joindate: new Date()
          })
          .then(response => {
            res.json(response[0])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .catch(err => res.json(err))
}

module.exports = { handleRegister }