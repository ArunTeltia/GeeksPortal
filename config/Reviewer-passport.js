const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./DBconnection");
const bcrypt=require("bcryptjs");

passport.serializeUser((user, done) => {
  if (isUser(user))
    done(null, user.ID);

  else if (isSponsor(user))
    done(null, user.ID);

});

passport.deserializeUser((ID, done) => {
  try {
    var sql = "select * from Reviewers where ID='" + ID + "'";
    connection.query(sql, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      done(null, results[0]);
    });
  } catch (err) {
    console.log(err);
  }
});

passport.use("reviewer-local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
     function (req, email, password, done) {
      try {
        connection.query(
          "SELECT * FROM `Reviewers` WHERE Email='" + email + "'",
          async function (err, rows) {
            if (err) return done(err);

            // console.log(rows);

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
            }

            let isValidPassword= await bcrypt.compare(password,rows[0].Password);

            if (!isValidPassword) {
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
      } catch (err) {
        console.log(err);
      }
    }

  )
);
