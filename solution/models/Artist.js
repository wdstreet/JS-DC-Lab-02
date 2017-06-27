const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artistSchema = new Schema({
  name: String,
  image: String,
  description: String,
  comments: Array
})

const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist
