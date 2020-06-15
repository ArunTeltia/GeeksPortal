const router = require("express").Router();
const connection = require("../config/DBconnection");
const RauthCheck = require("../config/RauthCheck");

const shortid = require('shortid');


let ar = [];
router.get("/articles/:type", RauthCheck, (req, res, next) => {
  let t = req.params.type;

  if (req.user.Level === 0) {
    console.log("0");
    var sql =
      "SELECT * FROM `AllArticles` where Type='" +
      t +
      "' and Status='PENDING'";
    connection.query(sql, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      ar = results;

      res.render("Articles", {
        posts: results,
        theme: t,
      });
    });
  } else {
    console.log("1");
    var sql =
      "SELECT * FROM `AllArticles` where Type='" +
      t +
      "' and Status='PROMOTED'";
    connection.query(sql, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      ar = results;

      res.render("Articles", {
        posts: results,
        theme: t,
      });
    });
  }
});

router.get("/posts/:type-:postName", RauthCheck, (req, res) => {
  const reqPost = req.params.postName;
  const theme = req.params.type;
  ar.forEach((post) => {
    if (post.Head === reqPost) {
      console.log(post);

      res.render("post", {
        Head: post.Head,
        Body: post.Blog,
        Lang: post.Lang,
        Lvl: post.Level,
        type: theme,
        postId: post.Id,
        sol:post.PuzzleSolution,
        ReviewerLevel: req.user.Level,
      });
    }
  });
});

router.get("/edit/:type-:postId", RauthCheck, (req, res) => {
  let t = req.params.type;
  let id = req.params.postId;

  if(t==="Puzzle"){
    var sql =
    "select A.Id as Id,A.Type as Type, A.Lang as Lang,A.Level as Level , A.Head as Head, A.Blog as Blog,A.PuzzleSolution as Solution, GROUP_CONCAT(T.Title) as Title From AllArticles A Left Join ItemTags I on A.Id = I.ArticleId Left Join Tags T On T.TagId = I.TagId where A.Id='" +
    id +
    "'GROUP BY A.Id,A.Lang,A.Level,A.Blog,A.Head;";
  }
  else{
    var sql =
    "select A.Id as Id,A.Type as Type, A.Lang as Lang,A.Level as Level , A.Head as Head, A.Blog as Blog, GROUP_CONCAT(T.Title) as Title From AllArticles A Left Join ItemTags I on A.Id = I.ArticleId Left Join Tags T On T.TagId = I.TagId where A.Id='" +
    id +
    "'GROUP BY A.Id,A.Lang,A.Level,A.Blog,A.Head;";
  }


  connection.query(sql, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(results[0]);
    res.render("EditPost",{post:results[0]});
  });
});

router.post("/edit/:type-:postId", RauthCheck, (req, res) => {
  let t = req.params.type;
  let id = req.params.postId;
  console.log(JSON.parse(JSON.stringify(req.body)));
  let obj = JSON.parse(JSON.stringify(req.body));

  let ArtTags = JSON.parse(obj.tags);
  // console.log(ArtTags);
  var tags = [];
  ArtTags.forEach((e) => {
    tags.push(e.value);
  });

  console.log(tags);

  var tagArray = [];

  var sql = "SELECT Title FROM `Tags`";
  connection.query(sql, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    results.forEach((r) => {
      tagArray.push(r.Title);
    });

    if(t==="Puzzle"){
      var sql =
      "Update `AllArticles` set Level='" +
      obj.level +
      "',Head='" +
      obj.head +
      "',Blog='" +
      obj.blog +
      "',PuzzleSolution='" +
      obj.sol +
      "' where Id='" +
      id +
      "'";
    }
    else{
      var sql =
      "Update `AllArticles` set Lang='" +
      obj.lang +
      "',Level='" +
      obj.level +
      "',Head='" +
      obj.head +
      "',Blog='" +
      obj.blog +
      "' where Id='" +
      id +
      "'";
    }
    
    connection.query(sql, function (err, results) {
      if (err) throw err;

      console.log(results);
    });

    var sql = "DELETE from `ItemTags` where ArticleId='" + id + "'";
    connection.query(sql, function (err, results) {
      if (err) throw err;

      console.log(results);
    });

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
            var ItemTagId=shortid.generate();

            var sql =
              "INSERT INTO `ItemTags`(ID,ArticleId,tagId) VALUES ('" +
              ItemTagId +
              "','" +
              id +
              "','" +
              r.TagId +
              "')";
            connection.query(sql, function (err) {
              if (err) throw err;
            });
          });
        });
      } else {
        var TagId=shortid.generate();

        var sql = "INSERT INTO `Tags` (TagId,Title) VALUES ('" + TagId + "','" + tag + "')";
        connection.query(sql, function (err, result) {
          if (err) throw err;

          var ItemTagId=shortid.generate();

          var sql =
            "INSERT INTO `ItemTags`(ID,ArticleId,tagId) VALUES ('" +
            ItemTagId +
            "','" +
            id +
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
  res.redirect("/articles/Article");
});

router.get("/save/:type-:postId-:Revlevel", RauthCheck, (req, res) => {
  let t = req.params.type;
  let id = req.params.postId;
  let lev = req.user.Level;

  var sql="Insert into ItemReviewers (ArticleId,ReviewerId) values ('" + id + "','" + req.user.ID + "');"
  connection.query(sql, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
  });

  if (lev === 0) {
    console.log("00");

    var sql =
      "UPDATE `AllArticles`set Reviewed='P_TRUE',Status='PROMOTED' where Id='" + id + "'";
    connection.query(sql, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      //   ar=results;
      console.log(results);

      res.redirect("/articles/Article");
    });
  } else {
    var sql =
      "UPDATE `AllArticles`set Reviewed='TRUE',Status='ACCEPTED' where Id='" + id + "'";
    connection.query(sql, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      //   ar=results;
      console.log(results);

      res.redirect("/articles/Article");
    });
  }
});

router.post("/delete/:type-:postId", RauthCheck, (req, res) => {
  let typ = req.params.type;
  let id = req.params.postId;
  let reason=JSON.parse(JSON.stringify(req.body.reason));
  console.log(reason);

  var sql="Insert into ItemReviewers (ArticleId,ReviewerId) values ('" + id + "','" + req.user.ID + "');"
  connection.query(sql, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
  });

  var sql =
    "UPDATE  `AllArticles` set Status='REJECTED' ,Reviewed='TRUE',RejectReason='" + reason + "'  WHERE Id='" + id + "'";
  connection.query(sql, (err, result) => {
    res.redirect("/articles/" + req.params.type);
  });
});

module.exports = router;
