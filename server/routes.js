const router = require("express").Router();

const{
    signin,
    newAccount,
    deleteAccount,
    authenticateToken,
    verifyToken,
    addHistoryData
}=require("./handlers");

router.post("/api/signin",signin);

router.post("/api/newAccount", newAccount)
router.delete("/api/deleteAccount/:username", deleteAccount)

router.get("/api/verify", authenticateToken, verifyToken)

router.post("/api/addHistory/:username/:year/:month", addHistoryData)

module.exports = router;