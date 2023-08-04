const router = require("express").Router();

const{
    home
}=require("./handlers");

router.get("/hello", home);

module.exports = router;