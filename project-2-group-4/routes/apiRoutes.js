var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
 //=================our code starts here==================================================================================================================
  //get route to grab all the wishlist names
  app.get("/api/wishlists",function(req,res){
    db.wishlists.findAll({}).then(function(result){
      res.json(result);
    });
  });
  //get route to grab all the items for a particular wishlist
  app.get("/api/items/:id",function(req,res){
    let id = req.params.id;
    db.items.findAll({
      where:{ wishlistID: id }
    }).then(function(result){
      res.json(result);
    });
  });
  //get route to grab all the comments for a particular wishlist
  app.get("/api/comments/:id",function(req,res){
    let id = req.params.id;
    db.comments.findAll({
      where:{wishlistID:id}
    }).then(function(result){
      res.json(result);
    });
  });
  //get route to grab all the wishlists created by a particular user
  app.get("/api/wishlists/:creatorID",function(req,res){
    let id = req.params.creatorID;
    db.wishlists.findAll({
      where:{creatorID:id}
    }).then(function(result){
      res.json(result);
    });
  });
  //we need to find a way to make the subscriptions work...

  //post route to create a new wishlist

  app.post("/api/wishlists", function(req, res) {
    db.wishlists.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  //post route to create a new item and assign it to a wishlist
  app.post("/api/items", function(req, res) {
    db.items.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  //post route to create a new comment and assign it to a wishlist
  app.post("/api/comments", function(req, res) {
    // console.log(req.body)
    db.comments.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  //post route to create a new user
  app.post("/api/users", function(req, res) {
    console.log(req.body)
    db.users.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  //put route that will change the checked value from true to false or false to true

  //optional(not mvp): put route to change a users password

  //delete route to delete an item from a wishlist
  app.delete("/api/items/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(db) {
      res.json(db);
    });
  });
};
