var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index"/*, {
        msg: "Welcome!",
        examples: dbExamples
      }*/);
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
 
  //need a route for the wishlist. probably looks like "/wishlists/:id"
  app.get("/wishlist/:id", function (req, res) {
    db.wishlists.findAll({where:{id:req.params.id}}).then(function(result){
        var wishlist=result;

        db.items.findAll({where:{wishlistID:wishlist[0].dataValues.id}}).then(function(result){
          var items = result;
          db.comments.findAll({where:{wishlistID:wishlist[0].dataValues.id}}).then(function(result){
            var comments = result;
            
            let allItems = new Array()
            items.forEach(element => {
              allItems.push(element.dataValues);
            });
            let allComments = new Array()
            comments.forEach(element => {
              allComments.push(element.dataValues);
            });
            console.log(allComments)
            
            var obj = {
            wishlist:wishlist[0].dataValues,
            comments:allComments,
            items:allItems
          }
            res.render('wishlist',obj);
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