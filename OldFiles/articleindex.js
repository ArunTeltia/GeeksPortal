
const articleLists = document.querySelector('.articlesView');
const singlearticleLists = document.querySelector('.SingleArticleView');


db.collection('articles').where('status', '==', 'Accept').where('category', '==', 'Article')
.get().then(snapshot => {

setupArticles(snapshot.docs);
});


db.collection('articles').where('status', '==', 'Accept').where('category', '==', 'Puzzle')
.get().then(snapshot => {

setupPuzzles(snapshot.docs);

});



//real-time database to open code
db.collection('articles').where('status', '==', 'Accept').where('category', '==', 'Code')
.get().then(snapshot => {

setupArticles(snapshot.docs);

});


/*
//real-time database to open code

db.collection('articles').where('status', '==', 'Accept').where('category', '==', 'Code')
.get().then(snapshot => {

setupArticles(snapshot.docs);

});
  
*/

//real-time database to open puzzles

const allarticles = document.querySelector('#allarticles-Button');

allarticles.addEventListener('click', (e) => {
e.preventDefault();

articleLists.innerHTML = '';


db.collection('articles').where('status', '==', 'Accept').where('category', '==', 'Article')
.get().then(snapshot => {

setupArticles(snapshot.docs);

});
db.collection('articles').where('status', '==', 'Accept').where('category', '==', 'Code')
.get().then(snapshot => {

setupArticles(snapshot.docs);

});
db.collection('articles').where('status', '==', 'Accept').where('category', '==', 'Puzzle')
.get().then(snapshot => {

setupPuzzles(snapshot.docs);

});


})  


const puzzleViews = document.querySelector('#puzzle-Button');

puzzleViews.addEventListener('click', (e) => {
e.preventDefault();

articleLists.innerHTML = '';


db.collection('articles').where('status', '==', 'Accept').where('category', '==', 'Puzzle')
.get().then(snapshot => {

setupPuzzles(snapshot.docs);

});

})  

//real-time database to open puzzles

const articleViews = document.querySelector('#article-Button');

articleViews.addEventListener('click', (e) => {
e.preventDefault();

articleLists.innerHTML = '';


db.collection('articles').where('status', '==', 'Accept').where('category', '==', 'Article')
.get().then(snapshot => {

setupArticles(snapshot.docs);

});

})  

//real-time database to open puzzles

const codeViews = document.querySelector('#code-Button');

codeViews.addEventListener('click', (e) => {
e.preventDefault();

articleLists.innerHTML = '';


db.collection('articles').where('status', '==', 'Accept').where('category', '==', 'Code')
.get().then(snapshot => {

setupArticles(snapshot.docs);

});

})  




