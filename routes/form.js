const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

var currentDate = new Date();
var tanggal = currentDate.getDate();
var bulan = currentDate.getMonth() + 1; // Perlu ditambah 1 karena indeks bulan dimulai dari 0
var tahun = currentDate.getFullYear();
const dateNow = `${tanggal}-${bulan}-${tahun}`;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/files");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + dateNow + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.render("form");
});

router.post("/", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send(
    "hai " + req.body.nama + " file " + req.file.filename + " terupload"
  );
});

module.exports = router;
