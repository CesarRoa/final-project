const router = require("express").Router();

const{
    test,
    signin
}=require("./handlers");

router.get("/api/test", test);
router.post("/api/signin",signin);


module.exports = router;