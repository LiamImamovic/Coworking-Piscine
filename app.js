const express = require('express')
const app = express()
const port = 3000
var morgan = require('morgan')
var favicon = require('serve-favicon')


const coworkings = require('./mock-coworkings');

app.use(morgan('dev'));
app.use(favicon((__dirname,'favicon.ico')))

app.get('/api/coworkings', (req, res) => {
    // Renvoyer tous les coworkings au format json, uniquement ceux dont la surface est supérieure à 500
    console.log(req.query)
    const limit = req.query.limit || 200
    const result = coworkings.filter(element => element.superficy > limit);

    res.json(result)
})

app.get('/api/coworkings/:id', (req, res) => {

    const myCoworking = coworkings.find(element => element.id == req.params.id)
    const msg = `Le coworking  n°${myCoworking.id} a bien été retourné`

    myCoworking ? res.json({message: msg, data: myCoworking}) : res.status(404).json({message: `Le coworking n°${myCoworking.id}'existe pas`})

})

app.listen(port, () => {
    console.log(`L'app sur le port ${port}`)
})