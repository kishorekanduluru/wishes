

// router.get('/', (req, res) => {
//
//
// });



/* GET home page. */
// router.get('/', function(req, res, next) {
//   // console.log("testing");
//   //
//    db.one('SELECT count(*) FROM users')
//    .then(user => {
//        console.log("kishore");
//        console.log(user); // print user name;
//    })
//    .catch(error => {
//        console.log(error); // print the error;
//    });
// res.render('index', { title: 'Wishes' });
// });


// router.get('/display', function(req, res, next) {
//
//   db.one('SELECT count(*) FROM users')
//   .then(user => {
//       res.render('error.hbs');
//       // console.log(user); // print user name;
//   })
//   .catch(error => {
//       console.log(error); // print the error;
//   });
// });


router.post('/upload', function(req, res, next) {
    console.log(req.body);
    console.log(req.);
    // console.log(req.body);
    res.render('index', { title: 'Wishes' });
});


module.exports = router;
