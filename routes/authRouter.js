const router = require("express").Router();
const passport = require("passport");
const connection = require("../config/DBconnection");
const Keys = require("../config/keys");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
var aws = require("aws-sdk");
const smtpTrans = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: Keys.sendgridKey,
    },
  })
);

router.get("/login", (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err);
  }
});

var email = "contactgeeksportal@gmail.com";

// Load your AWS credentials and try to instantiate the object.
aws.config.update({
  region: "ap-south-1"
});

// Instantiate SES.
var ses = new aws.SES({ "accessKeyId": "AKIAJFLYHQDSTPTEFJOA", "secretAccessKey": "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", "region": "ap-south-1" });
// email-smtp.ap-south-1.amazonaws.com
// Verify email addresses.
router.get("/verify", function (req, res) {
  var params = {
    EmailAddress: email,
  };

  ses.verifyEmailAddress(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// Listing the verified email addresses.
router.get("/list", function (req, res) {
  ses.listVerifiedEmailAddresses(function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// router.get("/delete", function (req, res) {
//   var params = {
//     EmailAddress: email,
//   };

//   ses.deleteVerifiedEmailAddress(params, function (err, data) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(data);
//     }
//   });
// });

router.get("/logout", (req, res) => {
  try {
    req.logout();
    res.redirect("/auth/login");
  } catch (err) {
    console.log(err);
  }
});

router.get("/reviewer/login", (req, res) => {
  try {
    res.render("ReviewerLoginForm");
  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/reviewer/login",
  passport.authenticate("reviewer-local", {
    successRedirect: "/articles/Article",
    failureRedirect: "/auth/reviewer/login",
  })
);

router.get("/reviewer/logout", (req, res) => {
  try {
    req.logout();
    res.redirect("/auth/reviewer/login");
  } catch (err) {
    console.log(err);
  }
});
router.get("/panelforadmin/login", (req, res) => {
  try {
    res.render("AdminLogin");
  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/panelforadmin/login",
  passport.authenticate("admin-local", {
    successRedirect: "/panelforadmin/home",
    failureRedirect: "/auth/panelforadmin/login",
  })
);

router.get("/panelforadmin/logout", (req, res) => {
  try {
    req.logout();
    res.redirect("/auth/panelforadmin/login");
  } catch (err) {
    console.log(err);
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/geeksportal",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    try {
      // console.log(req.user);
      var sql = "select UserName from Users where ID='" + req.user.ID + "' ";
      connection.query(sql, (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }
        // console.log(results);
        if (results[0].UserName === null) {
          res.redirect("/profile");
          const mailOpts = {
            to: req.user.Email,
            from: "contactgeeksportal@gmail.com",
            subject: "Sign Up successfully",
            html: "<h1>You successfully signed UP!!</h1>",
          };

          smtpTrans.sendMail(mailOpts, (error, response) => {
            if (error) {
              console.log(error);
              // Show a page indicating failure
            }
          });
          var to = [req.user.Email]
          var from = 'contactgeeksportal@gmail.com'
          ses.sendEmail({
            Source: from,
            Destination: { ToAddresses: to },
            Message: {
              Subject: {
                Data: "Sending emails through SES"
              },
              Body: {
                Text: {
                  Data: 'Tou just sign up',
                }
              }
            }
          }
            , function (err, data) {
              if (err) throw err
              console.log('Email sent:');
              console.log(data);
            })

        } else {
          res.redirect("/home");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.get(
  "/facebook/geeksportal",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    try {
      // console.log(req.user);
      var sql = "select UserName from Users where ID='" + req.user.ID + "' ";
      connection.query(sql, (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }
        // console.log(results);
        if (results[0].UserName === null) {
          res.redirect("/profile");
          const mailOpts = {
            to: req.user.Email,
            from: "contactgeeksportal@gmail.com",
            subject: "Sign Up successfully",
            html: "<h1>You successfully signed UP!!</h1>",
          };

          smtpTrans.sendMail(mailOpts, (error, response) => {
            if (error) {
              console.log(error);
              // Show a page indicating failure
            }
          });
        } else {
          res.redirect("/home");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;

// ,{ scope: ['id','first_name','last_name','name','picture'] }

// successRedirect:"/home",
