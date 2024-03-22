let express = require("express");
let app = express();
const session = require("express-session");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

const authMw = require("./middlewares/auth.js");
app.use("/admin", authMw);

app.set("view engine", "pug");
app.set("views", "./views");




// static files
app.use(express.static("public"));
app.use("/static", express.static("public"));

// render image
app.get("/image", (req, res) => {
  res.render("image");
});

// render pdf
app.get("/pdf", (req, res) => {
  res.render("pdf");
});

// midleware
var currentDate = new Date();

// Mendapatkan tanggal, bulan, dan tahun dari objek Date
var tanggal = currentDate.getDate();
var bulan = currentDate.getMonth() + 1; // Perlu ditambah 1 karena indeks bulan dimulai dari 0
var tahun = currentDate.getFullYear();
let timeLOgger = function (req, res, next) {
  console.log(`Req baru pada : ${tanggal}/${bulan}/${tahun}`);
  next();
};
app.use(timeLOgger);

let mw = require("./middlewares/my-middleware.js");
app.use(mw({ name: "Diass", address: "Tangerang" }));
app.get("/user", (req, res) => {
  res.send(` Hello ${req.userName} from ${req.userAddress}`);
});

app.get("/", (req, res) => {
  res.send("Hello Worldsss!");
});


let member = require("./routes/member.js");
app.use("/member", member);

// pug
app.get("/download", (req, res) => {
  res.render("download", {
    name: "File.pdf",
    url: "http://namaweb.com/download/2",
  });
});

app.get("/views", (req, res) => {
  res.render("views", {
    listChara: ["Clara", "Bailu", "Lynx", "Fu Xuan"],
    user: {
      name: "Diass",
      address: "Tangerang",
    },
  });
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const form = require("./routes/form");
app.use("/form", form);

// konek mongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/db_latihan");

// Registrasi
const auth = require("./routes/auth.js");
app.use(auth);


let produk = require("./routes/produk.js");
app.use("/produk", produk);


// cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.get("/set-cookie", (req, res) => {
  res.cookie("cookie baru", "belajar cookie express.js");
  res.send("Cookie set");
});

// test-cookie
app.get("/test-cookie", (req, res) => {
  res.send(`Cookie: ${JSON.stringify(req.cookies)}`);
});

// clear cookie
app.get("/clear-cookie", (req, res) => {
  res.clearCookie("cookie baru");
  res.send("Cookie clear");
});


app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
