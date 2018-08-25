// Initialize Firebase
var config = {
    apiKey: "AIzaSyB5Jw-muCyAnXv6b2vFyf_J9bqrZ_XcbVk",
    authDomain: "wishlist-project2.firebaseapp.com",
    databaseURL: "https://wishlist-project2.firebaseio.com",
    projectId: "wishlist-project2",
    storageBucket: "wishlist-project2.appspot.com",
    messagingSenderId: "884526964068"
};

firebase.initializeApp(config);

const auth = firebase.auth();
// firebase.auth().onAuthStateChanged()


$("#submitNewUser").on("click", function (event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();
    // Capture user inputs and store them into variables
    var username = $("#username").val().trim();
    var pass = $("#password").val().trim();
    var email = $("#email").val().trim();
    console.log(username);
    console.log(email);
    console.log(pass);
    // Clear sessionStorage
    sessionStorage.clear();
    // Store all content into sessionStorage
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);

    firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(user){
        console.log(user);
        API.create.user(username,email).then(function(result){console.log(result)})
    }).catch(function (error) {
        console.log(error.message);
    });
})

$("#submitLogIn").on("click", function (event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();
    // Capture user inputs and store them into variables
    var email = $("#emailLogIn").val().trim();
    var password = $("#passwordLogIn").val().trim();
    console.log(email);
    console.log(password);
    // Clear sessionStorage
    sessionStorage.clear();
    // Store all content into sessionStorage
    sessionStorage.setItem("email", email);

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        console.log(error.message);
    })
});
var temp
//Handle Account Status
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        API.get.user.byEmail(user.email).then(function(result){
            console.log(result)
            temp=result;
            localStorage.setItem('id',result.result[0].id);
            localStorage.setItem('uname',result.result[0].uname);
            localStorage.setItem('email',result.result[0].email);
        });
        console.log(firebase.auth().currentUser)
        //window.location = '/new_list'; 
        window.user = user;
    }
});

$("#logOut").on("click", function (event) {
    event.preventDefault();
    firebase.auth().signOut().then(function(){localStorage.clear();window.location.href = "/";}).catch(function (error) {
        console.log(error.message);
    });
});
