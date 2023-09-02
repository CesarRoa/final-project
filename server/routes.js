const router = require("express").Router();

const{
    signin,
    newAccount,
    deleteAccount,
    authenticateToken,
    verifyToken,
    addHistoryData,
    updateEntry,
    latestData,
    addEntry,
    deleteEntry
}=require("./handlers");

router.post("/api/signin",signin);

//PENDING
router.post("/api/newAccount", newAccount);
//PENDING
router.delete("/api/deleteAccount/:username", deleteAccount);

router.get("/api/verify", authenticateToken, verifyToken);

router.post("/api/addHistory/:username/:year/:month", addHistoryData);

router.patch("/api/update/:username/:date", authenticateToken, updateEntry);

router.get("/api/getUserData", latestData);

router.post("/api/addEntry/:username/:date", addEntry);

router.delete("/api/delete/:username/:date", authenticateToken, deleteEntry);

module.exports = router;