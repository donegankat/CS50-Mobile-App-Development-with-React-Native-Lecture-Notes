const express = require('express')
const bodyParser = require('body-parser')

// Kat had to add this.
var cors = require('cors');

const PORT = process.env.PORT || 8000

// usernames are keys and passwords are values
const users = {
  username: 'password',
}

const app = express()

app.use(express.json())

app.use(cors({origin:true,credentials: true}));

app.post('/', (req, res) => {
  console.log(req.body)
  const {username, password} = req.body

  if (!username || !password) {
    console.log("Bad Request")
    return res.status(400).send('Missing username or password')
  }

  // in practice, this is potentially revealing too much information.
  // an attacker can probe the server to find all of the usernames.
  if (!users[username]) {
    console.log("User not found")
    return res.status(403).send('User does not exist')
  }

  if (users[username] !== password) {
    console.log("Incorrect password")
    return res.status(403).send('Incorrect password')
  }

  console.log("Ok")
  return res.status(200).send()
})

// catch 404
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => res.status(err.status || 500).send(err.message || 'There was a problem'))

const server = app.listen(PORT)
console.log(`Listening at http://localhost:${PORT}`)
