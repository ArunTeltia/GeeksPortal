const router = require("express").Router();
const connection = require("../config/DBconnection");
const db = require("../config/makeDB");

router.get("/form", (req, res) => {
    res.render("InternInfo");
})


router.post("/form", (req, res) => {
    console.log(req.body);
})



module.exports = router;