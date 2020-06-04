const router = require("express").Router();
const connection = require("../config/DBconnection");
const db = require("../config/makeDB");

router.get("/login", (req, res) => {
  res.render("AdminLogin");
});

router.get("/home", async (req, res) => {
  let users = [];
  let admin = [];
  let articles = [];
  let reviewers = [];
  
  
  
  
  try {
    var sql = "select FirstName,UserName,LastName,Email from Users";
    const results = await db.query(sql);
    for (let i = 0; i < results.length; i++) {
      let obj = [];
      obj.push(results[i].FirstName);
      obj.push(results[i].UserName);
      obj.push(results[i].LastName);
      obj.push(results[i].Email);
      users.push(obj);
    }
  } catch (err) {
    console.log("users")
    // console.error(err.message);
  }
  // 
  try {
    var sql4 = "select Name,UserName,`D.O.B`,Password from Admin";
    const results4 = await db.query(sql4);
    admin.push(results4[0].Name);
    admin.push(results4[0].UserName);
    admin.push("Hello");
    admin.push(results4[0].Password);
  } catch (err) {
    console.log("admin")
    // console.error(err.message);
  }
  try {
    var sql2 = "select Id,Type,Head,UserId from AllArticles";
    const results2 = await db.query(sql2);
    for (let i = 0; i < results2.length; i++) {
      var sql5 =
        "select ReviewerId from ItemReviewers where ArticleId='" +
        results2[i].Id +
        "'";
      let results5 = await db.query(sql5);
      console.log(results5[0]);
      let obj = [];
      obj.push(results2[i].Id);
      obj.push(results2[i].Type);
      obj.push(results2[i].Head);
      obj.push(results2[i].UserId);
      try {
        obj.push(results5[0].ReviewerId);
      } catch (err) {
        obj.push("No Id");
      }
      articles.push(obj);
      // console.log(obj);
    }
  } catch (err) {
    console.log("All articles");
    // console.error(err.message);
  }
  try {
    var sql3 = "select ID,Name,Level,StartDate,EndDate from Reviewers";
    const results3 = await db.query(sql3);


    for (let i = 0; i < results3.length; i++) {
      let obj = [];
      obj.push(results3[i].ID);
      obj.push(results3[i].Name);
      obj.push(results3[i].Level);
      obj.push(results3[i].StartDate);
      obj.push(results3[i].EndDate);
      reviewers.push(obj);
    }
  } catch (err) {
    console.log("Reviewers");
    // console.error(err.message);
  }


  res.render("adminHome", {
    results: users,
    results2: articles,
    results3: reviewers,
    results4: admin,
  });
});
router.post("/home", (req, res) => {
  console.log(req.body);
  let obj = JSON.parse(JSON.stringify(req.body));
  console.log(obj);
  // console.log(obj.username);
  // console.log(obj.password);
  // var exist = false;
  if (req.body.ID == "Users") {
    var sql = "delete from Users where FirstName='" + req.body.Query + "'";
    connection.query(sql, (err, results, fields) => {
      if (err) throw err;
      console.log(results);
    });
  }
  if (req.body.ID == "Articles") {
    var sql = "delete from AllArticles where Id='" + req.body.Query + "'";
    connection.query(sql, (err, results, fields) => {
      if (err) throw err;
      console.log(results);
    });
    var sql2 = "delete from ItemTags where ArticleId='" + req.body.Query + "'";
    connection.query(sql2, (err, results, fields) => {
      if (err) throw err;
      console.log(results);
    });
  }
  if (req.body.ID == "Reviewers") {
    var sql = "delete from Reviewers where Id='" + req.body.Query + "'";
    connection.query(sql, (err, results, fields) => {
      if (err) throw err;
      console.log(results);
    });
  }

  if (obj.username && obj.password) {
    var sql =
      "update `Admin` set Name = '" +
      obj.name +
      "',UserName='" +
      obj.username +
      "',Password='" +
      obj.password +
      "',`D.O.B`='" +
      obj.dob +
      "'";

    connection.query(sql, (err, results, fields) => {
      if (err) throw err;
      console.log(results);
    });
  } else if (obj.password && obj.name && obj.level && obj.email) {
    console.log(obj.name);
    console.log(obj.password);
    console.log(obj.level);
    console.log(obj.email);
    var post = {
      Name: obj.name,
      Password: obj.password,
      Level: obj.level,
      Email: obj.email,
    };

    var qry = "INSERT into Reviewers SET ?";
    connection.query(qry, post, (err, results, fields) => {
      if (err) throw err;
      console.log(results);
      // alert("Reviewers are added");
    });
  }

  // var exist = false;
  // var sql = "select UserName from Admin where UserName='" + obj.username + "'";

  // connection.query(sql, (err, results, fields) => {
  //   // console.log(results);
  //   if (err) {
  //     return console.error(err.message);
  //   }

  //   if (results.length === 0) {
  //     exist = false;
  //   } else {
  //     var del = "delete from `Admin` where UserName='" + obj.username + "'";

  //     connection.query(del, (err, results, fields) => {
  //       console.log(results);
  //       if (err) {
  //         return console.error(err.message);
  //       }

  //       // console.log(results);
  //       console.log("deleted");
  //     });
  //   }
  //   console.log(exist);
  // });
  // // var values = [req.name, req.username, req.password, req.dob];
  // // if (exist) {
  // //     req.name +
  // //     "',UserName='" +
  // //     req.username +
  // //     "',Password='" +
  // //     req.password +
  // //     "',D.O.B='" +
  // //     req.dob +
  // //     "' where UserName='" +
  // //     req.username +
  // //     "'";
  // // }
  // // }
  // // qry ="insert into Admin (Name, UserName,Password,D.O.B) VALUES('"+req.name+"', '"+req.username+"', '"+req.password+"' , '"+req.dob+"'";
  // var qry =
  //   "INSERT INTO `Admin` (Name, UserName,Password,`D.O.B`) VALUES ('" +
  //   obj.name +
  //   "','" +
  //   obj.username +
  //   "','" +
  //   obj.password +
  //   "','" +
  //   obj.dob +
  //   "')";
  // connection.query(qry, (err, results, fields) => {
  //   // console.log(results);
  //   if (err) {
  //     return console.error(err.message);
  //   }
  //   // console.log(results);
  // });
});

router.post("/login", (req, res) => {
  let obj = JSON.parse(JSON.stringify(req.body));
  console.log(obj);
  console.log(obj.uname);
  console.log(obj.psw);

  var sql =
    "select UserName,Password from Admin where UserName='" +
    obj.uname +
    "'" +
    "and Password='" +
    obj.psw +
    "'";

  // ",Password=" +
  // obj.psw;
  connection.query(sql, (err, results, fields) => {
    console.log(results);
    if (err) {
      return console.error(err.message);
    }

    if (results.length === 0) {
      res.redirect("/admin/login");
    } else {
      res.redirect("/admin/home");
    }
  });
});

module.exports = router;