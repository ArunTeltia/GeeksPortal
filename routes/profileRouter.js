const profile = require("express").Router();
const http = require("http");
const path = require("path");
const busboy = require("then-busboy");
// const fileUpload = require("express-fileupload");
const authCheck = require("../config/authCheck");
const db = require("../config/makeDB");
const connection = require("../config/DBconnection");

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const sharp = require("sharp");
const fs = require("fs");

profile
  .route("/")
  .get(authCheck, (req, res) => {
    try {
      async function Render() {
        try {
          const r = await db.query(
            "select * from Users where ID='" + req.user.ID + "'"
          );
          return r;
        } catch (err) {
          console.log(err);
        }
        //   finally {
        //       await db.close();
        //     }
      }
      Render().then((results) => {
        res.render("profile", {
          details: results[0],
        });
      });
    } catch (err) {
      console.log(err);
    }
  })
  .post(authCheck, (req, res) => {
    try {
      console.log(req.body);
      console.log(req.file);
      var image = req.file;

      let usr = req.body.usr.trim();
      if (req.body.usr === null || !usr.match(/^[0-9a-z]+$/)) {
        req.session.message = {
          type: "danger",
          intro: "Invalid UserName",
          message: "please enter valid username",
        };
        res.redirect("/profile");
      } else {
        if (image) {
          // var file = req.files.uploaded_image;
          // console.log(file);
          // var img_name = file.name;

          if (
            image.mimetype == "image/jpeg" ||
            image.mimetype == "image/png" ||
            image.mimetype == "image/jp"
          ) {
            // (async () => {
            //   const files = await imagemin(['public/ProfileImages/*.{jpg,png}'], {
            //     plugins: [
            //       imageminJpegtran(),
            //       imageminPngquant({
            //         quality: '65-80'
            //       })
            //     ]
            //   });

            //   console.log(files);
            //   //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
            // })();

            // file.mv("public/ProfileImages/" + file.name, function (err) {
            //   let image = "/ProfileImages/" + file.name;
            //   if (err) return res.status(500).send(err);
            //   (async () => {
            //   const files = await imagemin([image.path], {
            //     destination: "public/ProfileImages",
            //     plugins: [imageminJpegtran({
            //       quality: [0.5, 0.60]
            //     }), imageminPngquant({
            //       quality: [0.5, 0.60]
            //     })]
            //   });
            //   console.log("Images optimized", files);
            // })();
            let compath = path.join(__dirname, '../', 'public', 'Pimages', new Date() + "-" + image.originalname)

            sharp(req.file.path).resize(480, 480).jpeg({
              quality: 20,
              chromaSubsampling: '4:4:4'
            }).toFile(compath, (err, info) => {
              if (err) {
                console.log(err);
              }
              else {
                console.log(info);
                var filePath = req.file.path;
                fs.unlinkSync(filePath);
              }

            });




            const imageUrl = path.join('public', 'Pimages', new Date() + "-" + image.originalname)

            var sql =
              "UPDATE `Users` set Photo='" +
              imageUrl +
              "'  where ID='" +
              req.user.ID +
              "'";

            var query = connection.query(sql, function (err, result) {
              if (err) {
                console.log(err);
              }
              console.log(result);
            });
            // });

          } else {
            req.session.message = {
              type: "danger",
              intro: "Invalid Image format",
              message: "please upload file with '.png','.jpeg','.jpg'",
            };
            res.redirect("/profile");
          }
        }

        async function update() {
          try {
            let f = 0;
            var c1 = await db.query(
              "select ID from Users where UserName='" + req.body.usr.trim() + "'"
            );
            if (c1.length === 0 || c1[0].ID === req.user.ID) {
              f = 1;
              var c2 = await db.query(
                "UPDATE  `Users` set UserName='" +
                usr +
                "' where ID='" + req.user.ID + "'"
              );

              if (req.body.email !== "") {
                var c3 = await db.query(
                  "UPDATE  `Users` set Email='" +
                  req.body.email +
                  "' where ID='" + req.user.ID + "'"
                );
              }
              if (req.body.Name !== "") {
                var c4 = await db.query(
                  "UPDATE  `Users` set DisplayName='" +
                  req.body.Name +
                  "' where ID='" + req.user.ID + "'"
                );
              }
              if (req.body.ins !== "") {
                var c5 = await db.query(
                  "UPDATE  `Users` set Institute='" +
                  req.body.ins +
                  "' where ID='" + req.user.ID + "'"
                );
              }
              if (req.body.cntry !== "") {
                var c7 = await db.query(
                  "UPDATE  `Users` set Country='" +
                  req.body.cntry +
                  "' where ID='" + req.user.ID + "'"
                );
              }
              if (req.body.dob !== "") {
                var c6 = await db.query(
                  "UPDATE  `Users` set DOB='" +
                  req.body.dob +
                  "' where ID='" + req.user.ID + "'"
                );
              }
              if (req.body.phone !== "") {
                if (req.body.phone.length === 10)
                  var c7 = await db.query(
                    "UPDATE  `Users` set PhoneNo='" +
                    req.body.phone +
                    "' where ID='" + req.user.ID + "'"
                  );
                else if (req.body.phone.length !== 10) {
                  f = 2;
                }
              }
            }
            return f;
          } catch (err) {
            console.log(err);
          }
          // finally {
          //     await db.close();
          //   }
        }
        update().then((result) => {
          if (result === 0) {
            req.session.message = {
              type: "danger",
              intro: " UserName already exist",
              message: "please enter different username",
            };
            res.redirect("/profile");
          } else if (result === 1) {
            req.session.message = {
              type: "success",
              intro: " Well Done!",
              message: "Profile updated",
            };
            res.redirect("/profile");
          } else if (result === 2) {
            req.session.message = {
              type: "danger",
              intro: " Invalid Phone Number",
              message: "Please enter Valid Phone Number",
            };
            res.redirect("/profile");
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  });


profile.get("/Status", authCheck, (req, res) => {
  try {
    let usr = [];
    let post;
    async function Render() {
      try {
        const r = await db.query(
          "select * from Users where ID='" + req.user.ID + "'"
        );
        usr = r;
        const r1 = await db.query(
          "select * from AllArticles where UserId='" + req.user.ID + "'"
        );
        post= r1;
        const r2 = await db.query("select UserName from Users where ID='" + req.user.ID + "'");
        console.log(r2);
        let isUserName;
        if(r2[0].UserName!==""){
          isUserName=true
        }else{
          isUserName=false
        }
        console.log(isUserName);
        return isUserName;
        return r2;
      } catch (err) {
        console.log(err);
      }
      
    }
    Render().then((results) => {
      // console.log(results)
      // console.log(usr);
      res.render("ContributionStatus", {
        details: usr[0],
        posts: post,
        isUserName: results
      });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = profile;

//profile-GET request old code

// let sql="select * from Users where ID='" + req.user.ID + "'";
// connection.query(sql, (err, results) => {

//   res.render("profile", {
//     details: results[0],
//     message: null
// });

// });

//Profile-POST request old code

// var sql = "select ID from Users where UserName='" + req.body.usr + "'";
// connection.query(sql, (err, results) => {

//     if (results.length===0 || results[0].ID===req.user.ID) {

//         var sql = "UPDATE  `Users` set UserName='" + req.body.usr + "' where ID="+ req.user.ID;
//         connection.query(sql, (err, result) => {

//             // if(req.body.usr==='' || req.body.usr===" "){
//             //     res.render("profile",{details:req.user,message:"UserName require"})
//             // }

//             if(req.body.email!==''){
//                 var sql = "UPDATE  `Users` set Email='" + req.body.email + "' where ID="+ req.user.ID;
//                 connection.query(sql, (err, result) => {
//                 });

//             }

//             if(req.body.ins!==''){
//                 var sql = "UPDATE  `Users` set Institute='" + req.body.ins + "' where ID="+ req.user.ID;
//                 connection.query(sql, (err, result) => {
//                 });
//             }

//             if(req.body.dob!==''){
//                 var sql = "UPDATE  `Users` set DOB='" + req.body.dob + "' where ID="+ req.user.ID;
//                 connection.query(sql, (err, result) => {
//                 });
//             }

//             if(req.body.phone!=='' && req.body.phone.length==10){
//                 var sql = "UPDATE  `Users` set PhoneNo='" + req.body.phone + "' where ID="+ req.user.ID;
//                 connection.query(sql, (err, result) => {
//                 });
//             }

//           res.redirect("/profile");

//         });
//     } else {
//         res.render("profile", {
//             details: req.user,
//             message: "Username already exist"
//         })
//     }

// });
