const express = require('express')

const appController = express.Router()

const Artist = require('../models/Artist.js')

appController.get('/', ( req, res ) => {
  Artist.find({}).limit(6).exec( ( err, artists ) => {
    res.render('index', { artists })
  })
})

appController.get('/about', ( req, res ) => {
  res.render('about')
})

module.exports = appController
