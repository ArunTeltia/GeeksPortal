const router = require("express").Router();
const connection = require("../config/DBconnection");
const db = require("../config/makeDB");

// router.get("/",(req, res) => {
//     var t = "All Articles";
//     var sql =
//       "select A.Id as Id, A.Type as Type, A.Lang as Lang,A.Level as Level , A.Head as Head, A.Blog as Blog, GROUP_CONCAT(T.Title) as Title From AllArticles A Left Join ItemTags I on A.Id = I.ArticleId Left Join Tags T On T.TagId = I.TagId where A.Status = 'Accepted'  GROUP BY A.Id,A.Lang,A.Level,A.Blog,A.Head;";
//     connection.query(sql, (err, results, fields) => {
//       if (err) {
//         res.render("404");
//         return console.error(err.message);
//       }
//       ar = results;

//       if (req.user) {
//         res.render("homearticle", {
//           posts: ar,
//           head: "All Articles",
//           photo: req.user.Photo,
//           user: req.user,
//         });
//       } else {
//         res.render("homearticle", {
//           posts: ar,
//           head: t,
//           photo: "#",
//           user: req.user,
//         });
//       }
//     });
//   });
router.get("/",(req, res) => {
  var t = "All Articles";
  const limit = 1;
  const page = +req.query.page || 1;
  const offset = (page - 1) * limit;
  let totalArticles=0;

  var sql="select count(*) as count from `AllArticles` where Status='ACCEPTED';"
  connection.query(sql, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    totalArticles=results[0].count; 
    // console.log(totalArticles);
  });


  var sql =
    "select A.Id as Id, A.Type as Type, A.Lang as Lang,A.Level as Level , A.Head as Head, A.Blog as Blog, GROUP_CONCAT(T.Title) as Title From AllArticles A Left Join ItemTags I on A.Id = I.ArticleId Left Join Tags T On T.TagId = I.TagId where A.Status = 'Accepted'  GROUP BY A.Id,A.Lang,A.Level,A.Blog,A.Head limit "+limit+" OFFSET "+offset+";";
  connection.query(sql, (err, results, fields) => {
    if (err) {
      res.render("404");
      return console.error(err.message);
    }
    ar = results;

    if (req.user) {
      res.render("homearticle", {
        posts: ar,
        head: t,
        photo: req.user.Photo,
        user: req.user,
        currentPage:page,
        hasNextPage:limit*page<totalArticles,
        hasPreviousPage:page>1,
        nextPage:page+1,
        previousPage:page-1,
        lastPage:Math.ceil(totalArticles/limit)
      });
    } else {
      res.render("homearticle", {
        posts: ar,
        head: t,
        photo: "#",
        user: req.user,
        currentPage:page,
        hasNextPage:limit*page<totalArticles,
        hasPreviousPage:page>1,
        nextPage:page+1,
        previousPage:page-1,
        lastPage:Math.ceil(totalArticles/limit)
      });
    }
  });
});
  router.post("/",(req, res) => {
    const limit = 1;
    const page = +req.query.page || 1;
    const offset = (page - 1) * limit;
    let totalArticles=1;
    var t = "All Articles";

    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj);
    // var sql="select count(*) as count From AllArticles A Left Join ItemTags I on A.Id = I.ArticleId Left Join Tags T On T.TagId = I.TagId where A.Status = 'Accepted' and A.Head='" +
    // obj.search +
    // "'GROUP BY A.Id,A.Lang,A.Level,A.Blog,A.Head;"
    // connection.query(sql, (err, results, fields) => {
    //   if (err) {
    //     return console.error(err.message);
    //   }
    //   totalArticles=results[0].count; 
    //   // console.log(totalArticles);
    // });
    var sql =
      "select A.Id as Id,A.Type as Type, A.Lang as Lang,A.Level as Level , A.Head as Head, A.Blog as Blog, GROUP_CONCAT(T.Title) as Title From AllArticles A Left Join ItemTags I on A.Id = I.ArticleId Left Join Tags T On T.TagId = I.TagId where A.Status = 'Accepted' and A.Head='" +
      obj.search +
      "'GROUP BY A.Id,A.Lang,A.Level,A.Blog,A.Head;";
    connection.query(sql, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      ar = results;
      console.log(ar);

      if (req.user) {
        res.render("homearticle", {
          posts: ar,
          head: t,
          photo: req.user.Photo,
          user: req.user,
          currentPage:page,
        hasNextPage:limit*page<totalArticles,
        hasPreviousPage:page>1,
        nextPage:page+1,
        previousPage:page-1,
        lastPage:Math.ceil(totalArticles/limit)
        });
      } else {
        res.render("homearticle", {
          posts: ar,
          head: t,
          photo: "#",
          user: req.user,
          currentPage:page,
        hasNextPage:limit*page<totalArticles,
        hasPreviousPage:page>1,
        nextPage:page+1,
        previousPage:page-1,
        lastPage:Math.ceil(totalArticles/limit)
        });
      }
    });
  });

