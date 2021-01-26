const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const ejs = require('ejs');
const request = require('request');
const crypto = require('crypto');
const methodoverride = require('method-override');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const keys = require('./config/keys');
const recaptchakeys = require('./config/recaptcha');
const stripe = require('stripe')(keys.stripeSecretKey);

const app = express();

// mongoose connection
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};


var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/gourav';
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gourav';

mongoose.connect(url , options );

var db = mongoose.connection;
const user = db.collection("user");
const worker = db.collection("worker");
const mistakes = db.collection("mistakes");
const orders = db.collection("orders");
const privatemeeting = db.collection("private");
const online = db.collection("online_orders");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection Successful!");
});

//init gfs
let gfs;
// gfs is ised to store the file of more then size of 16 mb

db.once('open' , ()=>{
    gfs = grid(db.db , mongoose.mongo );
    gfs.collection('upload');
})



//create storage engine
const storage = new GridFsStorage({
  url:mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'upload'
        //bucketname shouldmatch collection name
        };
        resolve(fileInfo);
      });
    });
  }
});


const upload = multer({storage:storage});


//body-parser
// bodyparser.json() is used to convert the content of upcoming request data in json content data
app.use( bodyParser.json() );
// bpdyparser.urlencoded is used to convert the url as when we submit forms then spaces is conerted to + and all special characters are converted to ASCII HEX values so to convert it into readable line we have to use this
app.use(bodyParser.urlencoded({extended:false}));
// this all depend on enctype as when we set enctype in form in html
// as if enctype is text/plain spaces are convertd to + but no special characters are encoded
// as if enctype is multipart/form-data no characters are encodede . this value is required when we are using forms tht have a file to upload
// as if enctype is application/x-www-form-urlencoded then all charcaters are encoded before sent (  spacesare converted to + and all specials symbols are converted to there ASCII-HEX value)





//setup view engine
app.use(expressLayouts);
app.set("view layout" , "ejs" );
app.set( 'view engine' , 'ejs' );




// static folder
var dir = path.join( __dirname , '../' , 'public')
app.use( express.static( dir ) );

app.get('/admin' , function( req , res ){
    res.render('home');
})



// starting of app from home page
app.use( '/' , require('./router/index.js'));
// post

// get /files:/filename
app.get('/files/:filename' , (req , res)=>{
 gfs.files.findOne({filename:req.params.filename} , (err , file)=>{

     if( !file || file.length==0 ){
         return res.status(404).json({
             err:'No file exist '
         })
     }

     //file exist
     const readstream = gfs.createReadStream({filename:file.filename});
     readstream.pipe(res);

 } )
 })

// output the actual image
// get /imgae:/filename
app.get('/image/:filename' , (req , res)=>{

 gfs.files.findOne({filename:req.params.filename} , (err , file) =>{
     if( !file || file.length==0 ){
         return res.status(404).json({
             err:'No file exist'
         })
     }

     //file is an image
     if( file.contentType==='image/jpeg' || file.contentType ==='image/png' ){
         const readstream = gfs.createReadStream({filename:file.filename});
         readstream.pipe(res);
     }else{
         res.status(404).json({
             err:"fie is not an image"
         })
     }

 })
 })

/*
// this file is same as name attr in input tag
app.post('/upload' , upload.single('file') ,  (req ,res)=>{
    console.log(req.file);
    res.send(req.file);
    conn.collection('uploads').insertOne( req.file , (err , result)=>{
        if( err){
            console.log(err);
        }
    })
});
*/

