
const express = require('express')
const router = express.Router()
const soapRequest = require('easy-soap-request');
const fs = require('fs');    
const xmlparser = require('express-xml-bodyparser');
const axios = require('axios');
const o2x = require('object-to-xml');
const axioshttps = require('axios-https-proxy-fix');
 router.use(xmlparser());
    //-------Endpoints-Starts-------------------------
// just have req.body and get request will give response back with file to client

router.post('/request',async (req,res) => {
  // example data
  try{
  const url = req.query.url
  const bodyxml = o2x(req.body)
  console.log('Its url=> ',url);
  console.log('-------------------------------------------------------------------------------------');
  console.log('Its XML-body => ',bodyxml);
  // const xml = fs.readFileSync('test/zipCodeEnvelope.xml', 'utf-8');
  const sampleHeaders = {
    'Content-Type': 'text/xml;charset=UTF-8',
  };
  // usage of module
  const { response } =await soapRequest({ url: url, headers: sampleHeaders, xml: bodyxml, timeout: 100000 }).then(result =>{
    console.log("its then block",result);
    return result;
  }).catch(err=>console.log("Its error block",err));
  const { headers, body, statusCode } = await response;
  console.log('--------------------------------HEADERS-----------------------------');
  console.log(headers);
  console.log('--------------------------------BODY--------------------------------');
  console.log(body);
  console.log('--------------------------------STATUSCODE-----------------------------');
  console.log(statusCode);
        res.status(200).json({message:'Successfully send request with data below', 'headers':headers,"body":body,"statusCode":statusCode})
}catch(error){
  console.log("catch Error: ",error);
    res.status(500).send({message:'Server Error in sending Request!',error});
  }; // Optional timeout parameter(milliseconds)
})



          // -------------------------------HIT WITH AXIOS------------------------------ //
router.post('/hit',async (req,res)=>{
  console.log('In hit req');
  const url = req.query.url
  console.log("Its URL: >>"+url);
  const xmls = o2x(req.body)
  var xmlbody = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:zcp="http://zcstgpublic.jo.zain.com:5001/ZCPublicVPNAPI.svc" xmlns:ent="http://schemas.datacontract.org/2004/07/Entities" xmlns:ent1="http://schemas.datacontract.org/2004/07/Entities.Common" xmlns:ent2="http://schemas.datacontract.org/2004/07/Entities.Auth">\
  <soapenv:Header/>\
  <soapenv:Body>\
      <zcp:ZCInitiateMerchDebitPayByMerch>\
          <!--Optional:-->\
          <zcp:req>\
              <ent:Amount>25</ent:Amount>\
              <ent:MSISDN962>96798257523</ent:MSISDN962>\
          </zcp:req>\
          <!--Optional:-->\
          <zcp:generalData>\
              <!--type: LanguageID - enumeration: [English,Arabic]-->\
              <ent1:LanguageID>English</ent1:LanguageID>\
              <!--type: string-->\
              <ent1:TerminalShopID>1</ent1:TerminalShopID>\
              <!--type: string-->\
              <ent1:TerminalUserID>1</ent1:TerminalUserID>\
          </zcp:generalData>\
          <!--Optional:-->\
          <zcp:AuthData>\
              <!--type: string-->\
              <ent2:Password>ZC@T$F!S@B21</ent2:Password>\
              <!--type: SharedInfo.API_IDS - enumeration: [ZCRegisterWallet,ZCAgentCashIn,ZCAgentInitiateCashOut,ZCAgentCashOut,ZCBusinessToPersonSalary,ZCBusinessToPersonLoan,ZCCorporateBalanceInquiry,ZCGetCorporateTransactions,ZCGetNationalities,ZCGetCities,ZCGetIDType,ZCIsMSISDNAssociatedToNID,ZCInitiateMerchDebitPayByMerch,ZCMerchDebitTrigerPayment,ZCGetCorporateSOA,ZCGetCorpTrans]-->\
              <ent2:ServiceID>ZCInitiateMerchDebitPayByMerch</ent2:ServiceID>\
              <!--type: string-->\
              <ent2:UserName>80105</ent2:UserName>\
          </zcp:AuthData>\
      </zcp:ZCInitiateMerchDebitPayByMerch>\
  </soapenv:Body>\
</soapenv:Envelope>'
  console.log("Its xmls: >>"+xmls);
  await axios.post(url,
    xmlbody,
           {headers:
             {'Content-Type': 'text/xml'}
           }).then(res=>{
             console.log("-----------------------------------Its Response",res);
             res.status(200).json({message:'Successfull', 'data':res});
            }).catch((err)=>{
              console.log(err)
              res.status(500).send({message:'Server Error in sending Request!',err});
            })
})

router.get('/', (req,res) => {
  console.log('Its changed now');
  res.status('200').send('------HELLO ITS ZC-PAYMENT-GATEWAY------')
})


router.post('/method',async(req,res)=>{
  const URL = req.query.url;
  console.log("its url received from query",URL);
  const xmls = o2x(req.body);
  const requestResponse = new Promise((resolve, reject) => {
    axioshttps({
      method: 'post',
      url:URL,
      headers:{},
      data: xmls,
      timeout:10000,
      proxy:false
    }).then((response) => {
      resolve({
        response: {
          headers: response.headers,
          body: response.data,
          statusCode: response.status,
        },
      });
      console.log("its response ====>>>",response);
    }).catch((error) => {
      if (error.response) {
        console.error(`SOAP FAIL: ${error}`);
        reject(error.response.data);
      } else {
        console.error(`SOAP FAIL: ${error}`);
        reject(error);
      }
    });
  });
})
module.exports=  router;