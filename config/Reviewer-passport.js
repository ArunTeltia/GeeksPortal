const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./DBconnection");

passport.serializeUser((user, done) => {
  done(null, user.ID);
});

passport.deserializeUser((ID, done) => {
  var sql = "select * from Reviewers where ID=" + ID;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    done(null, results[0]);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      connection.query(
        "SELECT * FROM `Reviewers` WHERE `email` = '" + email + "'",
        function (err, rows) {
          if (err) return done(err);

          if (!rows.length) {
            return done(
              null,
              false,
              (req.session.message = {
                type: "danger",
                intro: "User doesnt exist",
                message: "please enter valid email",
              })
            );
          } else if (!(rows[0].Password == password)) {
            return done(
              null,
              false,
              (req.session.message = {
                type: "danger",
                intro: "Invalid Password",
                message: "please enter correct Password",
              })
            );
          }

          return done(null, rows[0]);
        }
      );
    }
  )
);
