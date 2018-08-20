var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
  // // send to google to do the authentication profile gets us their basic information including their name
  // app.get('/auth/google', passport.authenticate('google', { scope : ['profile'] }));
  // // the callback after google has authenticated the user
  // app.get('/auth/google/callback',
  // passport.authenticate('google', {
  //         successRedirect : '/profile',
  //         failureRedirect : '/'
  // }));


  app.get('/login', function (req, res) {
    res.render('login');
  });


  app.get('/signup', function (req, res) {
    res.render('signup');
  });
  
  // // Loads personal view after login
  // app.get('/personal', isLoggedIn, function(req, res) {
  //   res.render('personalview')
  // });
  // Confirms logged in to proceed to next page
  // function LoggedIn(req, res, next) {
  //   if (req.isAuthenticated())
  //   return next();
  //   res.redirect('/');
  // }

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });


  //need main page "/" route to display homepage
  app.get('/', function (req, res) {
    res.render('home');
  });

  //need a route for create/navigate wishlist page
  app.get('/wishlists', function (req, res) {
    res.render('wishlists');
  });

  //need a route for the wishlist. probably looks like "/wishlists/:id"
  app.get('/wishlists/:id', function (req, res) {
    db.wishlists.findAll({where:{id:req.params.id}}).then(function(result){
        let wishlist=result;
        db.items.findAll({where:{wishlistID:wishlist.id}}).then(function(result){
          let items = result;
          db.comments.findAll({where:{wishlistID:wishlist.id}}).then(function(result){
            let comments = result;

            let obj = {
            wishlist:wishlist,
            comments:comments,
            items:items
          }
            res.render('wishlist',obj)
          })
        })
    })
    
    
  });
};
