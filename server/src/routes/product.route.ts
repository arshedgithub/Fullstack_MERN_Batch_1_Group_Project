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
        this.router.get('/products/:id', this.productController.getProductProfile);
        
        // POST api/products - Create new product
        this.router.post('/products', this.productController.createProduct);
    }
}