const router = require("express").Router();
const nodemailer = require('nodemailer');
const request = require('request');





router.get("/aboutus", (req, res) => {
  try {
    let photo = "#";
    if (req.user) {
      photo = req.user.Photo
    }
    res.render("aboutUs", {
      photo: photo,
      user: req.user
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/tc", (req, res) => {
  try {
    let photo = "#";
    if (req.user) {
      photo = req.user.Photo
    }
    res.render("tc", {
      photo: photo,
      user: req.user
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/cookie", (req, res) => {
  try {
    let photo = "#";
    if (req.user) {
      photo = req.user.Photo
    }
    res.render("privacyPolicy", {
      photo: photo,
      user: req.user
    });
  } catch (err) {
    console.log(err);
  }
});
router.get("/internships", (req, res) => {
  try {
    let photo = "#";
    if (req.user) {
      photo = req.user.Photo
    }
    res.render("internships", {
      photo: photo,
      user: req.user
    });
  } catch (err) {
    console.log(err);
  }
});


router.route("/contactus")
  .get((req, res) => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  })
  .post((req, res) => {
    try {
      

      if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
      return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
    }
    // console.log(JSON.parse(JSON.stringify(req.body)));
    const {name,email,message}=JSON.parse(JSON.stringify(req.body));
  
    // Put your secret key here.
    var secretKey = "6Lf0e6YZAAAAAIWvSxgV_mMeUCY-p24eh8gCRb_9";
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl,function(error,response,body) {
      body = JSON.parse(body);
      // Success will be true or false depending upon captcha validation.
      if(body.success !== undefined && !body.success) {
        return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
      }
      // console.log(JSON.parse(JSON.stringify(req.body)));
      // console.log(`${email}=====${comment}`)
      // res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
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
        from: email, // This is ignored by Gmail
        to: 'contactgeeksportal@gmail.com',
        subject: 'New message from contact form at geekspotal',
        text: `${name} (${email}) says: ${message}`
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


    });



      // let obj = JSON.parse(JSON.stringify(req.body));
      // console.log(obj);
      
    } catch (err) {
      console.log(err);
    }
  })

module.exports = router;


// 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