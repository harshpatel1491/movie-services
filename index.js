const express = require('express')

const app = express()

const db = require('./dbconnect');

app.use(require('./movie-services/index'))

app.listen(1234, () => console.log(`listening on port 1234 ...`));