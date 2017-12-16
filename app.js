var express = require('express');
var app = express();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var util = require('util');
var busboy = require("then-busboy");
var formidable = require("formidable");
var fileUpload = require('express-fileupload');
var shortid = require('shortid');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

var Promise = require('bluebird');
var GoogleCloudStorage = Promise.promisifyAll(require('@google-cloud/storage'));
var Jimp = require("jimp");



var pgp = require('pg-promise')(/*options*/);
var cn = {
  host: '35.184.60.166', // server name or IP address;
  port: 5432,
  database: 'wishes',
  user: 'postgres',
  password: "123"
};
var db = pgp(cn);

var path = require('path'),
    fs = require('fs');
var UUID = require('uuid-js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var default_link = 'https://storage.cloud.google.com/staging.wishesonline-188118.appspot.com/'+encodeURI(image.img);
app.get('/', function (req, res) {
  var name = req.query.name;
  var language = req.query.language || 'english';
  var params= {};
  var query = 'SELECT * FROM images WHERE language= ${language}';
  params.language = language;

  if(language){
    db.any(query, params)
    .then(images => {
      images.forEach( function (image)
      {
        image.link = 'https://storage.cloud.google.com/staging.wishesonline-188118.appspot.com/'+encodeURI(image.img);
        image.src = '/?language='+params.language+'&name='+image.image_name;
      });
      image = images.filter(image => image.image_name === name);
      if(image.length>0){
        link = image[0].link;
        res.render('home', {image: 'image[0].link', items: images});
      }
    })
    .catch(error => {
        res.render('home', {image: default_link,items: []});
    });
  }
  else{
    res.render('home', {image: default_link,items: []});
  }
});



// var storage = GoogleCloudStorage({
//   projectId: 'wishesonline-188118',
//   keyFilename: 'keyfile.json'
// });
//
// var BUCKET_NAME = 'wishes_images';
// // https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/bucket
// var myBucket = storage.bucket(BUCKET_NAME);
//
//
// app.post('/upload', function (req, res) {
//   if (!req.files){
//     return res.status(400).send('No files were uploaded.');
//   }
//   var params= {}
//   var username = req.body.username;
//   var file = req.files.profile_pic;
//   var img_name = file.name;
//   file.name = shortid.generate().concat(file.name);
//   var path = 'public/images/upload_images/'+file.name;
//   if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
//     file.mv(path, function(err) {
//       if (err){
//         return res.status(500).send(err);
//       }
//       else{
//         // db.none('INSERT INTO users(id, username, profile_pic) VALUES(${id}, ${username}, ${img_name})', {id: "41088b62-b413-45d7-83d8-61dd2aebf1a4", username: username, img_name: img_name});
//       }
//     });
//   }
//
//   Jimp.read(path).then(function (image) {
//     image.resize(400, 400)            // resize
//          .quality(100)                 // set JPEG quality
//          .write(path);
//          let localFileLocation = path;
//          var link = "https://storage.cloud.google.com/wishes_images/"+file.name;
//          myBucket.uploadAsync(localFileLocation, { public: true })
//            .then(file => {
//              db.none('INSERT INTO users(username, profile_link) VALUES(${username}, ${img_name})', {username: username, img_name: link});
//              console.log(link);
//              db.one('SELECT * FROM users WHERE users.profile_link = $1;', link)
//              .then(data => {
//                console.log(data);
//                // var link= "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?url="+encodeURI(user.profile_link)+"&container=focus&resize_w=350";
//                res.render('profile', {image: data.profile_link});
//              })
//              .catch(error => {
//                  console.log(error); // print the error;
//              });
//            });
//   }).catch(function (err) {
//     // handle an exception
//   });
//
//   // var link = "https://storage.cloud.google.com/wishes_images/"+file.name;
//   // myBucket.uploadAsync(localFileLocation, { public: true })
//   //   .then(file => {
//   //     db.none('INSERT INTO users(username, profile_link) VALUES(${username}, ${img_name})', {username: username, img_name: link});
//   //   });
//
// });


// app.get('/', function(req, res, next) {
//   res.render('profile', {image: "drinkjpg", wishes: "testin"});
//   // var id = req.params.id;
//   // db.one('SELECT * FROM users WHERE id= $1', id)
//   // .then(user => {
//   //   // var link= "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?url="+encodeURI(user.profile_link)+"&container=focus&resize_w=350";
//   //   res.render('profile', {image: "drinkjpg", wishes: "testin"});
//   // })
//   // .catch(error => {
//   //     console.log(error); // print the error;
//   // });
// });

module.exports = app;
