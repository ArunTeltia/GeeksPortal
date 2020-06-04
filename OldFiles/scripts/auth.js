//listen for auth status changes

auth.onAuthStateChanged((user) => {
  if (user) {
    setUpUi(user);
  } else {
    setUpUi();
  }
});

//real-time database to open article
const articleViews = document.querySelector("#article-Button");
articleViews.addEventListener("click", (e) => {
  e.preventDefault();

  const articleLists = document.querySelector(".articles");

  articleLists.innerHTML = "";

  db.collection("articles")
    .where("status", "==", "Pending")
    .where("category", "==", "Article")
    .get()
    .then((snapshot) => {
      setupArticles(snapshot.docs);
    });
});

//real-time database to open code

const codeViews = document.querySelector("#code-Button");

codeViews.addEventListener("click", (e) => {
  e.preventDefault();
  const articleLists = document.querySelector(".articles");

  articleLists.innerHTML = "";

  db.collection("articles")
    .where("status", "==", "Pending")
    .where("category", "==", "Code")
    .get()
    .then((snapshot) => {
      setupArticles(snapshot.docs);
    });
});

//real-time database to open puzzles

const puzzleViews = document.querySelector("#puzzle-Button");

puzzleViews.addEventListener("click", (e) => {
  e.preventDefault();

  const articleLists = document.querySelector(".articles");

  articleLists.innerHTML = "";

  db.collection("articles")
    .where("status", "==", "Pending")
    .where("category", "==", "Puzzle")
    .get()
    .then((snapshot) => {
      setupArticles(snapshot.docs);
    });
});

//sign up

const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get reviewer's info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  // signup reviewer
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});

//login reviewer
const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get reviewer's info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  //logged reviewer in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the login model and reset the form
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
