import express from "express";
import path from "path";
import { generateFakeProducts } from "./utils/fakeData";
import ProductService from "./services/ProductService";
import ProductController from "./controllers/productController";

const app = express();

app.use(express.json());

// Set views directory and engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));


// Static file
app.use(express.static(path.join(__dirname, "public")));




const fakeProductsData = generateFakeProducts();

const productService = new ProductService(fakeProductsData);

const productController = new ProductController(productService);
console.log();

// app.get("/", (req, res) => {
//   res.send(`<h1>Hello Express.js</h1>`);
// });

app.get('/products', (req, res) =>{
  res.render('products')
})

app.get("/api/products", (req, res) => productController.getProducts(req, res));
 
  //const queryParams = req.query;
  //console.log(queryParams); // { filter: 'title' } //?filter=title

app.get("/api/products/:id", (req, res) => productController.getProductById(req, res));
  //console.log(req.params); // { id: '242'}

app.post("/api/products", (req, res) => productController.createProduct(req, res));

app.patch("/api/products/:id", (req, res) => productController.updateProduct(req, res));

app.delete("/api/products/:id", (req, res) => productController.deleteProduct(req, res));

app.get('/', (req, res) =>{
  res.render('index')
})

app.get('*', (req, res) =>{
  res.render('notFound')
})




const PORT: number = 5000;
app.listen(PORT, () => {
  console.log(`Server running at => http://localhost:${PORT}`);
});