// router.get("/type/:type", (req, res) => {
//   var t = req.params.type;
//   var sql =
//     "select A.Id as Id,A.Type as Type, A.Lang as Lang,A.Level as Level , A.Head as Head, A.Blog as Blog, GROUP_CONCAT(T.Title) as Title From AllArticles A Left Join ItemTags I on A.Id = I.ArticleId Left Join Tags T On T.TagId = I.TagId where A.Status = 'Accepted' and A.Type='" +
//     req.params.type +
//     "'GROUP BY A.Id,A.Lang,A.Level,A.Blog,A.Head;";
//   connection.query(sql, (err, results, fields) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     ar = results;
//     console.log(ar);

//     console.log(t);

//     if (req.user) {
//       res.render("homearticle", {
//         posts: ar,
//         head: t,
//         photo: req.user.Photo,
//         user: req.user,
//       });
//     } else {
//       res.render("homearticle", {
//         posts: ar,
//         head: t,
//         photo: "#",
//         user: req.user,
//       });
//     }
//   });
// });

router.get("/tag/:title", (req, res) => {
  const limit = 1;
  const page = +req.query.page || 1;
  const offset = (page - 1) * limit;
  let totalArticles=0;

  var sql="select count(*) as count from (select A.Id as Id, A.Lang as Lang,A.Level as Level , A.Head as Head, A.Blog as Blog From Tags T Left Join  ItemTags I on T.TagId=I.TagId Left Join AllArticles A on I.ArticleId = A.Id where T.Title ='" +
  req.params.title +
  "' and A.Status='Accepted'  group by A.Id,A.Lang,A.Level,A.Blog,A.Head ) AA left join (select A.Id as Id, GROUP_CONCAT(T.Title) as Title From AllArticles A Left Join ItemTags I on A.Id = I.ArticleId Left Join Tags T On T.TagId = I.TagId where A.Status = 'Accepted'  GROUP BY A.Id,A.Lang,A.Level,A.Blog,A.Head) as BB on AA.Id = BB.Id;";
  connection.query(sql, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    totalArticles=results[0].count; 
    // console.log(totalArticles);
  });
  var sql =
    "select * from (select A.Id as Id, A.Lang as Lang,A.Level as Level , A.Head as Head, A.Blog as Blog From Tags T Left Join  ItemTags I on T.TagId=I.TagId Left Join AllArticles A on I.ArticleId = A.Id where T.Title ='" +
    req.params.title +
    "' and A.Status='Accepted'  group by A.Id,A.Lang,A.Level,A.Blog,A.Head ) AA left join (select A.Id as Id, GROUP_CONCAT(T.Title) as Title From AllArticles A Left Join ItemTags I on A.Id = I.ArticleId Left Join Tags T On T.TagId = I.TagId where A.Status = 'Accepted'  GROUP BY A.Id,A.Lang,A.Level,A.Blog,A.Head) as BB on AA.Id = BB.Id limit "+limit+" OFFSET "+offset+";";
  connection.query(sql, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(results);
    if (req.user) {
      res.render("homearticle", {
        posts: results,
        head: "All Articles",
        photo: req.user.Photo,
        user: req.user,
        currentPage:page,
        hasNextPage:limit*page<totalArticles,
        hasPreviousPage:page>1,
        nextPage:page+1,
        previousPage:page-1,
        lastPage:Math.ceil(totalArticles/limit)
      });
    } else {
      res.render("homearticle", {
        posts: results,
        head: "All Articles",
        photo: "#",
        user: req.user,
        currentPage:page,
        hasNextPage:limit*page<totalArticles,
        hasPreviousPage:page>1,
        nextPage:page+1,
        previousPage:page-1,
        lastPage:Math.ceil(totalArticles/limit)
      });
    }
  });
});

// router.get("/Level/:level", (req, res) => {
//   var sql =
//     "select A.Id as Id,A.Type as Type, A.Lang as Lang,A.Level as Level , A.Head as Head, A.Blog as Blog, GROUP_CONCAT(T.Title) as Title From AllArticles A Left Join ItemTags I on A.Id = I.ArticleId Left Join Tags T On T.TagId = I.TagId where A.Status = 'Accepted' and A.Level='" +
//     req.params.level +
//     "'GROUP BY A.Id,A.Lang,A.Level,A.Blog,A.Head;";
//   connection.query(sql, (err, results, fields) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     ar = results;
//     console.log(ar);

//     res.render("homearticle", {
//       posts: ar,
//       head: "All Articles",
//       photo: req.user.Photo,
//       user: req.user,
//     });
//   });
// });

router.get("/:head-:postId", (req, res) => {
  let moreArt = [];
  let Art = [];
  async function Render() {
    try {
      const r = await db.query(
        "select A.Id as Id, A.Type as Type, A.Lang as Lang,A.Level as Level , A.Head as Head, A.Blog as Blog,U.UserName as User, GROUP_CONCAT(T.Title) as Title From AllArticles A Left Join ItemTags I on A.Id = I.ArticleId Left Join Tags T On T.TagId = I.TagId Left join Users U on A.UserId=U.ID where A.Status = 'Accepted' and A.Id='" +
          req.params.postId +
          "' GROUP BY A.Id,A.Lang,A.Level,A.Blog,A.Head"
      );
      Art = r;

      console.log(Art);

      let t = Art[0].Title.split(",");

      console.log(t);

      await Promise.all(
        t.map(async (ele) => {
          var MoreArtForTitle = await db.query(
            "select * from (select A.Id as Id, A.Lang as Lang,A.Level as Level , A.Head as Head, A.Blog as Blog From Tags T Left Join  ItemTags I on T.TagId=I.TagId Left Join AllArticles A on I.ArticleId = A.Id where T.Title ='" + ele + "' and A.Status='Accepted'  group by A.Id,A.Lang,A.Level,A.Blog,A.Head ) AA left join (select A.Id as Id, GROUP_CONCAT(T.Title) as Title From AllArticles A Left Join ItemTags I on A.Id = I.ArticleId Left Join Tags T On T.TagId = I.TagId where A.Status = 'Accepted'   GROUP BY A.Id,A.Lang,A.Level,A.Blog,A.Head) as BB on AA.Id = BB.Id;"
          );
          moreArt = [...MoreArtForTitle];
           console.log(moreArt);
        })
      );
      //  console.log(moreArt);
      return moreArt;
    } catch (err) {
      console.log(err);
    }
  }
  Render().then((result) => {
    // console.log("===============")
    // console.log(Art);
    if(result.length!==0)
    result = result.filter((r) => r.Head !== Art[0].Head);
    // console.log(result);

    if (req.user) {
      res.render("homePost", {
        posts: Art,
        head: "All Articles",
        photo: req.user.Photo,
        user: req.user,
        MoreArticles: result,
      });
    } else {
      res.render("homePost", {
        posts: Art,
        head: "All Articles",
        photo: "#",
        user: req.user,
        MoreArticles: result,
      });
    }
  });
});

router
  .route("/request/article")
  .get((req, res) => {
    let sql = "select * from RequestedArticles ";
    connection.query(sql, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      // console.log(results);
      res.render("requestArticle", { titles: results });
    });
  })
  .post((req, res) => {
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj);
    if ((req.body.ReqArticle = "" || req.body.ReqArticle.length < 3)) {
      req.session.message = {
        type: "danger",
        intro: "Invalid Article Name",
        message: "please enter valid Article Name",
      };
    } else {
      let sql =
        "insert into RequestedArticles (Title) values('" +
        obj.ReqArticle +
        "') ";
      connection.query(sql, (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }
        // console.log(results);
      });

      req.session.message = {
        type: "success",
        intro: "Done!",
        message: "Article request Send",
      };
    }

    res.redirect("/home/request/article");
  });


  router.get('/search',function(req,res){
    connection.query('SELECT Head from AllArticles where Status="ACCEPTED" and Head like "%'+req.query.key+'%"', function(err, rows, fields) {
        if (err) throw err;
        var data=[];
        for(i=0;i<rows.length;i++)
          {
            data.push(rows[i].Head);
          }
          res.end(JSON.stringify(data));
      });
    });

module.exports = router;
