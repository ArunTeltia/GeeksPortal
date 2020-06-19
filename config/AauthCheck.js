const connection = require("./DBconnection");

const loggedIn = (req, res, next) => {
  try {
    let sql = "select ID from Admin";
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
          res.redirect("/auth/panelforadmin/login");
        }
      } else {
        res.redirect("/auth/panelforadmin/login");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = loggedIn;
