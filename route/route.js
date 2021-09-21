
const express = require('express')
const router = express.Router()
const util = require('../util')        
    //-------Endpoints-Starts-------------------------
// just locally have file and get request will give response back with file to client
router.get('/file1/:index',util.fileSend)
// Route which return the another file with 25000 limit
router.get('/file2/:index',util.fileSendother)

module.exports=  router;