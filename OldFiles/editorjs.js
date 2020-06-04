const saveArticlesData = document.querySelector('.articlesubmit');

saveArticlesData.addEventListener('click', (e) => {
    e.preventDefault();

    let puzzlevar = document.querySelector(".puzzlebutton").value;
    let articlevar = document.querySelector(".articlebutton").value;
    let codevar = document.querySelector(".codebutton").value;

  //  let articlefield = document.querySelector(".mainarticlefield").value;
  let articlefield = document.getElementById("editor-container").getContents();
    let chooselevel = document.getElementById("difficultlevel").value;
    var delta = quill.getContents();
    console.log(puzzlevar);     console.log(chooselevel);     
    console.log(articlefield);  
    console.log(delta);
})

