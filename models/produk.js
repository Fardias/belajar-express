const mongoose = require("mongoose");
const produkSchema = mongoose.Schema({
  nama_produk: String,
  stock: Number,
  price: Number,
});
const Produk = mongoose.model("Produk", produkSchema);

module.exports = Produk;