app.post('/career' , upload.array("inputFile" , 2) ,   function(req ,res){
 var error;
 var success;


    if( req.files.length < 2 ){

        error = "You doesnot select file or photo";
        success = false;
        res.render('career' , {
            error:error ,
            success:success
        })
    }

    if( req.body.name=='' || req.body.email=='' || req.body.address=='' || req.body.city=='' || req.body.state=='' || req.body.code=='' || req.body.country=='' || req.body.contact=='' ){
        error = "PLease fill all the Fields";
        success = false;
        console.log( error );
        console.log( success );
        res.render('career' , {
            error,
            success
        })
    }

   else{
     var employ = {
         email1:req.body.email,
         address1:req.body.address,
         city1:req.body.city,
         state1:req.body.state,
         code1:req.body.code,
         country1:req.body.country,
         contact1:req.body.contact,
         inputFile1:req.files[0].filename,
         photo1:req.files[1].filename
     }



    worker.insertOne(employ , (err , docs )=>{
          if( err ){
          error="Unable to Insert";
          success = false;
          res.render('career' , {
              error:error,
              success:success
          })
         }
        else{
            console.log("successfully registerd");
        }
     })


    success = "Further Notification is given via email";

    res.render('career' , {
        success:success,
        error:error
    })


   }

 });

app.post('/sign' ,   function  (req , res ){

    if(
      req.body.recaptcha=='undefined'||
      req.body.recaptcha==''||
      req.body.recaptcha==null
    ){
      return res.json({"success":false , "msg":"PLease click on the captcha "});
    }

    //secret key
    const secretkey = recaptchakeys.serverkey;


    //verify url
    const verifyurl = `https://google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${req.body.recaptcha}&remoteip=${req.connection.remoteAddress}`;


    //MAKE REQUEST TO VERIFY URL
    request(verifyurl , (err , response , body ) =>{
     body = JSON.parse(body);

     //if not successfull
     if( body.success !==undefined && !body.success){
       return res.json({"success":false , "msg":"Failed captcha"});
     }




     if( req.body.name=='' || req.body.contact==''|| req.body.email=='' ){
       return res.json({"success":false , "msg":"PLease fill the all fields"});
     }




       var newUser = {
            name:req.body.name,
            email:req.body.email,
            contact:req.body.confirm
        }





     user.insertOne( newUser , (err , docs)=>{
         if( err ){
             console.log("unable to insert");
             res.json({"success":false ,"msg":"unable to insert"});
         }
     })



    return res.json({"success":true , "msg":"Succesfully Submitted"});


})

})

app.post('/call',   function  (req , res ){

    if(
      req.body.recaptcha=='undefined'||
      req.body.recaptcha==''||
      req.body.recaptcha==null
    ){
      return res.json({"success":false , "msg":"PLease click on the captcha "});
    }

    //secret key
    const secretkey = recaptchakeys.serverkey;


    //verify url
    const verifyurl = `https://google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${req.body.recaptcha}&remoteip=${req.connection.remoteAddress}`;


    //MAKE REQUEST TO VERIFY URL
    request(verifyurl , (err , response , body ) =>{
     body = JSON.parse(body);

     //if not successfull
     if( body.success !==undefined && !body.success){
       return res.json({"success":false , "msg":"Failed captcha"});
     }


     // if success


     if( req.body.name=='' || req.body.email=='' || req.body.complain=='' ){
       return res.json({"success":false , "msg":"PLease fill the all fields"});
     }




     var fault = {
            name:req.body.name,
            email:req.body.email,
            complain:req.body.complain
      }


    mistakes.insertOne( fault , (err , docs)=>{
        if( err ){
          return res.json({"success":false , "msg":"Unable to insert"});
        }
    })





    return res.json({"success":true , "msg":"Succesfully Submitted"});


})

})

app.post( '/card' , function(req ,res){
 if(
      req.body.recaptcha=='undefined'||
      req.body.recaptcha==''||
      req.body.recaptcha==null
    ){
      return res.json({"success":false , "msg":"PLease click on the captcha"});
    }

    //secret key
    const secretkey = recaptchakeys.serverkey;


    //verify url
    const verifyurl = `https://google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${req.body.recaptcha}&remoteip=${req.connection.remoteAddress}`;


    //MAKE REQUEST TO VERIFY URL
    request(verifyurl , (err , response , body ) =>{
     body = JSON.parse(body);

     //if not successfull
     if( body.success !==undefined && !body.success){
       return res.json({"success":false , "msg":"Failed captcha"});
     }


     // if success

     var good = {
         cost:req.body.cost,
         email:req.body.email,
         from:req.body.from,
         msg:req.body.msg,
         to:req.body.to,
         num:req.body.num,
         parcel:req.body.parcel,
         cal:req.body.cal,
         time:req.body.time
     }

     console.log(good);

     orders.insertOne( good , (err , docs)=>{
         if( err ){
             return res.json({"success":false , "msg":"unable to insert"});
         }
        return res.json({"success":true , "msg":"Successfully Submitted" });

     })


    })



})

