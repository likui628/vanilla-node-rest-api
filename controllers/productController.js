const Product = require("../models/productModel");
const { getPostData } = require("../utils");

async function getProducts(_req, res) {
  try {
    const products = await Product.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(_req, res, id) {
  try {
    const product = await Product.findById(id);
    if (product) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(product));
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct(req, res, id) {
  const product = await Product.findById(id);
  if (!product) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Product Not Found" }));
  }

  const body = await getPostData(req);

  const { name, description, price } = JSON.parse(body);

  const productData = {
    name: name || product.name,
    description: description || product.description,
    price: price || product.price,
  };

  const updatedProduct = await Product.update(id, productData);

  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify(updatedProduct));
}

async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      await Product.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Product ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createProduct(req, res) {
  const body = await getPostData(req);

  const updatedProduct = await Product.create(JSON.parse(body));

  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify(updatedProduct));
}

module.exports = {
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProduct,
};
