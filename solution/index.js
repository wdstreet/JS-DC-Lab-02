const express = require('express')
const hbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://jsdc5:taylorswift2017@ds135912.mlab.com:35912/jsdc5tunr')

const app = express()
const appController = require('./routes/index.js')
const artistController = require('./routes/artists.js')

const Artist = require('./models/Artist.js')

app.engine('handlebars', hbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use( express.static('public') )

app.use('/', appController)
app.use('/artists', artistController)

app.listen(3000)
