const express = require('express')
var bodyParser = require('body-parser')

const path = require('path');

const app = express()
const port = 3000;

app.use(bodyParser.json())

// serve static files
app.use('/static', express.static('src'))

// api paths
var apiRouter = require('./game');
app.use('/game', apiRouter);

// entry point of app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

app.listen(port, () => {
  console.log(`Now listening on port ${port}`)
})