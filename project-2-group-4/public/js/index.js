
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
      byName: function (name) {
        return new Promise(resolve => {
          $.get("/api/wishlists/" + name).then(function (result) {
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
    }

  },
  create: {
    wishlist: function (name, creatorId) {
      let obj = { _name: name, creatorID: creatorId }
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
    user: function (name, password) {
      let obj = { _name: name, pw: password }
      return new Promise(resolve => {
        let obj = { uname: name, pw: password }
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
        $.update("/api/items", { id: id, checked: checked, checked_by: checked_by })
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






