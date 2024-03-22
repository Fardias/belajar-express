const express = require("express");
const router = express.Router();

const Produk = require("../models/produk.js");

router.get("/create", (req, res) => {
  res.render("produk/create");
});

// post
router.post("/save", async (req, res) => {
  const rb = req.body;

  console.log("body = ", rb);

  if (!rb.nama_produk || !rb.stock || !rb.price) {
    res.redirect("/produk/create");
  } else {
    try {
      const newProduk = new Produk({
        nama_produk: rb.nama_produk,
        stock: rb.stock,
        price: rb.price,
      });

      await newProduk.save();
      res.redirect("/produk/index");
    } catch (error) {
      console.error(error);
      res.redirect("/produk/create");
    }
  }
});

// index
router.get("/index", (req, res) => {
  Produk.find()
    .then((data) => {
      res.render("produk/index", {
        dataProduk: data,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

// edit
router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  Produk.findById(id)
    .then((data) => {
      res.render("produk/edit", {
        dataProduk: data,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

// update
router.post("/update/:id", (req, res) => {
  const rb = req.body;
  if (!rb.nama_produk || !rb.stock || !rb.price) {
    res.redirect("/produk/edit/" + req.params.id);
  } else {
    try {
      const updateData = {
        nama_produk: rb.nama_produk,
        stock: rb.stock,
        price: rb.price,
      };
      Produk.findByIdAndUpdate(req.params.id, updateData)
        .then(() => {
          res.redirect("/produk/index");
        })
        .catch((err) => {
          res.send(err);
        });
    } catch (error) {
      console.error(error);
      res.redirect("/produk/index");
    }
  }
});

// delete
router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  Produk.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/produk/index");
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
