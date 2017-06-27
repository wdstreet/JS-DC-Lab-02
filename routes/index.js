const express = require('express')
const Artist = require('../models/Artist.js')

const appRouter = express.Router()

appRouter.get('/', function(req,res){
  Artist.find({}, function(err,artists){
    res.render('home',{artists})
  })
})

module.exports = appRouter