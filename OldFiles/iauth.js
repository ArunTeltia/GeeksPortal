auth.onAuthStateChanged(user => {
    var uid = null;

        if (user) {
          // User is signed in.

	  window.location.replace("afterlogin.html");
      
    }
   
});
