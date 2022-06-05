const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

app.use(cors());

const synths = {
  korg: [
    { name: "Volca FM", type: "poly" },
    { name: "Volca Bass", type: "mono" },
  ],
  arturia: [
    { name: "MicroFreak", type: "poly" },
    { name: "DrumBrute", type: "drum machine" },
    { name: "PolyBrute", type: "poly" },
  ],
  roland: [
    { name: "Juno 60", type: "poly" },
    { name: "TB-303", type: "mono" },
  ],
  unknown: [{ name: "", type: "" }],
};

const types = ["poly", "mono", "drum machine"];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api", (req, res) => {
  res.json(synths);
});

app.get("/api/:brand", (req, res) => {
  let brand = req.params.brand.toLowerCase();
  if (brand in synths) {
    res.json(synths[brand]);
  } else res.json(synths.unknown);
});

app.get("/api/:brand/:type", (req, res) => {
  let brand = req.params.brand.toLowerCase();
  let type = req.params.type.toLowerCase();
  if (brand in synths && types.includes(type)) {
    res.json(synths[brand].filter((synth) => synth.type === type));
  } else {
    res.json(synths.unknown);
  }
});

app.listen(process.env.PORT || PORT, () =>
  console.log("listening on port 3000")
);
