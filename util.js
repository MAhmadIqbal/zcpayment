

//file send just locally with checking value of index of route
exports.fileSend= (req,res)=>{  
    const indexvalue= parseInt(req.params.index)
    if(indexvalue==0){
        res.status(401).send('Route value must not be equal to 0')
    }
    console.log(indexvalue===isNaN())
    if(indexvalue===isNaN()){
        res.status(500).send(`index is not a number in url last`)
        
        
    }else{
        if(indexvalue<=50000){
            res.sendFile(__dirname+"/route/book.json",(err,data)=>{
                if(err){console.log(err)}
                console.log('Sent','book.json')
            })
        }else{
            res.status(500).send('Route exceeds the value of 50000')
        }    
    }  
}
//Another books send if route file is in 25000
exports.fileSendother= (req,res)=>{  
    const indexvalue2= parseInt(req.params.index)
    if(indexvalue2==0){
        res.status(401).send('Route value must not be equal to 0')
        return 0;
    }
    console.log(indexvalue2===isNaN())
    if(indexvalue2===isNaN()){
        res.status(500).send('index is not a number of url last')
    }else{
        if(indexvalue2<=50000){
            res.sendFile(__dirname+"/route/book2.json",(err,data)=>{
                if(err){console.log(err)}
                console.log('Sent','book2.json')
            })
        }else{
            res.status(500).send('Route exceeds the value of 50000')
        }    
    }      
}