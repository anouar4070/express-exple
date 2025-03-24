import express, { Request, Response } from "express";
import { generateFakeProducts } from "./utils/fakeData";
import { Product } from "./interfaces";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>Hello Express.js</h1>`);
});

const fakeProductsData = generateFakeProducts();

app.get("/products", (req, res) => {
  //const queryParams = req.query;
  //console.log(queryParams); // { filter: 'title' } //?filter=title
  // ** Filter By, keyof Product
  const filterQuery = req.query.filter as string;

  if (filterQuery) {
    const propertiesToFilter = filterQuery.split(",");

    let filteredProducts = [];

    filteredProducts = fakeProductsData.map((product) => {
      const filteredProduct: any = {};
      propertiesToFilter.forEach((property) => {
        if (product.hasOwnProperty(property as keyof Product)) {
          filteredProduct[property] = product[property as keyof Product];
        }
      });
      return { id: product.id, ...filteredProduct };
    });

    return res.send(filteredProducts);
  }

  return res.send(fakeProductsData);
});
app.get("/products/:id", (req: Request, res: Response) => {
  console.log(req.params); // { id: '242'}
  const productId = +req.params.id; //const productId = parseInt(req.params.id);
  if (isNaN(productId)) {
    res.status(404).send({ message: "Invalid product ID" });
  }

  const findProduct: Product | undefined = fakeProductsData.find(
    (product) => product.id === productId
  );
  if (findProduct) {
    res.send({
      id: productId,
      title: findProduct.title,
      price: findProduct.price,
    });
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

// ** CREATE A NEW PRODUCT

app.post("/products", (req, res) => {
  //console.log(req.body);
  const newProduct = req.body;

fakeProductsData.push({id: fakeProductsData.length + 1, ...newProduct})

  res.status(201).send({ 
    id: fakeProductsData.length + 1,
    title: newProduct.title,
    price: newProduct.price,
    description: newProduct.description,
   });
  
});

const PORT: number = 5000;
app.listen(PORT, () => {
  console.log(`Server running at => http://localhost:${PORT}`);
});
