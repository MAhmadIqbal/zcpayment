
const express = require('express')
const app = express()
const httpStatus=require('http-status')
require('dotenv').config()
const cors = require('cors')

const bookRoute = require('./route/route')

app.use('/book',bookRoute);

// enable cors
app.use(cors());
app.options('*', cors());

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`)
})