//setup articles
const setupArticles = (data) => {

    if(data.length){
 
        data.forEach(doc => {
        const article = doc.data();

        let li = document.createElement('li');
        let br = document.createElement('br');
        let brr = document.createElement('br');
        let division = document.createElement('div');       
        let division2 = document.createElement('div');
        let hr = document.createElement('hr');
        let titleheader = document.createElement('span');
        let articles = document.createElement('span');
        let Substringarticles = document.createElement('span');
        let hr2 = document.createElement('hr');
        let articleset = document.createElement('article');
        let tag1 = document.createElement('button');
        let tag2 = document.createElement('button');
        let tag3 = document.createElement('button');
        let tag4 = document.createElement('button');
        let reference = document.createElement('button');
        

        articleset.style.padding = '30px';
        articleset.style.fontSize = '18px';
        articleset.style.border = '2px';
        articleset.style.borderStyle = 'solid';
        articleset.style.borderRadius = '10px';
        articleset.style.borderColor = '#DADADA';
        articleset.style.borderLeftColor = '#623955';
        articleset.style.borderLeftWidth = '10px';

        division.setAttribute('data-id', doc.id);
        division.className = 'collapsible-header grey lighten-4';
        division2.className = 'collapsible-body white';
    

      titleheader.textContent = doc.data().title;
            titleheader.style.fontWeight = 'bold';
  
            articles.textContent = doc.data().article;
        Substringarticles.textContent =  articles.textContent.substr(0, 150);
   
        tag1.className = 'button1';
        tag2.className = 'button1';
        tag3.className = 'button1';
        tag4.className = 'button1';
        tag1.textContent = doc.data().category;
        tag2.textContent = doc.data().tag;
        tag3.textContent = doc.data().language;
        tag4.textContent = doc.data().level;
        reference.className = 'button1';
        reference.textContent = 'READ MORE';
        

        tag1.addEventListener('click', (e) => {
            e.stopPropagation();
            articleLists.innerHTML = '';


            db.collection('articles').where('status', '==', 'Accept').where('category', '==', doc.data().category)
            .get().then(snapshot => {
            
            setupArticles(snapshot.docs);
            
            });
        })
             
           

        tag2.addEventListener('click', (e) => {
            e.stopPropagation();
            articleLists.innerHTML = '';


            db.collection('articles').where('status', '==', 'Accept').where('tag', '==', doc.data().tag)
            .get().then(snapshot => {
            
            setupArticles(snapshot.docs);
            
            });
        })
             
           
        tag3.addEventListener('click', (e) => {
            e.stopPropagation();
            articleLists.innerHTML = '';


            db.collection('articles').where('status', '==', 'Accept').where('language', '==', doc.data().language)
            .get().then(snapshot => {
            
            setupArticles(snapshot.docs);
            
            });
        })
            
        tag4.addEventListener('click', (e) => {
            e.stopPropagation();
            articleLists.innerHTML = '';


            db.collection('articles').where('status', '==', 'Accept').where('level', '==', doc.data().level)
            .get().then(snapshot => {
            
            setupArticles(snapshot.docs);
            
            });
        })
             
             
        reference.addEventListener('click', (e) => {
            e.stopPropagation();
          
            articleLists.innerHTML = '';
            let id = e.target.setAttribute('data', doc.id);
            let idi = e.target.getAttribute('data');
          
            db.collection('articles').doc(idi).get().then(snapshot => {

                let li = document.createElement('li');
                let division = document.createElement('div');       
                let division2 = document.createElement('div');
                let division3 = document.createElement('div');
                let division4 = document.createElement('div');
                let division5 = document.createElement('div');
                let tagsText = document.createElement('span');       
                let uid = document.createElement('span');
                let br1 = document.createElement('br');
                let br2 = document.createElement('br');
                let br3 = document.createElement('br');
                
               let contritext = document.createElement('span');
                let titleheader = document.createElement('span');
      
                let articles = document.createElement('span');
                let hr2 = document.createElement('hr');
                let articleset = document.createElement('article');
                let backbutton = document.createElement('button');
                let tag1 = document.createElement('button');
                let tag2 = document.createElement('button');
                let tag3 = document.createElement('button');
                let tag4 = document.createElement('button');
                        

                backbutton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    location.reload(false);
                });

                li.style.margin = 'auto';

                articleset.style.padding = '30px';
                articleset.style.fontSize = '18px';
                li.style.border = '2px';
                li.style.borderStyle = 'solid';
              tagsText.style.color = '#DADADA';
              tagsText.style.fontSize = '18px';
              tagsText.style.marginInlineStart = '30px';
                 li.style.borderColor = '#ffffff';
          
                division.setAttribute('data-id', doc.id);
                division.className = 'collapsible-header grey lighten-4';
                division2.className = 'collapsible-body white';
            
                division3.style.textAlign = 'center';
                titleheader.textContent = doc.data().title;
                titleheader.style.fontSize = '30px';
                titleheader.style.color = 'black';

                contritext.innerHTML = '<h7 class="center-align"><b> Contributed By  </b> </h7>';
                  contritext.style.fontSize = '20px';
                contritext.style.color = 'black';
          
                tagsText.innerHTML = '<h7 class="center-align"><b> Article tags : </b> </h7>';
               
           uid.style.fontSize = '20px';
           uid.style.color = 'black';
           uid.textContent = doc.data().username;
            uid.style.textTransform = 'capitalize';        
               
        tag1.className = 'button1';
        backbutton.className = 'button2';
        backbutton.textContent = '<< Back '
        tag2.className = 'button1';
        tag3.className = 'button1';
        tag4.className = 'button1';
        tag1.textContent = doc.data().category;
        tag2.textContent = doc.data().tag;
        tag3.textContent = doc.data().language;
        tag4.textContent = doc.data().level;
        
             
                articles.textContent = doc.data().article;
                li.appendChild(division5);
                division5.appendChild(backbutton);
                li.appendChild(articleset);
              
                li.appendChild(division3);
                li.appendChild(division4);
        
        
                articleset.appendChild(division);
                articleset.appendChild(division2);
                division.appendChild(titleheader);       
                division.appendChild(br2);    
                division.appendChild(br1);
                division2.appendChild(articles);
                division2.appendChild(hr2); 
                
                division3.appendChild(contritext);         
                division3.appendChild(brr);
                division3.appendChild(uid);  

                division3.appendChild(br3);  
                division3.appendChild(br3);  
                
                division4.appendChild(tagsText);
                division4.appendChild(tag1);
                division4.appendChild(tag2);
                division4.appendChild(tag3);        
                       
                division4.appendChild(tag4);        
                       
                singlearticleLists.appendChild(li);        
        

                tag1.addEventListener('click', (e) => {
                    e.stopPropagation();
                    singlearticleLists.innerHTML = '';
                  
                    db.collection('articles').where('status', '==', 'Accept').where('category', '==', doc.data().category)
                    .get().then(snapshot => {
                    
                    setupArticles(snapshot.docs);
                    
                    });

                })
                     
                   
        
                tag2.addEventListener('click', (e) => {
                    e.stopPropagation();
                    singlearticleLists.innerHTML = '';
                  
        
                    db.collection('articles').where('status', '==', 'Accept').where('tag', '==', doc.data().tag)
                    .get().then(snapshot => {
                    
                    setupArticles(snapshot.docs);
                    
                    });
                })
                     
                   
                tag3.addEventListener('click', (e) => {
                    e.stopPropagation();
                    singlearticleLists.innerHTML = '';
                  
        
                    db.collection('articles').where('status', '==', 'Accept').where('language', '==', doc.data().language)
                    .get().then(snapshot => {
                    
                    setupArticles(snapshot.docs);
                    
                    });
                })
                    
                tag4.addEventListener('click', (e) => {
                    e.stopPropagation();
                    singlearticleLists.innerHTML = '';
                  
        
                    db.collection('articles').where('status', '==', 'Accept').where('level', '==', doc.data().level)
                    .get().then(snapshot => {
                    
                    setupArticles(snapshot.docs);
                    
                    });
                })
                     
          });
        })
             
             
        li.appendChild(articleset);

        articleset.appendChild(division);
        articleset.appendChild(division2);
        division.appendChild(titleheader);       
        division.appendChild(hr);
        division2.appendChild(Substringarticles);
        division2.appendChild(reference);
        division2.appendChild(hr2); 
        division2.appendChild(tag1);
        division2.appendChild(tag2);
        division2.appendChild(tag3);        
        division2.appendChild(tag4);        
        li.appendChild(br);
            
          
        articleLists.appendChild(li);
    });

}
   // else{
     //   articleLists.innerHTML = '<h5>No Articles Found..</h5>';
   //     window.alert("No pending article for this category!");
       //  }
}


