import { type Router } from "express";
import { ProductController } from "../controllers/product.controller";

export default class ProductRoutes {
    private productController: ProductController;

    constructor(private router: Router) {
        this.productController = new ProductController();
        this.configureRoutes();
    }

    private configureRoutes() {
        // GET api/products - Get all active products
        this.router.get('/products', this.productController.getAllProducts);

        // GET api/products/:id - Get product by ID
        this.router.get('/products/:id', this.productController.getProduct);
        
        // POST api/products - Create new product
        this.router.post('/products', this.productController.createProduct);

        // PUT api/products/:id - Update product by ID
        this.router.put('/products/:id', this.productController.updateProduct);

        // DELETE api/products/:id - Deactivate product by ID
        this.router.delete('/products/:id', this.productController.deactivateProduct);
    }
}