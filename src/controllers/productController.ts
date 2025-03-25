import { ProductsService } from "../services/ProductsServices";

class ProductController {
  constructor(private productService: ProductsService) {}

  getProducts() {
    return this.productService.findAll();
  }
}

export default ProductController;
