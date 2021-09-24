
const path = require('path')
//file send just locally with checking value of index of route
exports.fileSend= (req,res)=>{  
    const indexvalue= parseInt(req.params.index)
        
    if(indexvalue<=50000){
        let bookpath = path.join(__dirname+'/../route/book.json')
        console.log(bookpath)
            res.sendFile(bookpath,(err,data)=>{
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
            let bookpath2 = path.join(__dirname+'/../route/book2.json')
            res.sendFile(bookpath2,(err,data)=>{
                if(err){console.log(err)}
                console.log('Sent','book2.json')
            })
        }else{
            res.status(500).send('not accepted string value in last')
        }    
          
}