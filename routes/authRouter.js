const router = require("express").Router();
const passport = require("passport");
const connection = require("../config/DBconnection");

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

router.get("/admin/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/admin/login");
});
router.get("/admin/login", (req, res) => {
  res.render("AdminLogin");
});

router.post(
  "/admin/login",
  passport.authenticate("local", {
    successRedirect: "/admin/home",
    failureRedirect: "/auth/admin/login",
  })
);


router.get("/admin/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/admin/login");
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
    // console.log(req.user);
    var sql = "select UserName from Users where ID=" + req.user.ID;
    connection.query(sql, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      // console.log(results);
      if (results[0].UserName === null) {
        res.redirect("/profile");
      } else {
        res.redirect("/home");
      }
    });
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
    // console.log(req.user);
    var sql = "select UserName from Users where ID=" + req.user.ID;
    connection.query(sql, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      // console.log(results);
      if (results[0].UserName === null) {
        res.redirect("/profile");
      } else {
        res.redirect("/home");
      }
    });
  }
);

module.exports = router;

// ,{ scope: ['id','first_name','last_name','name','picture'] }

// successRedirect:"/home",