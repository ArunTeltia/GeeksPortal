const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./DBconnection");

passport.serializeUser((user, done) => {
    done(null, user.ID);
});

passport.deserializeUser((ID, done) => {
    var sql = "select * from Admin where ID=" + ID;
    connection.query(sql, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(results);
        done(null, results[0]);
    });
});

passport.use(
    new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true,
        },
        function (req, username, password, done) {
            connection.query(
                "SELECT * FROM `Admin` WHERE UserName = '" + username + "'",
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