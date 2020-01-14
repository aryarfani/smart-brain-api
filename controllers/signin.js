handleSignin = (req, res, db, bcrypt) => {
  db.select('email', 'hash').from('login')
    .where('email', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
      if (isValid) {
        db('users')
          .where('email', req.body.email)
          .then(user => {
            res.json(user[0])
          })
      } else {
        res.status(400).json('email or password is invalid')
      }
    })
    .catch(err => res.status(400).json(err))
}

module.exports = { handleSignin }