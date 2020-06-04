auth.onAuthStateChanged(async user => {
    var uid = null;
    var imgsrc;

        if (user) {
          // User is signed in.

          
          uid = user.uid;
          const ViewUser = document.querySelector('#profileviewer');

          var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();
var starsRef = storageRef.child('profileImage/' + user.email);
await starsRef.getDownloadURL().then(function(url) {
  imgsrc = url;
}).catch(function(error) {
  imgsrc = user.photoURL;
});
          
 
          db.collection('userdata').doc(uid).set({

            name : user.displayName,
            email : user.email,
            
           
           
          },
             {
            merge : true })
              .then(function () {
         
            console.log(user);
            const html = `
            <img src=${imgsrc} style="width:30px;height:30px;border-radius:50%;">
            `;
            ViewUser.innerHTML = html;
        
            
          }) 
      
    }
    else{
       
        uid = null;
        window.location.replace("login.html");
        
      }
});


const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  // e.preventDefault();
   firebase.auth().signOut().then(function() {
  // Sign-out successful.
window.alert("User signed out successfully");
window.location.replace("index.html");

}).catch(function(error) {
  // An error happened.
window.alert("something went wrong!");
});
   

   
})
