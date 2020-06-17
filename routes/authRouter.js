const router = require("express").Router();
const passport = require("passport");
const connection = require("../config/DBconnection");
const Keys = require("../config/keys")

const nodemailer = require('nodemailer')
const sendgridTransport = require("nodemailer-sendgrid-transport");

const smtpTrans = nodemailer.createTransport(sendgridTransport({

  auth: {
    api_key: Keys.sendgridKey
  }
}));

router.get("/login", (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err);
  }
});

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
router.get("/admin/login", (req, res) => {
  try {
    res.render("AdminLogin");
  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/admin/login",
  passport.authenticate("admin-local", {
    successRedirect: "/admin/home",
    failureRedirect: "/auth/admin/login",
  })
);


router.get("/admin/logout", (req, res) => {
  try {
    req.logout();
    res.redirect("/auth/admin/login");
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
    failureRedirect: "/auth/login"
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
            subject: 'Sign Up successfully',
            html: "<h1>You successfully signed UP!!</h1>"
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
    } catch (err) {
      console.log(err);
    }
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"]
  })
);

router.get(
  "/facebook/geeksportal",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/login"
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
            subject: 'Sign Up successfully',
            html: "<h1>You successfully signed UP!!</h1>"
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
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;

// ,{ scope: ['id','first_name','last_name','name','picture'] }

// successRedirect:"/home",