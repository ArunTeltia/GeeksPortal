const router = require("express").Router();
const connection = require("../config/DBconnection");
const db = require("../config/makeDB");

router.get("/login", (req, res) => {
  res.render("AdminLogin");
});
router.get("/general", async (req, res) => {
  let admin = [];
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
  res.render("AdminGeneral", {
    results4: admin
  });
});
router.post("/general", async (req, res) => {
  var obj = JSON.parse(JSON.stringify(req.body));
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

  await connection.query(sql, (err, results, fields) => {
    if (err) throw err;
    console.log(results);
  });
  res.render("adminHome");
});

router.get("/Articles", async (req, res) => {
  let articles = [];
  try {
    var sql2 = "select * from AllArticles A left join Users U on A.UserId=U.ID";
    const results2 = await db.query(sql2);
    for (let i = 0; i < results2.length; i++) {
      let obj = [];
      obj.push(results2[i].Id);
      obj.push(results2[i].Type);
      obj.push(results2[i].Head);
      obj.push(results2[i].DisplayName);
      obj.push(results2[i].Status);
      articles.push(obj);
      // console.log(obj);
    }
  } catch (err) {
    console.log("All articles");
  }
  res.render("AdminArticles", {
    results2: articles
  });
});
router.post("/Articles", async (req, res) => {
  var sql = 'UPDATE `AllArticles` set Status="REJECTED" ,Reviewed="TRUE" WHERE Id=' +
    req.body.Query;
  connection.query(sql, (err, results, fields) => {
    if (err) throw err;
    console.log(results);
  });
  res.render("adminHome");

})
router.get("/Users", async (req, res) => {
  let users = [];
  try {
    var sql = "select * from Users";
    const results = await db.query(sql);
    for (let i = 0; i < results.length; i++) {
      let obj = [];
      obj.push(results[i].DisplayName);
      obj.push(results[i].ID);
      obj.push(results[i].Email);
      obj.push(results[i].DOB);
      obj.push(results[i].Institute);
      obj.push(results[i].PhoneNo);
      users.push(obj);
    }
  } catch (err) {
    console.log("users")
    // console.error(err.message);
  }
  res.render("AdminUsers", {
    results: users
  })

});

router.post("/Users", (req, res) => {
  var sql = "delete from Users where FirstName='" + req.body.Query + "'";
  connection.query(sql, (err, results, fields) => {
    if (err) throw err;
    console.log(results);
  });

});
router.get("/Reviewers", async (req, res) => {
  let reviewers = [];
  try {
    var sql3 = "select * from Reviewers";
    const results3 = await db.query(sql3);


    for (let i = 0; i < results3.length; i++) {
      let obj = [];
      obj.push(results3[i].Name);
      obj.push(results3[i].Email);
      obj.push(results3[i].Password);
      obj.push(results3[i].Level);
      obj.push(results3[i].StartDate);
      obj.push(results3[i].EndDate);
      reviewers.push(obj);
    }
  } catch (err) {
    console.log("Reviewers");
    // console.error(err.message);
  }
  res.render("AdminReviewers", {
    results3: reviewers
  })
})
router.post("/Reviewers", (req, res) => {
  var obj = JSON.parse(JSON.stringify(req.body));
  if (obj.password && obj.name && obj.level && obj.email) {
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
  } else {
    var sql = "delete from Reviewers where Name='" + req.body.Query + "'";
    console.log(req.body.Query);
    connection.query(sql, (err, results, fields) => {
      if (err) throw err;
      // console.log(results);
    });
  }
})

router.get("/home", async (req, res) => {
  res.render("adminHome");
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