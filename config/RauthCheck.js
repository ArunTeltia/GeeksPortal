const connection = require("./DBconnection");

const loggedIn = (req, res, next) => {
  let sql = "select ID from Reviewers";
  connection.query(sql, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    // console.log(results);
    // console.log(req.user);
    if (req.user) {
      var found = results.find((r) => {
        return r.ID === req.user.ID;
      });
      // console.log(found);
      if (found) {
        next();
      } else {
        res.redirect("/auth/reviewer/login");
      }
    } else {
      res.redirect("/auth/reviewer/login");
    }
  });
};

module.exports = loggedIn;
