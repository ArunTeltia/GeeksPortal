   //real-time database to open article
   const articleViews = document.querySelector('#article-Button');
          articleViews.addEventListener('click', (e) => {

            e.preventDefault();
     
        const articleLists = document.querySelector('.articles');

        articleLists.innerHTML = '';
              

       db.collection('articles').where('status', '==', 'Pending').where('category', '==', 'Article')
       .get().then(snapshot => {

         setupArticles(snapshot.docs);

        });

        
    })  

      //real-time database to open code
 
    const codeViews = document.querySelector('#code-Button');
       
    codeViews.addEventListener('click', (e) => {

             e.preventDefault();
             const articleLists = document.querySelector('.articles');

        articleLists.innerHTML = '';
      

        db.collection('articles').where('status', '==', 'Pending').where('category', '==', 'Code')
     .get().then(snapshot => {

       setupArticles(snapshot.docs);

      });

  })  

    //real-time database to open puzzles

  const puzzleViews = document.querySelector('#puzzle-Button');
       
  puzzleViews.addEventListener('click', (e) => {
    e.preventDefault();
    
    const articleLists = document.querySelector('.articles');

    articleLists.innerHTML = '';
  

   db.collection('articles').where('status', '==', 'Pending').where('category', '==', 'Puzzle')
   .get().then(snapshot => {

     setupArticles(snapshot.docs);

    });

})  

    // logout
const logout = document.querySelector('#logout');
   logout.addEventListener('click', (e) => {
     e.preventDefault();
     accountDetails.innerHTML = '';
     articleList.innerHTML = '';


     //toggle ui elements
     loggedInLinks.forEach(item => item.style.display = 'none');
     categoryLinks.forEach(item => item.style.display = 'none');
     loggedOutLinks.forEach(item => item.style.display = 'block');
})



    //login reviewer 
    const loginForm = document.querySelector('#login-form');
    var reviewerUsername;
    loginForm.addEventListener('submit', (e) => {
    
        e.preventDefault();

         // get reviewer's info
         reviewerUsername = loginForm['login-email'].value;
              
        db.collection('reviewer').get().then(snapshot => { 
          findReviewers(snapshot.docs);
        });

      });

          
//setup articles
const findReviewers = (data) => {

  if(data.length){
      data.forEach(doc => {


          reviewername = doc.data().username;

          if(reviewername.localeCompare(reviewerUsername) == 0 ){

            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset();
       
                setUpUi(reviewerUsername);        
          }
          
        }); 
      }    
        else{

          const modal = document.querySelector('#modal-login');
          M.Modal.getInstance(modal).close();
          loginForm.reset();
          window.alert("Invalid Login Credentials !");
        
        }
}
