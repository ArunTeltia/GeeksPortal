require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");
const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto");
const http = require("http");
const path = require("path");
const busboy = require("then-busboy");
const fileUpload = require("express-fileupload");
const cookieSession = require("cookie-session");
const passport = require("passport");
// var busboy = require('connect-busboy');

// const session= require('express-session')

const keys = require("./config/keys");
const connection = require("./config/DBconnection");
const authRouter = require("./routes/authRouter");
const passportSetup = require("./config/passport-setup");
const ReviewersPassport = require("./config/Reviewer-passport");
const upload = require("./imageUpload");
// const authCheck = require("./config/authCheck");
// const RauthCheck=require("./config/RauthCheck");
const profileRouter = require("./routes/profileRouter");
const homeRouter = require("./routes/homeRouter");
const ReviewArticlesRouter = require("./routes/ReviewArticlesRouter");
const contributeRouter = require("./routes/contributeRouter");
const adminRouter = require("./routes/adminRouter");
const certiAuthRouter =require("./routes/certiAuthRouter");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//imageUploadroutes///////////////////////////////////
app.get("/files", function (req, res) {
  const images = fs.readdirSync("public/upload");
  var sorted = [];
  for (let item of images) {
    if (
      item.split(".").pop() === "png" ||
      item.split(".").pop() === "jpg" ||
      item.split(".").pop() === "jpeg" ||
      item.split(".").pop() === "svg"
    ) {
      var abc = {
        image: "/upload/" + item,
        folder: "/",
      };
      sorted.push(abc);
    }
  }
  res.send(sorted);
});
//upload image to folder upload
//   app.post('/upload', upload.array('flFileUpload', 12), function (req, res, next) {
//       res.redirect('back')
//   });
//   delete file
//   app.post('/delete_file', function(req, res, next){
//     var url_del = 'public' + req.body.url_del
//     console.log(url_del)
//     if(fs.existsSync(url_del)){
//       fs.unlinkSync(url_del)
//     }
//     res.redirect('back')
//   });
////////////////////////////////////////////////////

// app.use(busboy());

// var HOME_URL = 'http://localhost:3000';
// var IMG_FOLDER = '/UploadImages/';

// /*** image broser for ckeditor ***/
// app.all('/browse_url', function (req, res) {
// 	var data = {};
// 	var dirname = process.cwd() + '/public/' + IMG_FOLDER;
// 	fs.readdir(dirname, function(err, filenames) {
// 		if (err) {
// 			return err;
// 		}
// 		var data = [];
// 		filenames.forEach(function(filename) {
// 			data.push({
// 				"image": HOME_URL + IMG_FOLDER + filename,
// 				"thumb": HOME_URL + IMG_FOLDER + filename,
// 				"folder": "Small"
// 			});
// 		});
// 		//console.log(data);
// 		res.send(data);
// 	});

// });
// app.post('/upload_url', function (req, res) {
// 	var fstream;
// 	var msg = "";
// 	var CKEcallback = req.query.CKEditorFuncNum;
// 	req.pipe(req.busboy);
// 	req.busboy.on('file', function (fieldname, file, filename) {
// 		console.log("Uploading: " + filename);
// 		//console.dir(file);
// 		fstream = fs.createWriteStream(process.cwd() + '/public/' + IMG_FOLDER + filename);
// 		file.pipe(fstream);
// 		fstream.on('close', function () {
// 			//res.redirect('back');
// 			var fileUrl =  process.cwd() + '/public/' + IMG_FOLDER + filename;
// 			fs.chmodSync(fileUrl, 0777);
// 			fileUrl = HOME_URL + IMG_FOLDER + filename;
// 			res.send("<script type='text/javascript'>\
//       (function(){var d=document.domain;while (true){try{var A=window.parent.document.domain;break;}catch(e) {};d=d.replace(/.*?(?:\.|$)/,'');if (d.length==0) break;try{document.domain=d;}catch (e){break;}}})();\
//       window.parent.CKEDITOR.tools.callFunction('" + CKEcallback + "','" + fileUrl + "', '" +  msg + "');\
//       </script>");

// 		});

// 	});
// });

// app.get("/e2",(req,res)=>{
//     res.render("E2");
// });

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    // keys: [keys.session.cookieKey]
    keys: [process.env.COOKIE_KEY],
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected");
});

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/reviewer", (req, res) => {
  res.redirect("/auth/reviewer/login");
});

app.use("/auth", authRouter);

app.use("/profile", profileRouter);

app.use("/home", homeRouter);

app.use("/", ReviewArticlesRouter);

app.use("/",certiAuthRouter);

app.use("/compose", contributeRouter);

app.use("/admin", adminRouter);

app.use("/", (req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
