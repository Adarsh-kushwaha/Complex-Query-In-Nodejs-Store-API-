const express = require('express');
const router = express.Router()

const { getAllProducts, productsTestRoute } = require("../controller/products");

router.route("/").get(getAllProducts);
router.route("/static").get(productsTestRoute);

module.exports = router;