const express = require('express')
const hbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://wdstreet:3edc$RFV5tgb@pokedex-shard-00-00-kg33f.mongodb.net:27017,pokedex-shard-00-01-kg33f.mongodb.net:27017,pokedex-shard-00-02-kg33f.mongodb.net:27017/tunr?ssl=true&replicaSet=pokedex-shard-0&authSource=admin')

const app = express()



app.engine('handlebars', hbs({defaultLayout: 'main'}))
app.set('view engine','handlebars')
app.use(express.static('public'))

const Artist = require('./models/Artist.js')
const appRouter = require('./routes/index.js')
const artistRouter = require('./routes/artists.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',appRouter)
app.use('/artists',artistRouter)

app.listen( 5000, function() {
  console.log( 'Tunr is on 5000 and Running' )
})