app.post('/meeting' , (req , res)=>{
   if(
      req.body.recaptcha=='undefined'||
      req.body.recaptcha==''||
      req.body.recaptcha==null
    ){
      return res.json({"success":false , "msg":"PLease click on the captcha"});
    }

    //secret key
    const secretkey = recaptchakeys.serverkey;


    //verify url
    const verifyurl = `https://google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${req.body.recaptcha}&remoteip=${req.connection.remoteAddress}`;


    //MAKE REQUEST TO VERIFY URL
    request(verifyurl , (err , response , body ) =>{
     body = JSON.parse(body);

     //if not successfull
     if( body.success !==undefined && !body.success){
       return res.json({"success":false , "msg":"Failed captcha"});
     }

     if( req.body.name == '' || req.body.email == '' || req.body.contact == '' || req.body.date == '' || req.body.guest == '' || req.body.theme == '' || req.body.stime == '' || req.body.etime == '' ){
      return res.json({"success":false , "msg":"Please fill al fields"});
     }



     const guest = {
         name:req.body.name,
         email:req.body.email,
         contact:req.body.contact,
         date:req.body.date,
         stime:req.body.stime,
         etime:req.body.etime,
         theme:req.body.theme,
         guest:req.body.guest,
     }

     privatemeeting.insertOne( guest , (err , docs)=>{
         if(err){
             console.log(err);
         }

         return res.json({"success":true , "msg":"Successfully Submitted"})
     })

    })

})

app.post('/order' , (req , res)=>{

     if( req.body.name == ''  || req.body.contact == '' || req.body.city == ''
       || req.body.state == ''  || req.body.code == '' || req.body.country == ''
        || req.body.line1 == ''){
      var err = "Please fill all fields";
      var done;
      var order;

    var display_order;
    var display_list;
    var display_menu;


      res.render('order' , {
        err:err,
        done,
        stripePublishableKey:keys.stripePublishableKey,
        order:req.body.amount,
        display_order:"block",
        display_list:"none",
        display_menu:"none"
      })
     }
     const customer = {
         name:req.body.name,
         contact:req.body.contact,
         line1:req.body.line1,
         country:req.body.country,
         state:req.body.state,
         city:req.body.city,
         code:req.body.code,
         amount:req.body.amount
     }


    stripe.customers.create({
        email:req.body.stripeEmail,
        source: req.body.stripeToken,
        name:req.body.name
    })
    .then( customer=> stripe.charges.create({
       amount:req.body.amount,
       description:'web deveopment',
       currency:'usd',
       customer:customer.id,
       shipping:{
       name:customer.name,
       address:{
       line1:req.body.line1,
       postal_code:req.body.code,
       city:req.body.city,
       state:req.body.state ,
       country:req.body.country
       }
     }
    }))
    .then(charge =>{
       online.insertOne( customer , (err , docs)=>{
         if(err){
           console.log(err);
         }
         var done=true;
    var display_order;
    var display_list;
    var display_menu;

         res.render('order' , {
          done:done,
          stripePublishableKey:keys.stripePublishableKey,
          order:req.body.amount,
          display_order:"block",
          display_list:"none",
          display_menu:"none"
         })

        })
     })
    .catch(err=>{
        console.log(err);
    })

})

app.post('/accept' , function(req , res){

    return res.json({"key":keys.stripePublishableKey});


})


const port = process.env.PORT||4000;

app.listen( port , () => {
  console.log(`listener port :${port}`);
})
