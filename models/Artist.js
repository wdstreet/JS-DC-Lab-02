const mongoose = require('mongoose')
const Schema = mongoose.Schema


const artistSchema = new Schema({
    name: String,
    genre: String,
    image: String,

    songs: Array,
    albums: Array,
    comments: Array
})


const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist