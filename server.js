const cors = require('cors')
const express = require('express')
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const db = mongoose.connection
const mongoURI = process.env.MONGO_URI
const PORT = process.env.PORT || 3001
const User = require('./models/User')
const userData = require('./utilities/data')
const loginRoute = require('./controllers/User')
//connecting to my database
//connecting to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true},
    () => console.log('MongoDB connection establish') )
 

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))


// Middleware
app.use(express.urlencoded({ extended: false }))// extended: false - does not allow nested objects in query strings
app.use(express.json()); //use .json(), not .urlencoded()
app.use(express.static('public')) // we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file!
app.use(cors())

//my api for existing users and registeration
app.use('/api/users', loginRoute)


app.get('/users', async (req,res)=>{
    User.find({}, (err, foundUsers)=>{
        res.json(foundUsers)
    })
})

// seeding the db
app.get('/seed', async (req, res) => {
    await User.deleteMany({});
    await User.insertMany(userData);
    res.send('done!');
  })


app.listen(PORT, ()=> {
    console.log(`Listening on ${PORT} `)
})