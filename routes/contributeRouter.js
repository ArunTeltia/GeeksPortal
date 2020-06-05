const contribute = require("express").Router();
const connection = require("../config/DBconnection");
const authCheck = require("../config/authCheck");

// var upload_file = require('../froalaEditorFiles/file_upload');
// var upload_image = require('../froalaEditorFiles/image_upload.js');

var ar = [];
var tg = [];

contribute
  .route("/")
  .get(authCheck, (req, res) => {
      res.render("E2", {
        photo: req.user.Photo,
        user: req.user
      });
  
  })
  .post(authCheck, (req, res) => {
    let obj = JSON.parse(JSON.stringify(req.body));

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
          "INSERT INTO AllArticles (Level,Head,Blog,Type,UserId) VALUES ('" +
          obj.level +
          "','" +
          obj.head +
          "','" +
          obj.blog +
          "','" +
          obj.theme +
          "','" +
          req.user.ID+
          "')";
        connection.query(sql, function (err, results) {
          if (err) throw err;

          console.log(results);
          maxId = results.insertId;
        });
      } else {
        var sql =
          "INSERT INTO AllArticles (Lang,Level,Head,Blog,Type,UserId) VALUES ('" + obj.lang + "','" + obj.level + "','" + obj.head + "','" + obj.blog + "','" + obj.theme + "','" + req.user.ID + "')";
        connection.query(sql, function (err, results) {
          if (err) throw err;

          console.log(results);
          maxId = results.insertId;
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

            results.forEach((r) => {
              var sql =
                "INSERT INTO `ItemTags`(ArticleId,tagId) VALUES ('" +
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
          var sql = "INSERT INTO `Tags` (Title) VALUES ('" + tag + "')";
          connection.query(sql, function (err, result) {
            if (err) throw err;

            var sql =
              "INSERT INTO `ItemTags`(ArticleId,tagId) VALUES ('" +
              maxId +
              "','" +
              result.insertId +
              "')";
            connection.query(sql, function (err) {
              if (err) throw err;
            });
          });
        }
      });
    });
    res.redirect("/compose");
  });

  contribute.get('/tags',function(req,res){
    var sql = "SELECT Title FROM `Tags`";
    connection.query(sql, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      var a=results.map(r=>{
        return r.Title;
      })
       
          res.end(JSON.stringify(a));
      });
    });
  
module.exports = contribute;
