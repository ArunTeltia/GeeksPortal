const router = require("express").Router();
const passport = require("passport");
const connection = require("../config/DBconnection");

const nodemailer = require('nodemailer')
const sendgridTransport=require("nodemailer-sendgrid-transport");

const smtpTrans = nodemailer.createTransport(sendgridTransport({
 
  auth: {
    api_key:"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"
  }
}));

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

router.get("/reviewer/login", (req, res) => {
  res.render("ReviewerLoginForm");
});

router.post(
  "/reviewer/login",
  passport.authenticate("local", {
    successRedirect: "/articles/Article",
    failureRedirect: "/auth/reviewer/login",
  })
);

router.get("/reviewer/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/reviewer/login");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/geeksportal",
  passport.authenticate("google", { failureRedirect: "/auth/login" }),
  (req, res) => {
    // console.log(req.user);
    var sql = "select UserName from Users where ID='" + req.user.ID +"' ";
    connection.query(sql, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      // console.log(results);
      if (results[0].UserName === null) {

          res.redirect("/profile");
        const mailOpts = {
          to: req.user.Email,
          from:"contactgeeksportal@gmail.com",
          subject: 'Sign Up successfully',
          html:"<h1>You successfully signed UP!!</h1>"
        }

        smtpTrans.sendMail(mailOpts, (error, response) => {
          if (error) {
            console.log(error);
             // Show a page indicating failure
          }
        })
      } else {
        res.redirect("/home");
      }
    });
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/geeksportal",
  passport.authenticate("facebook", { failureRedirect: "/auth/login" }),
  (req, res) => {
    // console.log(req.user);
    var sql = "select UserName from Users where ID='" + req.user.ID +"' ";
    connection.query(sql, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      // console.log(results);
      if (results[0].UserName === null) {
        res.redirect("/profile");
        const mailOpts = {
          to: req.user.Email,
          from:"contactgeeksportal@gmail.com",
          subject: 'Sign Up successfully',
          html:"<h1>You successfully signed UP!!</h1>"
        }

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
  }
);

module.exports = router;

// ,{ scope: ['id','first_name','last_name','name','picture'] }

// successRedirect:"/home",
