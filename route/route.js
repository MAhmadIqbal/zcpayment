
const express = require('express')
const router = express.Router()
const soapRequest = require('easy-soap-request');
const fs = require('fs');    
const xmlparser = require('express-xml-bodyparser');
const axios = require('axios');
var o2x = require('object-to-xml');
 router.use(xmlparser());
    //-------Endpoints-Starts-------------------------
// just have req.body and get request will give response back with file to client

router.post('/request',async (req,res) => {
  // example data
  try{
  const url = req.query.url
  const bodyxml = o2x(req.body)
  // const url = 'https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php';
  console.log('Its url=> ',url);
  console.log('Its XML-body => ',bodyxml);
  // const xml = fs.readFileSync('test/zipCodeEnvelope.xml', 'utf-8');
  const sampleHeaders = {
    'Content-Type': 'text/xml;charset=UTF-8',
  };
  // usage of module
  const { response } =await soapRequest({ url: url, headers: sampleHeaders, xml: bodyxml, timeout: 10000 })
  console.log(response);
        res.status(200).json({message:'Successfull', 'data':response})
}catch(error){
  console.log("catch Error: ",error);
    res.status(500).send({message:'Server Error in sending Request!',error});
  }; // Optional timeout parameter(milliseconds)
})
router.post('/hit',async (req,res)=>{
  console.log('In hit req');
  const xmls = o2x(req.body)
  console.log(xmls);
  await axios.post('http://www.webservicex.com/CurrencyConvertor.asmx?wsdl',
           xmls,
           {headers:
             {'Content-Type': 'text/xml'}
           }).then(res=>{
             console.log(res);
           }).catch(err=>{console.log(err)})
})
router.get('/', (req,res) => {
  console.log('Its changed now');
  res.status('200').send('------HELLO ITS ZC-PAYMENT-GATEWAY------')
})

module.exports=  router;