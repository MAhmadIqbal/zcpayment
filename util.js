

//file send just locally with checking value of index of route
exports.fileSend= (req,res)=>{  
    const indexvalue= parseInt(req.params.index)
        
    if(indexvalue<=50000){
            res.sendFile(__dirname+"/route/book.json",(err,data)=>{
                if(err){console.log(err)}
                console.log('Sent','book.json')
            })
        }else{
            res.status(500).send('Route have string value in last')
        }      
}
//Another books send if route file is in 25000
exports.fileSendother= (req,res)=>{  
    const indexvalue2= parseInt(req.params.index)
        
    if(indexvalue2<=50000){
            res.sendFile(__dirname+"/route/book2.json",(err,data)=>{
                if(err){console.log(err)}
                console.log('Sent','book2.json')
            })
        }else{
            res.status(500).send('Route have string value in last')
        }    
          
}