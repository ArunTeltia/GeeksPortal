const authCheck = (req, res, next) => {
  try {
    if (!req.user) {
      res.redirect("/auth/login");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = authCheck;
