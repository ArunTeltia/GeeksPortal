const router = require("express").Router();
const connection = require("../config/DBconnection");

router.route("/verify_certificate")
    .get((req, res) => {
        try {
            res.render("certiAuth", {
                details: [],
                input: ""
            });
        } catch (err) {
            console.log(err);
        }
    })
    .post((req, res) => {
        try {
            var obj = JSON.parse(JSON.stringify(req.body));
            // console.log(obj.certiNum.length);
            var sql = "select * from Intern where CertiNum='" + obj.certiNum + "';"
            connection.query(sql, function (err, results) {
                if (err) throw err;

                console.log(results);

                if (obj.certiNum.length !== 8 || !obj.certiNum.match(/^[0-9a-z]+$/) || results.length === 0) {
                    req.session.message = {
                        type: "danger",
                        intro: "Invalid Certificate Number",
                        message: "please enter valid certificate number",
                    };
                    res.redirect("/verify_certificate");
                }
                else {
                    res.render("certiAuth", {
                        details: results[0],
                        input: obj.certiNum.trim()
                    });
                }

            });
        } catch (err) {
            console.log(err);
        }

    });

module.exports = router;