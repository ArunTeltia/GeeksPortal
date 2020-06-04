const articleLists = document.querySelector('.articlesView');
const hidethisonelist = document.querySelector('.hidethisone');
const hidethislist = document.querySelector('.anotherhide');
const singlearticleLists = document.querySelector('.SingleArticleView');


db.collection('articles').where('status', '==', 'Accept').where('category', '==', 'Article')
.get().then(snapshot => {

setupArticles(snapshot.docs);
});


const allarticles = document.querySelector('#allarticles-Button');

allarticles.addEventListener('click', (e) => {
e.preventDefault();

articleLists.innerHTML = '';
hidethisonelist.innerHTML = '';
hidethislist.innerHTML ='';

db.collection('articles').where('status', '==', 'Accept').where('category', '==', 'Article')
.get().then(snapshot => {

setupArticles(snapshot.docs);

});

}) 


const articleViews = document.querySelector('#article-Button');

articleViews.addEventListener('click', (e) => {
e.preventDefault();

articleLists.innerHTML = '';
hidethisonelist.innerHTML = '';
hidethislist.innerHTML ='';

db.collection('articles').where('status', '==', 'Accept').where('category', '==', 'Article')
.orderBy('reviewedby', 'asc').get().then(snapshot => {

setupArticles(snapshot.docs);

});

})  


const OldarticleViews = document.querySelector('#old-Button');

OldarticleViews.addEventListener('click', (e) => {
e.preventDefault();

articleLists.innerHTML = '';
hidethisonelist.innerHTML = '';
hidethislist.innerHTML ='';

db.collection('articles').where('status', '==', 'Accept').where('category', '==', 'Article')
.orderBy('reviewedby', 'desc').get().then(snapshot => {

  setupArticles(snapshot.docs);

});

})  


//.where('status', '==', 'Accept').where('category', '==', 'Article')


let cl = document.getElementById("difficultlevel");

cl.addEventListener("change", (e) => {
    e.preventDefault();
    
    articleLists.innerHTML = '';
    hidethisonelist.innerHTML = '';
    hidethislist.innerHTML ='';
    
    var chooselevel = cl.options[cl.selectedIndex].value;
    db.collection('articles').where('status', '==', 'Accept').where('category', '==', 'Article').where('level', '==', chooselevel)
    .get().then(snapshot => {
    
    setupArticles(snapshot.docs);
    
    });
    
    })  
    

//setup articles
const setupArticles = (data) => {

    if(data.length){
        var  doc1 = [];
        for(var i = 0;i<10;i++){
            doc1[i] = data[i];
        }
 
        doc1.forEach(doc => {
        const article = doc.data();
        console.log(data);
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
        let tag2 = document.createElement('button');
        let tag3 = document.createElement('button');
        let tag4 = document.createElement('button');
        let reference = document.createElement('button');
        

        articleset.style.padding = '30px';
        articleset.style.fontSize = '18px';
        articleset.style.border = '2px';
        articleset.style.borderStyle = 'solid';
        articleset.style.borderColor = '#DADADA';
        articleset.style.borderLeftColor = '#DADADA';
        articleset.style.borderLeftWidth = '10px';

        division.setAttribute('data-id', doc.id);
        division.className = 'collapsible-header grey lighten-4';
        division2.className = 'collapsible-body white';
    

      titleheader.textContent = doc.data().title;
            titleheader.style.fontWeight = 'bold';
  
            articles.textContent = doc.data().article;
        Substringarticles.textContent =  articles.textContent.substr(0, 150);

        tag2.className = 'button1';
        tag3.className = 'button1';
        tag4.className = 'button1';
        tag2.textContent = doc.data().tag;
        tag3.textContent = doc.data().language;
        tag4.textContent = doc.data().level;
        reference.className = 'button1';
        reference.textContent = 'READ MORE';
        
        tag2.addEventListener('click', (e) => {
            e.stopPropagation();
            articleLists.innerHTML = '';
            hidethisonelist.innerHTML = '';
            hidethislist.innerHTML ='';

            db.collection('articles').where('status', '==', 'Accept').where('tag', '==', doc.data().tag)
            .get().then(snapshot => {
            
            setupArticles(snapshot.docs);
            
            });
        })
             
           
        tag3.addEventListener('click', (e) => {
            e.stopPropagation();
            articleLists.innerHTML = '';
            hidethisonelist.innerHTML = '';
            hidethislist.innerHTML ='';

            db.collection('articles').where('status', '==', 'Accept').where('language', '==', doc.data().language)
            .get().then(snapshot => {
            
            setupArticles(snapshot.docs);
            
            });
        })
            
        tag4.addEventListener('click', (e) => {
            e.stopPropagation();
            articleLists.innerHTML = '';
            hidethisonelist.innerHTML = '';
            hidethislist.innerHTML ='';

            db.collection('articles').where('status', '==', 'Accept').where('level', '==', doc.data().level)
            .get().then(snapshot => {
            
            setupArticles(snapshot.docs);
            
            });
        })
             
             
        reference.addEventListener('click', (e) => {
            e.stopPropagation();
          
            articleLists.innerHTML = '';
            hidethisonelist.innerHTML = '';
            hidethislist.innerHTML ='';
            
            let id = e.target.setAttribute('data', doc.id);
            let idi = e.target.getAttribute('data');
            localStorage.setItem("data", idi);
            console.log(idi);
            window.location.replace("articlepage.html");
          
        })
             
             
        li.appendChild(articleset);

        articleset.appendChild(division);
        articleset.appendChild(division2);
        division.appendChild(titleheader);       
        division.appendChild(hr);
        division2.appendChild(Substringarticles);
        division2.appendChild(reference);
        division2.appendChild(hr2); 
        division2.appendChild(tag2);
        division2.appendChild(tag3);        
        division2.appendChild(tag4);        
        li.appendChild(br);
            
          
        articleLists.appendChild(li);
    });

}
}