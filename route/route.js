
const express = require('express')
const router = express.Router()
const util = require('../util')        
    //-------Endpoints-Starts-------------------------
// just locally have file and get request will give response back with file to client
const validation=async function(req,res,next){
    const indexvalue = parseInt(req.params.index)
    console.log("index value:",typeof indexvalue)
        if(indexvalue == 0){
            console.log('Error due to 0 value')
            res.status(401).send('router must not equal to 0 in value')
        }else if(indexvalue > 50000){
            console.log('Error due to exceeding value')
            res.status(401).send('route must have value within 50000 in last')    
        }else{
            next();     
        }
}
router.get('/file1/:index',validation, util.fileSend)
// Route which return the another file with 25000 limit
router.get('/file2/:index',validation,util.fileSendother)

module.exports=  router;