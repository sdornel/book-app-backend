const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')

const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors()) // use cors

app.use(passport.initialize())
app.use(passport.session());

app.use(bodyParser.json())
app.use('/api', routes);


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))