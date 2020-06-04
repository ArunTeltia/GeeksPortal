firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

document.getElementById("user_div").style.visibility = "visible";
document.getElementById("login_div").style.visibility = "hidden";

  } else {
    // No user is signed in.

document.getElementById("user_div").style.visibility = "hidden";
document.getElementById("login_div").style.visibility = "visible";
  }
});

function signOut(){
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
}