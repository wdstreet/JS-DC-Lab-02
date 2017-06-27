const express = require('express')
const Artist = require('../models/Artist.js')

const artistsRouter = express.Router()

artistsRouter.get('/new', function (req, res) {
    res.render('./artists/new')
})

artistsRouter.post('/new', (req, res) => {
    const newArtist = new Artist({
        name: req.body.name,
        image: req.body.image,
        genre: req.body.genre,
        songs: req.body.songs.split(','),
        albums: req.body.albums.split(',')
    })
    newArtist.save(function () {
        res.redirect('/')
    })
})

artistsRouter.get('/edit/:id', (req, res) => {
    Artist.findOne({
        '_id': req.params.id
    }, (err, artist) => {
        res.render('./artists/edit', artist)
    })
})

artistsRouter.post('/edit/:id', (req, res) => {
    Artist.findOne({
        '_id': req.params.id
    }, (err, artist) => {
        artist.name = req.body.name
        artist.image = req.body.image
        artist.genre = req.body.genre
        artist.songs.push(req.body.song)
        artist.albums.push(req.body.album)
        artist.save(function () {
            res.redirect('/artists/' + req.params.id)
        })
    })
})

artistsRouter.get('/:id', (req, res) => {
    Artist.findOne({
        '_id': req.params.id
    }, (err, artist) => {
        res.render('artists/show', artist)
    })
})

artistsRouter.post('/:id', (req, res) => {
    let date = new Date()
    let month = date.getMonth()
    let day = date.getDay()
    let year = date.getFullYear()
    let fullDate = month + "/" + day + "/" + year
    Artist.findOne({
        '_id': req.params.id
    }, (err, artist) => {
        let newCmnt = {
            comment: req.body.comment,
            author: req.body.author,
            date: fullDate
        }
        artist.comments.push(newCmnt)
        artist.save()
        res.render('artists/show', artist)
    })
})

artistsRouter.post('/delete/:id', (req, res) => {
    Artist.findOne({
        '_id': req.params.id
    }, (err, artist) => {
        artist.remove(function () {
            res.redirect('/')
        })
    })
})


module.exports = artistsRouter