import { Product } from "../interfaces";
import ProductService from "../services/ProductService";


class ProductController {
  constructor(private productService: ProductService) {}

  getProducts(): Product[] {
    return this.productService.findAll();
  }
}

export default ProductController;
