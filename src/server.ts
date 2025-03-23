import express, {Request, Response} from 'express'

const app = express();


app.get("/", (req, res) => {
  res.send(`<h1>Hello Express.js</h1>`);
});

const DUMMY_PRODUCTS = [
  {id: 1, name: "Blue T-shirt"},
  {id: 2, name: "Red T-shirt"},
  {id: 3, name: "Black T-shirt"},
]

// ** Endpoints (PRODUCTS)
app.get('/products', (req, res) => {
res.send(DUMMY_PRODUCTS)
});

app.get('/products/:id', (req: Request, res: Response) => {
  console.log(req.params); // { id: '242'}
  const productId = +req.params.id; //const productId = parseInt(req.params.id);
  if(isNaN(productId)) {
    res.status(404).send({message: "Invalid product ID"})
  }
  
  const findProduct = DUMMY_PRODUCTS.find(product => product.id === productId )
  if(findProduct) {
  res.send(findProduct)
} else {
  res.status(404).send({message: "Product not found"})
}

  })


const PORT: number = 5000;

app.listen(PORT, () => {
  console.log(`Server is running at => http://localhost:${PORT}`);
});