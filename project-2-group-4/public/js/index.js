// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
var API = {
  get:{
    wishlists:{all: function(cb){
    return new Promise(resolve=>{
      $.get("/api/wishlists").then(function(result){resolve(result)})
    })
  },
    byCreatorID: function(id){
      return new Promise(resolve=>{
         $.get("/api/wishlists/"+id).then(function(result){resolve(result)})
      })
    },
    byname: function(name){
      return new Promise(resolve=>{
        $.get("/api/wishlists/"+name).then(function(result){
          resolve(result);
        })
      })
    }
  },
    items:{
      byWishlistId: function(id){
        return new Promise(resolve=>{
          $.get("/api/items/"+id).then(function(result){
            resolve(result);
          })
        })
      }
    },
    comments:{
      byWishlistId: function(id){
        return new Promise(resolve=>{
          $.get("/api/comments/"+id).then(function(result){resolve(result)})
        })
      }
    }

},
  create:{
    wishlist: function(name,creatorId){
      let obj = {_name:name,creatorID:creatorId}
      return new Promise(resolve=>{
        $.post("/api/wishlists",obj).then(function(result){resolve(result)})
      })
      
    },
    item: function(name,wishlistId){
      let obj = {_name:name,wishlistID:wishlistId,checked:false}
      return new Promise(resolve=>{
        $.post("/api/items",obj).then(function(result){resolve(result)})
      })
      
    },
    user: function(name,password){
      let obj = {_name:name,pw:password}
      return new Promise(resolve=>{
        let obj = {uname:name,pw:password}
        $.post("/api/users",obj).then(function(result){resolve(result)})
      })
    },
    comments: function(message,poster,wishlistId){
      let obj = {msg:message,poster:poster,wishlistID:wishlistId}
      $.post("/api/comments",obj).then(function(result){
        resolve(result);
      })
    }
  },
  update:{
    check: function(checked,id,checked_by){
      return new Promise(resolve=>{
        $.update("/api/items",{id:id,checked:checked,checked_by:checked_by})
        .then(function(result){resolve(result);})
      })
      

    }
  },
  delete:{
    item:function(id)
    { 
      return new Promise(resolve=>{
         $.delete("/api/items/"+id).then(function(result){resolve(result)})
      })
     
    }
  }
}









// need sign in button to redirect to sign in page.
// need sign up button to redirect to correct page

