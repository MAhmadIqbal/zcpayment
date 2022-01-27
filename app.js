
const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const ApiError=require('./route/error')
const httpStatus = require('http-status');
const bodyParser = require('body-parser');
// require('body-parser-xml')(bodyParser);
const zcashRoute = require('./route/route')


// enable cors
app.use(cors());
app.options('*', cors());

//parse requset
// app.use(bodyParser.xml());

// app.use(bodyParser.urlencoded({extended:true}));
// send back a 404 error for any unknown api request
app.use('/zcash',zcashRoute);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Route Not found in Server APIs'));
});


const port = process.env.PORT
app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`)
})
