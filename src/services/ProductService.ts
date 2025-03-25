import { Product } from "../interfaces";

export default class ProductService {
  constructor(private products: Product[]) {
    this.products = products;
  }

  findAll(): Product[] {
    return this.products;
  }

  filterByQuery(filterQuery?: string) {
    // Filter By, keyof Product

    if (filterQuery) {
      const propertiesToFilter = filterQuery.split(",");

      let filteredProducts = [];

      filteredProducts = this.findAll().map((product) => {
        const filteredProduct: any = {};
        propertiesToFilter.forEach((property) => {
          if (product.hasOwnProperty(property as keyof Product)) {
            filteredProduct[property] = product[property as keyof Product];
          }
        });
        return { id: product.id, ...filteredProduct };
      });

      return filteredProducts;
    }

    return this.findAll();
  }

getProductById(productId: number){
return this.findAll().find(product => product.id === productId);
}

}
