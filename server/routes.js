const router = require("express").Router();

const{
    test,
    signin,
    newAccount,
    deleteAccount,
    addData
}=require("./handlers");

router.get("/api/test", test);
router.post("/api/signin",signin);

router.post("/api/newAccount", newAccount)
router.delete("/api/deleteAccount/:username", deleteAccount)

router.post("/api/addData/:user/:year/:month", addData)

module.exports = router;