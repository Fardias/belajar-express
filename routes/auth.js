const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const User = require("../models/user.js");

// register
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res) => {
  const rb = req.body;
  const password = crypto
    .createHmac("sha256", "secret")
    .update(rb.password)
    .digest("hex");

  const newUser = new User({
    name: rb.name,
    email: rb.email,
    password: password,
  });

  newUser
    .save()
    .then((data) => {
      res.redirect("/login");
    })
    .catch((err) => {
      res.send(err);
    });
});

// login
router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", (req, res) => {
  const rb = req.body;
  const password = crypto
    .createHmac("sha256", "secret")
    .update(rb.password)
    .digest("hex");

  if (!rb.email || !rb.password) {
    res.render({ msg: "email dan password harus diisi" }, "auth/login");
  } else {
    User.findOne({ email: rb.email, password: password })
      .then((data) => {
        if (!data) {
          res.render({ msg: "email atau password salah" }, "auth/login");
        } else {
          req.session.user = {
            name: data.name,
            email: data.email,
          };
          console.log(req.session.user);
          res.redirect("/admin");
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }}); 


const authMw = require("../middlewares/auth.js");
router.get("/admin", authMw, (req, res) => {
  res.render("admin/dashboard", {
    user: req.session.user,
  });
});

// logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
