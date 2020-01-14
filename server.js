const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register')
const image = require('./controllers/image')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')



// knex is query builder to make sql easier
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'sandal123',
    database: 'smart-brain'
  }
});

app.use(express.json()); // to parse argumen into json
app.use(cors()); // to bypass chrome security of cors

app.get('/', (req, res) => {
  db('users').then(data => res.json(data))
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImagePut(req, res, db) })


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
})


