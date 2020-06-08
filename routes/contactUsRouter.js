const router = require("express").Router();

router.route("/")
.get((req,res)=>{
    if (req.user) {
        res.render("contactUs", {
          photo: req.user.Photo,
          user: req.user,
       
        });
      } else {
        res.render("contactUs", {
          photo: "#",
          user: req.user,
        });
      }
})
.post((req,res)=>{
    
})

module.exports=router;