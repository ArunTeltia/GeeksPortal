const router = require("express").Router();
const connection = require("../config/DBconnection");
const db = require("../config/makeDB");
const shortid = require('shortid');
const bcrypt=require("bcryptjs");

const AauthCheck = require("../config/AauthCheck");
const fs = require('fs');
const json2xls = require('json2xls');
const path = require('path');

router.get("/general", AauthCheck, async (req, res) => {
  try {
    let admin = [];
    try {
      var sql4 = "select Name,UserName,DOB,Password from Admin";
      const results4 = await db.query(sql4);
      admin.push(results4[0].Name);
      admin.push(results4[0].UserName);
      admin.push(results4[0].DOB);
      admin.push(results4[0].Password);
    } catch (err) {
      // console.log("admin");
      // console.error(err.message);
    }
    res.render("AdminGeneral", {
      results4: admin,
    });
  } catch (err) {
    console.log(err);
  }
});
router.post("/general", AauthCheck, async (req, res) => {
  try {


    var obj = JSON.parse(JSON.stringify(req.body));

    if (obj.name && obj.password && obj.username) {
      var sql =
        "update `Admin` set Name = '" +
        obj.name +
        "',UserName='" +
        obj.username +
        "',Password='" +
        obj.password +
        "'";

      connection.query(sql, (err, results, fields) => {
        if (err) throw err;
        console.log(results);
        res.redirect("/admin/home")
      });

    } else {
      res.redirect("/admin/home")
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/Articles", AauthCheck, async (req, res) => {
  try {
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
      results2: articles,
    });
  } catch (err) {
    console.log(err);
  }
});
router.post("/Articles", AauthCheck, async (req, res) => {
  try {
    var sql =
      'UPDATE `AllArticles` set Status="REJECTED" ,Reviewed="TRUE" WHERE Id="' +
      req.body.Query + '"';
    connection.query(sql, (err, results, fields) => {
      if (err) throw err;
      console.log(results);
    });
    res.render("adminHome");
  } catch (err) {
    console.log(err);
  }
});
router.get("/Users", AauthCheck, async (req, res) => {
  try {
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
      console.log("users");
      // console.error(err.message);
    }
    res.render("AdminUsers", {
      results: users,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/Users", AauthCheck, (req, res) => {
  try {
    console.log(req.body);
    var sql = "delete from Users where ID='" + req.body.ID + "'";
    connection.query(sql, (err, results, fields) => {
      if (err) throw err;
      console.log(results);
    });
  } catch (err) {
    console.log(err);
  }
});
router.get("/Reviewers", AauthCheck, async (req, res) => {
  try {
    let reviewers = [];
    try {
      var sql3 = "select * from Reviewers";
      const results3 = await db.query(sql3);
      // console.log(results3);
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
      results3: reviewers,
    });
  } catch (err) {
    console.log(err);
  }
});
router.post("/Reviewers", AauthCheck, async(req, res) => {
  try {
    var obj = JSON.parse(JSON.stringify(req.body));
    // consol.log(obj);
    // console.log(req.body);
    var ReviewerId = shortid.generate();

    if (obj.password && obj.name && obj.level && obj.email && obj.sdate && obj.edate) {
      
      let hashedPassword;
    hashedPassword= await bcrypt.hash(obj.password,12);

      var post = {
        ID: ReviewerId,
        Name: obj.name,
        Password: hashedPassword,
        Level: obj.level,
        StartDate: obj.sdate,
        EndDate: obj.edate,
        Email: obj.email,
      };

      var qry = "INSERT into Reviewers SET ?";
      connection.query(qry, post, (err, results, fields) => {
        if (err) throw err;
        // console.log(results);
        res.redirect("/admin/home");
        // alert("Reviewers are added");
      });
    } else {
      var sql = "delete from Reviewers where Name='" + req.body.Query + "'";
      // console.log(req.body.Query);
      connection.query(sql, (err, results, fields) => {
        if (err) throw err;
        // console.log(results);
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/home", AauthCheck, async (req, res) => {
  try {
    res.render("adminHome");
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", AauthCheck, (req, res) => {
  try {

    let obj = JSON.parse(JSON.stringify(req.body));
    // console.log(obj);
    // console.log(obj.uname);
    // console.log(obj.psw);

    var sql =
      "select UserName,Password from Admin where UserName='" +
      obj.uname +
      "'" +
      "and Password='" +
      obj.psw +
      "'";
    connection.query(sql, (err, results, fields) => {
      // console.log(results);
      if (err) {
        return console.error(err.message);
      }

      if (results.length === 0) {
        res.redirect("/admin/login");
      } else {
        res.redirect("/admin/home");
      }
    });
  } catch (err) {
    console.log(err);
  }
});
router.get("/download", (req, res) => {
  try {
    var sql = "select * from Admin";
    // query data from MySQL
    connection.query(sql, function (error, data, fields) {
      if (error) throw error;

      const jsonData = JSON.parse(JSON.stringify(data));
      // console.log("jsonData", jsonData);

      // TODO: export to CSV file
      const xls = json2xls(jsonData);
      fs.writeFileSync('admin.xlsx', xls, 'binary', (err) => {
        if (err) throw err;
        console.log('Data written to file');
      });
      const excelFilePath = path.join(__dirname, '../admin.xlsx');
      res.sendFile(excelFilePath, (err) => {
        if (err) console.log(err);
      });

    });
  } catch (err) {
    console.log(err);
  }
})
router.get("/userdownload", (req, res) => {
  try {
    var sql = "select * from Users";
    // query data from MySQL
    connection.query(sql, function (error, data, fields) {
      if (error) throw error;

      const jsonData = JSON.parse(JSON.stringify(data));
      // console.log("jsonData", jsonData);

      // TODO: export to CSV file
      const xls = json2xls(jsonData);
      fs.writeFileSync('users.xlsx', xls, 'binary', (err) => {
        if (err) throw err;
        console.log('Data written to file');
      });
      const excelFilePath = path.join(__dirname, '../users.xlsx');
      res.sendFile(excelFilePath, (err) => {
        if (err) console.log(err);
      });

    });
  } catch (err) {
    console.log(err);
  }
})
router.get("/reviewerdownload", (req, res) => {
  try {
    var sql = "select * from Reviewers";
    // query data from MySQL
    connection.query(sql, function (error, data, fields) {
      if (error) throw error;

      const jsonData = JSON.parse(JSON.stringify(data));
      // console.log("jsonData", jsonData);

      // TODO: export to CSV file
      const xls = json2xls(jsonData);
      fs.writeFileSync('reviewers.xlsx', xls, 'binary', (err) => {
        if (err) throw err;
        console.log('Data written to file');
      });
      const excelFilePath = path.join(__dirname, '../reviewers.xlsx');
      res.sendFile(excelFilePath, (err) => {
        if (err) console.log(err);
      });

    });
  } catch (err) {
    console.log(err);
  }
})
module.exports = router;