const router = require("express").Router();
const nodemailer = require('nodemailer')

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