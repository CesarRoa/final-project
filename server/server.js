const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 8000;

app.use(express.json())
app.use(require("./routes"));

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`);
});