const express = require('express');
const path = require('path');
const router = require('express').Router();
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const keys = require('../config/keys');


var url = process.env.CONNECTION_STRING || 'mongodb://127.0.0.1:27017/gourav';

mongoose.connect(url , options );
var db = mongoose.connection;
const privatemeeting = db.collection("private");

var dir = path.join( __dirname , '../' , 'public')
router.use( express.static( dir ) );

router.get( '/' , function(req ,res){
    res.render('home');
})

router.get( '/contact' , function(req ,res ){
    res.render('contact');
})

router.get( '/career' , function(req ,res ){
    res.render('career');
})

router.get('/sign' , function(req , res){
    res.render('sign');
})

router.get('/menu' , function( req ,res){
    res.render('menu');
})

router.get('/gift',function( req , res){
    res.render('gift');
})


router.get('/admin' , function(req , res ){
    res.render('admin');
})

router.get('/private' , function(req , res){
   privatemeeting.find().toArray()
   .then(data=>{

       res.render('private' , {
           data:data
       })

   })
})

router.get('/order' , function(req , res){
    var display_order;
    var display_list;
    var display_menu;


    res.render('order' , {
     order:req.body.final,
     stripePublishableKey:keys.stripePublishableKey,
     display_order:"none",
     display_list:"none",
     display_menu:"block"
    })

})

router.get('/bill' , function(req , res){
  res.render('bill');
})

router.get('/book' , function(req , res){
    res.render('book');
})

router.get('/location' , function(req , res){
    res.render('location');
})

router.get('/about' , function(req , res){
    res.render('about');
})

module.exports = router;
