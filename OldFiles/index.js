
const articleList = document.querySelector('.articles');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const categoryLinks = document.querySelectorAll('.categorylinks');
const accountDetails = document.querySelector('.account-details');


let CurrentReviewer;

const setUpUi = (reviewerUsername) =>{
    if(reviewerUsername){

        //reviewer account info
        const html = `
        <div> Logged in as<b> ${reviewerUsername}</b></div>
        `;
        accountDetails.innerHTML = html;
        
        CurrentReviewer = reviewerUsername;
    
        //toggle ui elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        categoryLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
  
    }
    else{
        //hide reviewer account details
        accountDetails.innerHTML = '';
        articleList.innerHTML = '';


        //toggle ui elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        categoryLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}



//setup articles
const setupArticles = (data) => {

    if(data.length){
 
 
        data.forEach(doc => {
        const article = doc.data();

        let li = document.createElement('li');
        let lli = document.createElement('li');
        var brr = document.createElement("br");  
        let division = document.createElement('div');       
        let division2 = document.createElement('div');

        let viewButton = document.createElement("button");
        let category = document.createElement('span');
        let uidText = document.createElement('span');       
        let uid = document.createElement('span');
        let hr = document.createElement('hr');
        let levelText = document.createElement('span');
        let level = document.createElement('span');
        var br = document.createElement("br");
        var br2 = document.createElement("br");
        let titleText = document.createElement('span');
        let title = document.createElement('span');
        let articlesText = document.createElement('span');
        let articles = document.createElement('span');
        let acceptButton = document.createElement("button");
        let rejectButton = document.createElement("button");
        let draftButton = document.createElement("button");
        let hr2 = document.createElement('hr');
        division.setAttribute('data-id', doc.id);
        division.className = 'collapsible-header grey lighten-4';
        division2.className = 'collapsible-body white';
    

        acceptButton.className = 'btn yellow darken-2';     
        rejectButton.className = 'btn yellow darken-2';
        draftButton.className = 'btn yellow darken-2';
        viewButton.className = 'btn btn-mini btn yellow z-depth-0 ';

        division.innerHTML = '<h7 class="center-align"><b> Category : </b> </h7>';
        category.textContent = doc.data().category;
        category.style.gap = '3';
   
        uidText.innerHTML = '<h7 class="center-align"><b>   User-Id :</b></h7>';
       
        uid.textContent = doc.data().username;

        articlesText.innerHTML = '<h7><b> Article : </b></h7>';

        articles.textContent = doc.data().article;
        titleText.innerHTML = '<h7><b> Title : </b></h7>';

        title.textContent = doc.data().title;

        levelText.innerHTML = '<h7> <b>Difficulty level : </b></h7>';

        level.textContent = doc.data().level;

        viewButton.innerHTML = 'VIEW';
        acceptButton.innerHTML = 'ACCEPT';
        rejectButton.innerHTML = 'REJECT';
        draftButton.innerHTML = 'DRAFT';
        draftButton.style.float = "right";       
        rejectButton.style.float = "right";
        acceptButton.style.float = "right";
        viewButton.style.position = 'relative';
        viewButton.style.right = '-600';
       


        acceptButton.addEventListener('click', (e) => {
            e.stopPropagation();
              
            let id = e.target.setAttribute('data', doc.id);
                let idi = e.target.getAttribute('data');
                
                db.collection('articles').doc(idi).update({
                     status : 'Pending',                    
                     reviewedby : CurrentReviewer,
                 });
            
                 window.alert('Accept article !!');

                 let currentreviewerid;
                 var increasedoc;
                 
                db.collection('reviewer').where('username', '==', CurrentReviewer).get().then(function (snapshot)
                 {

                    snapshot.forEach(function(doc) {

                          increasedoc = doc.data().noOfArticleReviewed + 1;
                        console.log(increasedoc);
                    currentreviewerid = doc.id;
                    console.log(currentreviewerid);
                        console.log(doc.id, " => ", doc.data().noOfArticleReviewed);

                         
                       }) 

                       db.collection('reviewer').doc(currentreviewerid).set({ 
                        articlesReviewed : increasedoc
                    },
                    {
                       merge : true }).then(function () {
                  })
                
                    });
                  
             })
             

             rejectButton.addEventListener('click', (e) => {
                e.stopPropagation();
                
                let id = e.target.setAttribute('data', doc.id);
                let idi = e.target.getAttribute('data');
                db.collection('articles').doc(idi).delete();
                window.alert('Delete article !!');
                
                let currentreviewerid;
                var increasedoc;
                
               db.collection('reviewer').where('username', '==', CurrentReviewer).get().then(function (snapshot)
                {

                   snapshot.forEach(function(doc) {

                         increasedoc = doc.data().noOfArticleReviewed + 1;
                       console.log(increasedoc);
                   currentreviewerid = doc.id;
                   console.log(currentreviewerid);
                       console.log(doc.id, " => ", doc.data().noOfArticleReviewed);

                        
                      }) 

                      db.collection('reviewer').doc(currentreviewerid).set({ 
                       noOfArticleReviewed : increasedoc
                   },
                   {
                      merge : true }).then(function () {
                 })
               
                   });
               
            })


            draftButton.addEventListener('click', (e) => {
                e.stopPropagation();

                let id = e.target.setAttribute('data', doc.id);
                let idi = e.target.getAttribute('data');
                db.collection('articles').doc(idi).update({         
                            status : 'Draft',
                            reviewedby : CurrentReviewer,
                        });
                window.alert('Add to draft !!');
                
                let currentreviewerid;
                var increasedoc;
                
               db.collection('reviewer').where('username', '==', CurrentReviewer).get().then(function (snapshot)
                {

                   snapshot.forEach(function(doc) {

                         increasedoc = doc.data().noOfArticleReviewed + 1;
                       console.log(increasedoc);
                   currentreviewerid = doc.id;
                   console.log(currentreviewerid);
                       console.log(doc.id, " => ", doc.data().noOfArticleReviewed);

                        
                      }) 

                      db.collection('reviewer').doc(currentreviewerid).set({ 
                       noOfArticleReviewed : increasedoc
                   },
                   {
                      merge : true }).then(function () {
                 })
               
                   });
               
            })


            li.appendChild(division);
            li.appendChild(division2);

            division.appendChild(category);
            
            division.appendChild(uidText);            
           division.appendChild(uid);
            
           division.appendChild(viewButton);
       
            division.appendChild(hr);

            division2.appendChild(levelText); 
            division2.appendChild(level); 
            division2.appendChild(br); 
            division2.appendChild(titleText); 
            division2.appendChild(title); 
            division2.appendChild(br2); 
            division2.appendChild(articlesText); 
            division2.appendChild(articles);
            division2.appendChild(acceptButton);  
            division2.appendChild(rejectButton);  
            division2.appendChild(draftButton); 
            division2.appendChild(hr2); 
            
          
        articleList.appendChild(li);
    });

}
    else{
        articleList.innerHTML = '';
        window.alert("No pending article for this category!");
         }
}


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });