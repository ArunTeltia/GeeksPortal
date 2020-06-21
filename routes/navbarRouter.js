const router = require("express").Router();

router.get("/Analysis-of-Algo",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("algo", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/searching-sorting",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("search", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/greedy-Algo",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("greedy", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/string-Algo",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("stringAlog", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/backtracking",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("backtracking", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/divide-conquer",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("divideNCon", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/ds",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("ds", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/array",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("array", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/list",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("list", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/stack",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("stack", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/queue",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("queue", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/bt",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("bt", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/c",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("c", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/cpp",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("cpp", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/java",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        es.render("java", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/py",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("py", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/sql",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("sql", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});


router.get("/php",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("php", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/js",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("js", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
    res.render("js");
});

router.get("/campus",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("campus", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/project",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("project", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/place",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("place", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/gnote",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("gnote", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/gcs",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("gcs", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
});

router.get("/gpaper",(req,res)=>{
    try {
        let photo = "#";
        if (req.user) {
          photo = req.user.Photo
        }
        res.render("gpaper", {
          photo: photo,
          user: req.user
        });
      } catch (err) {
        console.log(err);
      }
    
});


module.exports =router;