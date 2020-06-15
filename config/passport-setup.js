require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
// var LocalStrategy   = require('passport-local').Strategy;
const keys = require("./keys");
const connection = require("./DBconnection");

const shortid = require('shortid');


passport.serializeUser((user, done) => {
  done(null, user.ID);
});

passport.deserializeUser((ID, done) => {
  var sql = "select * from Users where ID='" + ID + "'";
  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log("heyy1")
      return console.error(err.message);
    }
    done(null, results[0]);
  });
  console.log(keys.google);
  console.log(keys.google.clientID);

});

passport.use(
  new GoogleStrategy(
    {
      // clientID:keys.google.clientID,
      clientID: process.env.GOOGLE_CLIENT_ID||keys.google.clientID,
      // clientSecret:keys.google.clientSecret,
      clientSecret: process.env.GOOGLE_CLIENT_SECERT||keys.google.clientSecret,
      callbackURL: "https://geeksportal.org/auth/google/geeksportal" || "http://geeksportal.org/auth/google/geeksportal" || "http://localhost:3000/auth/google/geeksportal",
      //   userProfileURL:"https://www.googleapis.com/oauth/v3/userinfo"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      var sql = "SELECT * from Users where ExtId='" + profile.id + "'";
      connection.query(sql, (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }

        //   console.log(results);

        if (Array.isArray(results) && results.length) {
          console.log("user exists");
          done(null, results[0]);
        } else {
          var UserId = shortid.generate();
          var sql =
            "INSERT into Users (ID,ExtId,DisplayName,Firstname,LastName,Photo,Email) values ('" +
            UserId +
            "','" +
            profile.id +
            "','" +
            profile.displayName +
            "','" +
            profile.name.givenName +
            "','" +
            profile.name.familyName +
            "','" +
            profile.photos[0].value +
            "','" +
            profile.emails[0].value +
            "') ";
          connection.query(sql, function (err) {
            if (err) throw err;

            console.log("new user created");
            var sql =
              "select * from Users where ID='" + UserId + "' ";
            connection.query(sql, (err, results, fields) => {
              if (err) {
                console.log("heyy3")
                return console.error(err.message);
              }
              done(null, results[0]);
            });
          });
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      // clientID:keys.facebook.appID,
      clientID: process.env.FACEBOOK_APP_ID||keys.facebook.clientID,
      // clientSecret: keys.facebook.appSecret,
      clientSecret: process.env.FACEBOOK_APP_SECERT||keys.facebook.clientSecret,
      callbackURL: "https://geeksportal.org/auth/facebook/geeksportal" || "http://geeksportal.org/auth/facebook/geeksportal" || "http://localhost:3000/auth/facebook/geeksportal",
      profileFields: [
        "id",
        "displayName",
        "email",
        "first_name",
        "gender",
        "last_name",
        "picture",
      ],
    },
    (accessToken, refreshToken, profile, done) => {
      // process.nextTick(function(){
      console.log(profile);

      var sql = "SELECT * from Users where ExtId='" + profile.id + "'";
      connection.query(sql, (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }

        console.log(results);

        if (Array.isArray(results) && results.length) {
          console.log("user exists");
          done(null, results[0]);
        } else {
          var UserId = shortid.generate();
          var sql =
            "INSERT into Users (ID,ExtId,DisplayName,Firstname,LastName,Photo,Email) values ('" +
            UserId +
            "','" +
            profile.id +
            "','" +
            profile.displayName +
            "','" +
            profile.name.givenName +
            "','" +
            profile.name.familyName +
            "','" +
            profile.photos[0].value +
            "','" +
            profile.emails[0].value +
            "') ";
          connection.query(sql, function (err) {
            if (err) throw err;

            console.log("new user created");
            var sql =
              "select * from Users where ID='" + UserId + "' ";
            connection.query(sql, (err, results, fields) => {
              if (err) {
                console.log("heyy2")
                return console.error(err.message);
              }
              done(null, results[0]);
            });
          });
        }
      });
    }
  )
);
