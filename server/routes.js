const router = require("express").Router();

const{
    test,
    signin,
    newAccount,
    deleteAccount,
    addData,
    loginTest,
    authenticateToken,
    verifyToken
}=require("./handlers");

router.get("/api/test", test);
router.post("/api/signin",signin);

router.post("/api/newAccount", newAccount)
router.delete("/api/deleteAccount/:username", deleteAccount)

router.post("/api/addData/:user/:year/:month", addData)

router.post("/api/login", loginTest)

router.get("/api/verify", authenticateToken, verifyToken)

module.exports = router;