// get puzzles
const setupPuzzles = (data) => {

    if(data.length){
 
 
        data.forEach(doc => {
        const puzzle = doc.data();

        let li = document.createElement('li');
        let br = document.createElement('br');
        let brr = document.createElement('br');
        let division = document.createElement('div');       
        let division2 = document.createElement('div');
        let uidText = document.createElement('span');       
        let uid = document.createElement('span');
        let hr = document.createElement('hr');
        let titleheader = document.createElement('span');
        let articles = document.createElement('span');
        let Substringarticles = document.createElement('span');
        let hr2 = document.createElement('hr');
        let articleset = document.createElement('article');
        let tag1 = document.createElement('button');
        let reference = document.createElement('button');
        

        articleset.style.padding = '30px';
        articleset.style.fontSize = '18px';
        articleset.style.border = '2px';
        articleset.style.borderStyle = 'solid';
        articleset.style.borderRadius = '10px';
        articleset.style.borderColor = '#DADADA';
        articleset.style.borderLeftColor = '#623955';
        articleset.style.borderLeftWidth = '10px';

        division.setAttribute('data-id', doc.id);
        division.className = 'collapsible-header grey lighten-4';
        division2.className = 'collapsible-body white';
    

             titleheader.textContent = doc.data().title;
            titleheader.style.fontWeight = 'bold';
     
        articles.textContent = doc.data().article;
        Substringarticles.textContent =  articles.textContent.substr(0, 150);
   
        tag1.className = 'button1';
        tag1.textContent = doc.data().category;
        reference.className = 'button1';
        reference.textContent = 'READ MORE';
        
        li.appendChild(articleset);

        articleset.appendChild(division);
        articleset.appendChild(division2);
        division.appendChild(titleheader);       
        division.appendChild(hr);
        division2.appendChild(Substringarticles);
        division2.appendChild(reference);
        division2.appendChild(hr2); 
        division2.appendChild(tag1);
        li.appendChild(br);
            
          
        articleLists.appendChild(li);
   
        tag1.addEventListener('click', (e) => {
            e.stopPropagation();
            articleLists.innerHTML = '';


            db.collection('articles').where('status', '==', 'Accept').where('category', '==', doc.data().category)
            .get().then(snapshot => {
            
            setupArticles(snapshot.docs);
            
            });
        })
             
           
        reference.addEventListener('click', (e) => {
            e.stopPropagation();
          
            articleLists.innerHTML = '';
            let id = e.target.setAttribute('data', doc.id);
            let idi = e.target.getAttribute('data');
          
            db.collection('articles').doc(idi).get().then(snapshot => {

                let li = document.createElement('li');
                let division = document.createElement('div');       
                let division2 = document.createElement('div');
                let division3 = document.createElement('div');
                let division4 = document.createElement('div');
                let division5 = document.createElement('div');
                let tagsText = document.createElement('span');       
                let uid = document.createElement('span');
                let br1 = document.createElement('br');
                let br2 = document.createElement('br');
                let br3 = document.createElement('br');
                
               let contritext = document.createElement('span');
                let titleheader = document.createElement('span');
      
                let articles = document.createElement('span');
                let hr2 = document.createElement('hr');
                let articleset = document.createElement('article');
                let backbutton = document.createElement('button');
                let tag1 = document.createElement('button');
                let tag2 = document.createElement('button');
                let tag3 = document.createElement('button');
                        

                backbutton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    location.reload(false);
                });

                li.style.margin = 'auto';

                articleset.style.padding = '30px';
                articleset.style.fontSize = '18px';
                li.style.border = '2px';
                li.style.borderStyle = 'solid';
               tagsText.style.color = '#DADADA';
                  tagsText.style.fontSize = '18px';
              tagsText.style.marginInlineStart = '30px';
                 li.style.borderColor = '#ffffff';
          
                division.setAttribute('data-id', doc.id);
                division.className = 'collapsible-header grey lighten-4';
                division2.className = 'collapsible-body white';
            
                division3.style.textAlign = 'center';
                titleheader.textContent = doc.data().title;
                titleheader.style.fontSize = '30px';
                titleheader.style.color = 'black';

                contritext.innerHTML = '<h7 class="center-align"><b> Contributed By  </b> </h7>';
                  contritext.style.fontSize = '20px';
                contritext.style.color = 'black';
        
           tagsText.innerHTML = '<h7 class="center-align"><b> Article tags : </b> </h7>';
               
           uid.style.fontSize = '20px';
           uid.style.color = 'black';
           uid.textContent = doc.data().username;
          uid.style.textTransform = 'capitalize';        
     
          tag1.className = 'button1';
        backbutton.className = 'button2';
        backbutton.textContent = '<< Back '
        tag1.textContent = doc.data().category;
     
        tag1.addEventListener('click', (e) => {
            e.stopPropagation();
            singlearticleLists.innerHTML = '';


            db.collection('articles').where('status', '==', 'Accept').where('category', '==', doc.data().category)
            .get().then(snapshot => {
            
            setupArticles(snapshot.docs);
            
            });
        })
             
          
                articles.textContent = doc.data().article;
                li.appendChild(division5);
                division5.appendChild(backbutton);
                li.appendChild(articleset);
              
                li.appendChild(division3);
                li.appendChild(division4);
        
        
                articleset.appendChild(division);
                articleset.appendChild(division2);
                division.appendChild(titleheader);       
                division.appendChild(br2);    
                division.appendChild(br1);
                division2.appendChild(articles);
                division2.appendChild(hr2); 
                
                division3.appendChild(contritext);         
                division3.appendChild(brr);
                division3.appendChild(uid);  

                division3.appendChild(br3);  
                division3.appendChild(br3);  
                
               division4.appendChild(tagsText);
                division4.appendChild(tag1);
                       
                  
                singlearticleLists.appendChild(li);
          });
        })
             
    });

}
}

