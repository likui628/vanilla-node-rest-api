const http = require("http");
const {
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProduct,
} = require("./controllers/productController");

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  } else if (req.url.match(/\/api\/products\/\w+/)) {
    const id = req.url.split("/")[3];
    if (req.method === "GET") {
      getProduct(req, res, id);
    } else if (req.method === "PUT") {
      updateProduct(req, res, id);
    } else if (req.method === "DELETE") {
      deleteProduct(req, res, id);
    }
  } else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res);
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
