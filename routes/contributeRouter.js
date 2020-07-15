const contribute = require("express").Router();
const connection = require("../config/DBconnection");
const authCheck = require("../config/authCheck");
const db = require("../config/makeDB");

const shortid = require('shortid');
const Keys = require("../config/keys")

const nodemailer = require('nodemailer')
const sendgridTransport = require("nodemailer-sendgrid-transport");


// var upload_file = require('../froalaEditorFiles/file_upload');
// var upload_image = require('../froalaEditorFiles/image_upload.js');

var ar = [];
var tg = [];

const smtpTrans = nodemailer.createTransport(sendgridTransport({

  auth: {
    api_key: Keys.sendgridKey
  }
}));

contribute
  .route("/")
  .get(authCheck, async (req, res) => {
    try {
      // console.log(req.user);
      const sql = "Select UserName from Users where ID = '" + req.user.ID + "'";
      // const sql ="Select UserName from Users";
      const resultss = await db.query(sql);
      console.log(resultss)

      let isUserName;
      console.log(isUserName);
      if (resultss[0].UserName === null) {

        isUserName = false;
      } else {
        // res.redirect('/profile/status');
        isUserName = true;
      }
      // res.redirect('/profile/status');
      console.log(isUserName)
      res.render("E2", {
        photo: req.user.Photo,
        user: req.user,
        isUserName: isUserName
      });
    } catch (err) {
      console.log(err);
    }
  })
  .post(authCheck, (req, res) => {
    try {
      let obj = JSON.parse(JSON.stringify(req.body));
      var ArticleId = shortid.generate();
      console.log(obj);
      let ArtTags = JSON.parse(obj.tags);
      // console.log(ArtTags);
      var tags = [];
      ArtTags.forEach((e) => {
        tags.push(e.value);
      });


      console.log(tags);

      var tagArray = [];
      var IdArray = [];
      var maxId;

      var sql = "SELECT Title FROM `Tags`";
      connection.query(sql, (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }
        results.forEach((r) => {
          tagArray.push(r.Title);
        });

        console.log(tagArray);

        if (obj.theme === "Puzzle") {
          var sql =
            "INSERT INTO AllArticles (Id,Level,Head,Blog,Type,UserId,PuzzleSolution) VALUES ('" +
            ArticleId +
            "','" +
            obj.level +
            "','" +
            obj.head +
            "','" +
            obj.blog +
            "','" +
            obj.theme +
            "','" +
            req.user.ID +
            "','" +
            obj.sol +
            "')";
          connection.query(sql, function (err, results) {
            if (err) throw err;

            console.log(results);
            maxId = results.insertId;
          });
        } else {
          var sql =
            "INSERT INTO AllArticles (Id,Lang,Level,Head,Blog,Type,UserId) VALUES ('" + ArticleId + "','" + obj.lang + "','" + obj.level + "','" + obj.head + "','" + obj.blog + "','" + obj.theme + "','" + req.user.ID + "')";
          connection.query(sql, function (err, results) {
            if (err) throw err;

            console.log(results);
            maxId = ArticleId;
          });
        }

        tags.forEach((tag) => {
          console.log(tag);
          if (tagArray.indexOf(tag) !== -1) {
            console.log("Value exists!");

            var sql = "SELECT TagId FROM `Tags` where Title='" + tag + "'";
            connection.query(sql, (err, results, fields) => {
              if (err) {
                return console.error(err.message);
              }
              var ItemTagId = shortid.generate();
              results.forEach((r) => {
                var sql =
                  "INSERT INTO `ItemTags`(ID,ArticleId,tagId) VALUES ('" +
                  ItemTagId +
                  "','" +
                  maxId +
                  "','" +
                  r.TagId +
                  "')";
                connection.query(sql, function (err) {
                  if (err) throw err;
                });
              });
            });
          } else {
            var TagId = shortid.generate();
            var sql = "INSERT INTO `Tags` (TagId,Title) VALUES ('" + TagId + "','" + tag + "')";
            connection.query(sql, function (err, result) {
              if (err) throw err;

              var ItemTagId = shortid.generate();
              var sql =
                "INSERT INTO `ItemTags`(ID,ArticleId,tagId) VALUES ('" +
                ItemTagId +
                "','" +
                maxId +
                "','" +
                TagId +
                "')";
              connection.query(sql, function (err) {
                if (err) throw err;
              });
            });
          }
        });
      });
      res.redirect("/compose");
      const mailOpts = {
        to: req.user.Email,
        from: "contactgeeksportal@gmail.com",
        subject: 'Your Post submitted successfully',
        html: "<h1>You successfully submiited your post!!</h1>"
      }

      smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
          console.log(error);
        }
      })
    } catch (err) {
      console.log(err);
    }
  });
contribute.get('/tags', function (req, res) {
  try {
    var sql = "SELECT Title FROM `Tags`";
    connection.query(sql, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      var a = results.map(r => {
        return r.Title;
      })

      res.end(JSON.stringify(a));
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = contribute;
