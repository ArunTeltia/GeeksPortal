const route = require("express").Router();
const connection = require("../config/DBconnection");
const db = require("../config/makeDB");


route.post('/post', (req, res) => {
    try{
        if(!req.user){
            res.redirect("/login");
        }else{
            
        }
    }catch(err){
        console.log(err);
    }
})

module.exports = route;