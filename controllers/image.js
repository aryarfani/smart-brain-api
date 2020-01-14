handleImagePut = (req, res, db) => {
  const { id } = req.body;

  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('*')
    .then(entries => {
      res.json(entries[0])
    })
    .catch(err => res.status(400).json('user not found'))
}

module.exports = { handleImagePut }