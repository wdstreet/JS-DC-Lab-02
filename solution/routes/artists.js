const express = require('express')

const artistController = express.Router()

const Artist = require('../models/Artist.js')

artistController.get('/', (req,res) => {
  Artist.find({}, (err, artists) => {
    res.render('artists/index', {artists})
  })
})

artistController.get('/new', (req,res) => {
  res.render('artists/new')
})
  
artistController.post('/new', (req,res) => {
  let artist = new Artist({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
  })

  artist.save()

  res.redirect(`/artists/${ artist._id }`)
})

artistController.get('/:id', (req,res) => {
  Artist.findOne({ '_id': req.params.id }, (err, artist) => {
    res.render('artists/show', artist)
  })
})

artistController.post('/:id', (req,res) => {
  Artist.find({ '_id': req.params.id }, (err, artist) => {
    artist.comments.push({
      author: req.body.author,
      body: req.body.body
    })
  })
})

artistController.get('/edit/:id', (req, res) => {
  Artist.findOne({'_id': req.params.id}, (err, artist) => {
    res.render('artists/edit', artist)
  })
})

artistController.post('/edit/:id', (req, res) => {
  Artist.findOne({ '_id': req.params.id }, (err, artist) => {
    artist.name = req.body.name
    artist.description = req.body.description
    artist.image = req.body.image

    artist.save()

    res.redirect(`/artists/${ artist._id }`)
  })
})

module.exports = artistController
