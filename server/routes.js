const router = require("express").Router();

const{
    test,
    signin
}=require("./handlers");

router.get("/api/test", test);
router.get("/api/signin/:username",signin);


module.exports = router;