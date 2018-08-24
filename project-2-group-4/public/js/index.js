var API = {
  get: {
    wishlists: {
      all: function () {
        return new Promise(resolve => {
          $.get("/api/wishlists").then(function (result) { resolve(result) })
        })
      },
      byCreatorID: function (id) {
        return new Promise(resolve => {
          $.get("/api/wishlists/" + id).then(function (result) { resolve(result) })
        })
      },
      byCreatorName: function(name){
        return new Promise(resolve=> {
          $.get("/api/user/"+name).then(function(result){
            if(result.error==true){alert("no user by that name")}else{

            
            id = result.id;
            console.log(id)
            $.get("/api/wishlists/byCreator/"+id).then(function(result){resolve(result)})
            }
          })
        })
      },
      byName: function (name) {
        return new Promise(resolve => {
          $.get("/api/wishlists/" + name).then(function (result) {
            resolve(result);
          })
        })
      },
      byWishlistID: function(id){
        return new Promise(resolve=> {
          $.get("/api/wishlists/id/"+id).then(function (result){
            resolve(result);
          })
        })
      }
    },
    items: {
      byWishlistID: function (id) {
        return new Promise(resolve => {
          $.get("/api/items/" + id).then(function (result) {
            resolve(result);
          })
        })
      }
    },
    comments: {
      byWishlistID: function (id) {
        return new Promise(resolve => {
          $.get("/api/comments/" + id).then(function (result) { resolve(result) })
        })
      }
    },
    user: {
      byEmail: function(email){
        return new Promise(resolve => {
          $.get("/api/userbyeamil/"+email).then(function(result){
            resolve(result);
          })
        })
      }
    }

  },
  create: {
    wishlist: function (name, creatorId,private) {
      let obj = { _name: name, creatorID: creatorId, private:private }
      return new Promise(resolve => {
        $.post("/api/wishlists", obj).then(function (result) { resolve(result) })
      })

    },
    item: function (name, wishlistId) {
      let obj = { _name: name, wishlistID: wishlistId, checked: false }
      return new Promise(resolve => {
        $.post("/api/items", obj).then(function (result) { resolve(result) })
      })

    },
    user: function (name, email) {
    console.log('hi');
      return new Promise(resolve => {
        let obj = { uname: name, email: email }
        $.post("/api/users", obj).then(function (result) { resolve(result) })
      })
    },
    comment: function (message, poster, wishlistId) {
      let obj = { msg: message, poster: poster, wishlistID: wishlistId }
      $.post("/api/comments", obj).then(function (result) {
        resolve(result);
      })
    }
  },
  update: {
    check: function (checked, id, checked_by) {
      return new Promise(resolve => {
        obj = { id: id, checked: checked, checked_by: checked_by }
        console.log(obj)
        $.ajax({ url: "/api/items", type: "PUT", data: obj, dataType: 'json' })
          .then(function (result) { resolve(result); })
      })


    }
  },
  delete: {
    item: function (id) {
      return new Promise(resolve => {
        $.delete("/api/items/" + id).then(function (result) { resolve(result) })
      })

    }
  }
}

// click events and logic for wishlist page

$(".check").on("click", function (event) {
  id = $(this).attr('data-id');
  console.log(id)
  checked = $(this).attr('data-checked');
  console.log(checked)
  if (checked == false) {
    API.update.check(checked, id, "feature coming soon").then(function (result) { console.log(result); location.reload() });
  }
  if(checked){API.update.check(checked,id,"nobody").then(function(result){console.log(result);location.reload();})}
  
});
console.log("loaded")

$("#submitItem").on("click", function (event) {
  let name = $("#input-item").val();
  url = window.location.href;
  url = url.split('/');
  id = url.pop();
  API.create.item(name, id).then(function (result) {
    location.reload();
  });
});



//search page

$("#searchbycreator").on("click",function(event){
  event.preventDefault();
  let creatorname = $("#member").val();
  API.get.wishlists.byCreatorName(creatorname).then(function(result){
    console.log(result)
    $("#wishlists").empty();
    result.forEach(element => {
      $("#wishlists").append("<button class='wishlistButton' data-id='"+element.id+"'>"+element._name+"</button> ");

    });
    $(".wishlistButton").on("click",function(event){
      let id=$(this).attr("data-id");
      window.location.href = "/wishlist/"+id
    })
  })
})
