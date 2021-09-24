
const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const ApiError=require('./util/error')
const httpStatus = require('http-status');

const bookRoute = require('./route/route')

app.use('/book',bookRoute);

// enable cors
app.use(cors());
app.options('*', cors());

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Route Not found in Server APIs'));
  });


const port = process.env.PORT
app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`)
})
