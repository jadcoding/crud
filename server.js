// console.log('May Node be with you')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
var db

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.post('/quotes', (req, res) => {
  console.log(req.body)
  db.collection('jad').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/', (req, res) => {
  db.collection('jad').find().toArray(function (err, results) {
    console.log(results)
    res.render('index.ejs', {quotes: results})
    
    
  })
})

MongoClient.connect('mongodb://jadcodi:c0dijad@ds261929.mlab.com:61929/star-wars-quotes', (err, client) => {
  if (err) return console.log(err)
  db = client.db('star-wars-quotes')
  app.listen(3000, function () {
    console.log('listening on 3000')
  })
})
