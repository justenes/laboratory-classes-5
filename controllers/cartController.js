const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = (req, res) => {
  const { name, description, price } = req.body;

    const product = new Product(name, description, parseFloat(price));
  Product.add(product);

  try {
    Cart.add(name);
    res.status(STATUS_CODE.FOUND).redirect("/products/new");
  } catch (error) {
    res.status(STATUS_CODE.NOT_FOUND).send("Product not found");
  }
};

exports.getProductsCount = (req, res) => {
  const count = Cart.getProductsQuantity();
  res.status(STATUS_CODE.OK).json({ count });
};
