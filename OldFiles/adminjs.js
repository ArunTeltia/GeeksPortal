

//update admin records
const addadmindetails = document.querySelector('#addAdminDetails');
const saveAdminInfo = document.querySelector('.saveadmin');


saveAdminInfo.addEventListener('click', (e) => {
   
     
    e.preventDefault();

    const addName = document.querySelector('.addname').value;
    const addadminName = document.querySelector('.addadminname').value;
    const addadmindob = document.querySelector('.addadmindob').value;
    const addadminpass = document.querySelector('.addadminpass').value;

      
   let reviewarticlereviewed = document.querySelector("#articlereviewed").value;
   
    db.collection('admin').doc('admindetails').set({
             name : addName,
            username : addadminName,
             adminDOB : addadmindob,
             password : addadminpass,    
      });  
  
      window.alert("Admin Records updated !");   
  
})




 //real-time database to open article
 const allUsers = document.querySelector('.allUsers');
 function setupUser(doc) {

    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let lable1 = document.createElement("label");
    let lable2 = document.createElement("label");

    tr.className = 'item1';
    td1.className = 'col-7';
    td2.className = 'col-9';
    td3.className = 'col-9';
    td4.className = 'col-8';
    td5.className = 'col-5';
    td6.className = 'col-4';
    lable1.className = 'delete-row';
    lable2.className = 'delete-row';
    
    td1.textContent = doc.data().name;
    td2.textContent = doc.data().username;
    td3.textContent = doc.data().email;
    td4.textContent = doc.data().dob;
    lable1.textContent = "Delete";
    lable2.textContent = "Block";


    
    lable1.addEventListener('click', (e) => {
        e.stopPropagation();
    
        let id = e.target.setAttribute('data', doc.id);
        let idi = e.target.getAttribute('data');
        db.collection('userdata').doc(idi).delete();
        
    })

    lable2.addEventListener('click', (e) => {

        let id = e.target.setAttribute('data', doc.id);
        let idi = e.target.getAttribute('data');
        
   //     firebase.auth().updateUser(idi, {
     //       disabled: true
       //   })
    })

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    
    td5.appendChild(lable1);
    td6.appendChild(lable2);

    tr.appendChild(td5);
    tr.appendChild(td6);
    allUsers.appendChild(tr);



 }
    
// get users details
 db.collection('userdata').get().then(snapshot => {

    snapshot.docs.forEach(doc => {
        
        setupUser(doc);
    });

});

// get articles details
db.collection('articles').where('status', '==', 'Accept').get().then(snapshot => {

    snapshot.docs.forEach(doc => {
        
        setupArticles(doc);
    });

});



const allarticles = document.querySelector('.allArticles');
function setupArticles(doc) {

   let tr = document.createElement("tr");
   let td1 = document.createElement("td");
   let td2 = document.createElement("td");
   let td6 = document.createElement("td");
   let td3 = document.createElement("td");
   let td4 = document.createElement("td");
   let td5 = document.createElement("td");
   let lable1 = document.createElement("label");

   tr.className = 'item1';
   td1.className = 'col-7';
   td2.className = 'col-6';
   td6.className = 'col-6';
   td3.className = 'col-5';
   td4.className = 'col-7';
   td5.className = 'col-5';
   lable1.className = 'delete-row';


   td1.textContent = doc.id;
   td6.textContent = doc.data().category;
   td2.textContent = doc.data().title;
   td3.textContent = doc.data().username;
   td4.textContent = doc.data().reviewedby;
   lable1.textContent = "Delete";



    
    lable1.addEventListener('click', (e) => {
        e.stopPropagation();
    
        let id = e.target.setAttribute('data', doc.id);
        let idi = e.target.getAttribute('data');
        db.collection('articles').doc(idi).delete();
        
    })
    tr.appendChild(td1);
    tr.appendChild(td6);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    
    td5.appendChild(lable1);

    tr.appendChild(td5);
    allarticles.appendChild(tr);



 }


//add new reviewers
const addReviewer = document.querySelector('#addNewReviewer');
const saveReviewerInfo = document.querySelector('#saveReviewerinfo');



saveReviewerInfo.addEventListener('click', (e) => {

    e.preventDefault();
 
    let reviewname = document.querySelector("#name").value;
    let reviewusername = document.querySelector("#username").value;
    let reviewlevel = document.querySelector("#level").value;
    let reviewarticlereviewed = document.querySelector("#articlereviewed").value;
   
    db.collection('reviewer').add({
       name : reviewname,
        username : reviewusername,
         level : reviewlevel,
          articlesReviewed : reviewarticlereviewed,    
      });  
  
      window.alert("New Reviewer Added !");   
      
  
})


    
// get reviewers details
db.collection('reviewer').get().then(snapshot => {

    snapshot.docs.forEach(doc => {
        
        setupReviewer(doc);
    });

});



const allreviewers = document.querySelector('.allReviewers');
function setupReviewer(doc) {

   let tr = document.createElement("tr");
   let td1 = document.createElement("td");
   let td2 = document.createElement("td");
   let td3 = document.createElement("td");
   let td4 = document.createElement("td");
   let td5 = document.createElement("td");
   let lable1 = document.createElement("label");

   tr.className = 'item1';
   td1.className = 'col-7';
   td2.className = 'col-6';
   td3.className = 'col-5';
   td4.className = 'col-7';
   td5.className = 'col-5';
   lable1.className = 'delete-row';


   td1.textContent = doc.data().name;
   td2.textContent = doc.data().username;
   td3.textContent = doc.data().level;
   td4.textContent = doc.data().articlesReviewed;
   lable1.textContent = "Delete";



    
    lable1.addEventListener('click', (e) => {
    
        let id = e.target.setAttribute('data', doc.id);
        let idi = e.target.getAttribute('data');
        db.collection('reviewer').doc(idi).delete();
      
    })
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    
    td5.appendChild(lable1);

    tr.appendChild(td5);
    allreviewers.appendChild(tr);
 }
    
