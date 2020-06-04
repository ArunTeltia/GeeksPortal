  
const saveForm = document.querySelector('#profile-save');
const profileForm = document.querySelector('#profile-form'); 
var flag = false;
var temp = false;
var count = false;

auth.onAuthStateChanged( async user => {
    var uid = null;
    

        if (user) {
          // User is signed in.
            uid = user.uid;

            var docRef = db.collection("userdata").doc(uid);

docRef.get().then(function(doc) {
    if (doc.exists) {
      username = doc.data().username;
      document.getElementById("lastname").value = doc.data().username;
      if(username != ""){
      console.log(username);
      document.getElementById("lastname").disabled = true;
      document.getElementById("tags").value = doc.data().institute;
      document.getElementById("profile-dob").value = doc.data().dob;
      document.getElementById("profile-phone").value = doc.data().phone; 
      }
    } else {
        // doc.data() will be undefined in this case
        window.alert("No data found!");
    }
}).catch(function(error) {
    console.log("Error fetching data!");
});



var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();
var starsRef = storageRef.child('profileImage/' + user.email);
starsRef.getDownloadURL().then(function(url) {
  var img = document.getElementById('imgbox');
  var icon =  document.getElementById('showimg');
  img.src = url;
  icon.href = url;
}).catch(function(error) {
  document.getElementById("imgbox").src = user.photoURL;
  document.getElementById("showimg").href = user.photoURL;
});

             
            document.getElementById("fname").value = user.displayName;
            document.getElementById("fname").disabled = true;
            document.getElementById("email").value = user.email;
            document.getElementById("email").disabled = true;
            document.getElementById("userid").value = user.uid;
            document.getElementById("userid").disabled = true;
            
            
            
           

        }
        else{
            uid = null;
            window.location.replace("login.html");
        }
      })




saveForm.addEventListener('click', async (e) => {



    e.preventDefault();

   

    let user = firebase.auth().currentUser;
    let uid;
    if(user != null){
       uid= user.uid;

    }

   let username = document.querySelector("#lastname").value;
   let profileuserphone = document.querySelector("#profile-phone").value;
   let profileinstitute = document.querySelector("#tags").value;
   let profiledob = document.querySelector("#profile-dob").value;
   

   console.log(username.length);
    if(username.length < 6){
      count = true;
   }
   else if(!document.getElementById("lastname").disabled){
    await db.collection("userdata").where("username", "==", username)
    .get()
    .then(function(querySnapshot) { 
        querySnapshot.forEach(function(doc) {
         flag = true;
        });
    })
    .catch(function() {
        console.log("Error getting documents: ");
    });
   }




   
   if(flag){
    window.alert("Username doesnt exists!");
    flag = false;
   }
   else if(count){
     window.alert("Username must be atleast 6 letters long!");
     count = false;
   }
   else{
    db.collection('userdata').doc(uid).set({
      name : user.displayName,
      email : user.email,
      dob : user.dob,
      username : username,
      institute : profileinstitute,
      dob : profiledob,
      phone : profileuserphone    
      },
     {
        merge : true }).then(function () {
   
          window.alert("Profile updated !"); 
          
    }) 
    uploadImg();
   }

   function uploadImg() {

    let user = firebase.auth().currentUser;
    let uid;
    if(user != null){
       uid= user.uid;

    }

    var count = document.getElementById('profileImg').files.length;
    console.log(count);
    
    var image=document.getElementById("profileImg").files[0];
       
        var storageRef=firebase.storage().ref('profileImage/'+user.email);
        
    
        var uploadTask=storageRef.put(image);
    
    
        
        
        uploadTask.on('state_changed',function (snapshot) {
            
            var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log("upload is " + progress +" done");
        },function (error) {
            
            console.log(error.message);
        },function () {
           
    
            uploadTask.snapshot.ref.getDownloadURL().then(function (downlaodURL) {
                
                console.log(downlaodURL);
            });
        });
    }

      
    


// var ref = firebase.database().ref("userdata");
// ref.orderByChild("username").equalTo(username).on("child_added", function(snapshot) {
//   console.log(snapshot.key);
//   alert("User Exists");
// });


 // get reviewer's info
   
 

      
    



    

            
})