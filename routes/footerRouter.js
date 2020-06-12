const router = require("express").Router();
const nodemailer = require('nodemailer')




router.get("/aboutus",(req,res)=>{
  let photo="#";
    if(req.user){
      photo=req.user.Photo
    }
    res.render("aboutUs",{
      photo: photo,
        user: req.user
    });
  });
  
  router.get("/tc",(req,res)=>{
    let photo="#";
    if(req.user){
      photo=req.user.Photo
    }
    res.render("tc",{
      photo: photo,
        user: req.user
    });
  });
  
  router.get("/cookie",(req,res)=>{
    let photo="#";
    if(req.user){
      photo=req.user.Photo
    }
    res.render("privacyPolicy",{
      photo: photo,
        user: req.user
    });
  });
  router.get("/internships",(req,res)=>{
    let photo="#";
    if(req.user){
      photo=req.user.Photo
    }
    res.render("internships",{
      photo: photo,
        user: req.user
    });
  });


router.route("/contactus")
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
    let obj=JSON.parse(JSON.stringify(req.body));
    console.log(obj);
    const smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'contactgeeksportal@gmail.com',
          pass: '9318572416'
        }
      })

      const mailOpts = {
        from: obj.email, // This is ignored by Gmail
        to: 'contactgeeksportal@gmail.com',
        subject: 'New message from contact form at geekspotal',
        text: `${obj.name} (${obj.email}) says: ${obj.message}`
      }

      smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
          console.log(error);
           // Show a page indicating failure
        }
        else {
        //   res.render('contact-success') // Show a page indicating success
        res.redirect("/contactus");
        }
      })
})

module.exports=router;


// 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