const articleLists = document.querySelector('.articlesView');
const singlearticleLists = document.querySelector('.SingleArticleView');

db.collection('articles').where('status', '==', 'Accept').where('category', '==', 'Puzzle')
.get().then(snapshot => {

setupPuzzles(snapshot.docs);

});



// get puzzles
const setupPuzzles = (data) => {

    if(data.length){
 
 
        data.forEach(doc => {
        const puzzle = doc.data();

        let uli = document.createElement('ol');

        let br = document.createElement('br');
        let li = document.createElement('li');
        let brr = document.createElement('br');
        let hr = document.createElement('hr');
        let titleheader = document.createElement('button');
        let hr2 = document.createElement('hr');
       
        titleheader.style.fontSize = '18px';
            titleheader.className = 'a1';
             titleheader.textContent = doc.data().title;
            titleheader.style.fontWeight = 'bold';
            uli.className = 'ula';
      
        uli.appendChild(li);
        li.appendChild(titleheader);
        articleLists.appendChild(uli);
   
           
        titleheader.addEventListener('click', (e) => {
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
     
        backbutton.className = 'button2';
        backbutton.textContent = '<< Back '
     
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
                
                  
                singlearticleLists.appendChild(li);
          });
        })
             
    });

}
}

