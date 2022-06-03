require('dotenv').config()
const express = require('express')
const authRoutes = require("./routes/auth.js")
const artistRoutes = require("./routes/artist.js")
const userRoutes = require("./routes/user.js")
const songRoutes = require("./routes/song.js")
const mysql = require('mysql')

const app = express();


const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// ROUTER
app.use('/api',authRoutes)
app.use('/api',artistRoutes)
app.use('/api',userRoutes)
app.use('/api',songRoutes)

const port = 8000
app.listen(port,()=>{
    console.log(`app is running at ${port}`)   
})

