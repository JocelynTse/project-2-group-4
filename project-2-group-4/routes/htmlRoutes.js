var db = require("../models");

module.exports = function (app, passport) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index"
        /*, {
                msg: "Welcome!",
                examples: dbExamples
              }*/
      );
    });
  });

  app.get('/login', function (req, res) {
    res.render('login');
  });


  app.get('/new_account', function (req, res) {
    res.render('new_account');
  });

  // ----------------- PASSPORT-------------------
  // Loads personal view after login
  // app.get('/personal', isLoggedIn, function(req, res) {
  app.get('/personal', function (req, res) {
    res.render('personal')
  });
  // Confirms logged in to proceed to next page
  // function LoggedIn(req, res, next) {
  //   if (req.isAuthenticated())
  //   return next();
  //   res.redirect('/');
  // }
  // process the signup form
  app.post('/new_account', function(req, res, next) {

    console.log("New Account Route");
    passport.authenticate('local-signup', {
      successRedirect: '/personal', // redirect to the secure profile section       ***EDIT***
      //failureRedirect: '/', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    }, function(err, user, info){
      console.log(err);
      console.log(user);
      console.log(info);
    })(req, res, next);
  });
  




  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/personal', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));
  // ----------------------------------------

  //why  the fuck doesn't this work??????????????????????????????????????
  //why  will this not route??? not even a hello on the server??????????
  //need a route for the wishlist. probably looks like "/wishlists/:id"
  app.get("/wishlist/:id", function (req, res) {
    console.log("hello fromm server")
    db.wishlists.findAll({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      let wishlist = result;
      db.items.findAll({
        where: {
          wishlistID: wishlist.id
        }
      }).then(function (result) {
        let items = result;
        db.comments.findAll({
          where: {
            wishlistID: wishlist.id
          }
        }).then(function (result) {
          let comments = result;

          let obj = {
            wishlist: wishlist,
            comments: comments,
            items: items
          }
          res.render('wishlist', obj);
        })
      })
    })


  });
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });


  //need main page "/" route to display homepage
  // app.get('/', function (req, res) {
  //   res.render('home');//why is this called home and not index?
  // });

  //need a route for create/navigate wishlist page
  // app.get('/wishlists', function (req, res) {
  //   res.render('wishlists');
  // });



};