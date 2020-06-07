const router = require("express").Router();
const connection = require("../config/DBconnection");
const {
  check,
  validationResult
} = require("express-validator");
const AauthCheck = require("./config/AauthCheck")
const db = require("../config/makeDB");

router.get("/form",AauthCheck, (req, res) => {
  res.render("InternInfo", {
    errors: []
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.render("InternInfo", {
        errors: errors
        // errors:[]
      });
    }

    // console.log(req.body);
    let obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj);
    var post = {
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

    var qry = "INSERT into Intern SET ?";
    connection.query(qry, post, (err, results, fields) => {
      if (err) throw err;
      console.log(results);
      // alert("Reviewers are added");
    });
  }
);

router.get("/data", (req, res) => {});

module.exports = router;