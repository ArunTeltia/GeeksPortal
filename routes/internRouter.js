const router = require("express").Router();
const connection = require("../config/DBconnection");
const {
  check,
  validationResult
} = require("express-validator");
const AauthCheck = require("../config/AauthCheck")
const db = require("../config/makeDB");
const fs = require('fs');
const json2xls = require('json2xls');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

router.get("/form", AauthCheck, (req, res) => {
  res.render("InternInfo", {
    errors: [],
    results: ["", "", "", "", "", "", "", "", "", ""],
  });
});

router.post(
  "/form",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("role", "Please enter the role").not().isEmpty(),
    check("dow", "Enter description of work").not().isEmpty(),
    check("sdate", "Enter starting date").not().isEmpty(),
    check("edate", "Enter ending date").not().isEmpty(),
    check("stipend", "Enter the stipend").notEmpty().isNumeric(),
    check("source", "Enter HiredVia").not().isEmpty(),
    check("certi", "Enter the certificate number of 8 digits").isLength({
      min: 8,
      max: 8,
    }),
    check("institute", "Enter the name of Institute").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        res.render("InternInfo", {
          errors: errors,
          results: ["", "", "", "", "", "", "", "", "", ""]
          // errors:[]

        });
      }
      let obj = JSON.parse(JSON.stringify(req.body));
      const sql12 = "Select * from Intern where Email ='" + obj.email + "'";
      const result3 = await db.query(sql12);
      // console.log(obj);
      console.log(result3)
      var post = {
        // Id: uuidv4(),
        Name: obj.name,
        Email: obj.email,
        Role: obj.role,
        DescriptionOfWork: obj.dow,
        StartDate: obj.sdate,
        EndDate: obj.edate,
        StipendPaid: obj.stipend,
        HiredVia: obj.source,
        CertiNum: obj.certi,
        InstituteName: obj.institute,
      };
      if (result3 === []) {
        console.log(post);
        var qry = "INSERT into Intern SET ?";
        connection.query(qry, post, (err, results, fields) => {
          if (err) throw err;
          // console.log(results);

        });
      } else {
        console.log(obj)
        var qry = "Update `Intern` set Name='" +
          obj.name +
          "',Email='" +
          obj.email +
          "',Role='" +
          obj.role +
          "',DescriptionOfWork='" +
          obj.dow +
          "',StartDate='" +
          obj.sdate +
          "',EndDate='" +
          obj.edate +
          "',StipendPaid='" +
          obj.stipend +
          "',HiredVia='" +
          obj.source +
          "',CertiNum='" +
          obj.certi +
          "',InstituteName='" +
          obj.institute +
          "' where CertiNum='" +
          obj.certi + "'";
        connection.query(qry, (err, results, fields) => {
          if (err) throw err;
          console.log(results);
          // alert("Reviewers are added");
        });
      }

      // console.log(req.body);
      res.redirect("/intern/form")

    } catch (err) {
      console.log(err);
    }
  }
);

router.get("/data", AauthCheck, async (req, res) => {
  try {
    const limit = 5;
    const page = +req.query.page || 1;
    const offset = (page - 1) * limit;
    const internQuery = "select * from Intern limit " + limit + " OFFSET " + offset;
    let totalIntern = 0;
    var sql = "select count(*) as count from Intern"
    const result = await db.query(sql);
    totalIntern = result[0].count;
    console.log(totalIntern);
    const results2 = await db.query(internQuery);

    var internData = [];
    for (let i = 0; i < results2.length; i++) {
      let obj = [];
      obj.push(results2[i].Name);
      obj.push(results2[i].Email);
      obj.push(results2[i].Role);
      obj.push(results2[i].DescriptionOfWork);
      obj.push(results2[i].StartDate);
      obj.push(results2[i].EndDate);
      obj.push(results2[i].StipendPaid);
      obj.push(results2[i].HiredVia);
      obj.push(results2[i].CertiNum);
      obj.push(results2[i].InstituteName);
      internData.push(obj);
    }
    // console.log(internData)
    if (page > Math.ceil(totalIntern / limit)) {
      res.render("404");
    }
    res.render("InternsData", {
      results: internData,
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: limit * page < totalIntern,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(totalIntern / limit)
    })
  } catch (err) {
    console.log(err);
  }

});
router.get("/download", (req, res) => {
  try {
    var sql = "select * from Intern";
    // query data from MySQL
    connection.query(sql, function (error, data, fields) {
      if (error) throw error;

      const jsonData = JSON.parse(JSON.stringify(data));
      // console.log("jsonData", jsonData);

      // TODO: export to CSV file
      const xls = json2xls(jsonData);
      fs.writeFileSync('intern.xlsx', xls, 'binary', (err) => {
        if (err) throw err;
        console.log('Data written to file');
      });
      const excelFilePath = path.join(__dirname, '../sample.xlsx');
      res.sendFile(excelFilePath, (err) => {
        if (err) console.log(err);
      });

    });
  } catch (err) {
    console.log(err);
  }
})
router.get("/update-:internemail", async (req, res) => {
  try {
    const sql = "select * from Intern where Email = '" + req.params.internemail + "'";
    const result = await db.query(sql);
    console.log(result);
    let obj = [];
    obj.push(result[0].Name);
    obj.push(result[0].Email);
    obj.push(result[0].Role);
    obj.push(result[0].DescriptionOfWork);
    obj.push(result[0].StartDate);
    obj.push(result[0].EndDate);
    obj.push(result[0].StipendPaid);
    obj.push(result[0].HiredVia);
    obj.push(result[0].CertiNum);
    obj.push(result[0].InstituteName);
    res.render("InternInfo", {
      errors: [],
      results: obj,
    });
  } catch (err) {
    console.log(err);
  }
})
router.get("/delete-:internemail", async (req, res) => {
  try {
    const sql = "Delete from Intern where Email = '" + req.params.internemail + "'";
    const result = await db.query(sql);
    console.log(result);
    res.redirect('/intern/data');
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;