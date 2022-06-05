const express = require("express");
const app = express();
const cors = require("cors");

app.get("/", (req, res) => {
  res.send("heelo");
});

app.listen(3000, () => console.log("listening on port 3000"));
