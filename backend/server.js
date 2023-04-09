require('dotenv').config()

const express = require('express')

const app = express()

const mongoose = require('mongoose')

const userRoutes = require('./routes/user')

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


app.use(express.json())
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')

  })
  .catch((err) => {
    console.log(err)
  }) 


app.get('/', (req, res) => {
  res.json({mssg: 'Welcome to the app'})
})


app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT)
})

