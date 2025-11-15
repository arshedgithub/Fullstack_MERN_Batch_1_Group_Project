import Product, { type IProduct } from '../models/product.model';


export class ProductDao {
    public static instance: ProductDao;

    static getInstance = (): ProductDao => {
        if (!this.instance) {
            this.instance = new ProductDao();
        }
        return this.instance;
    };

    public async createProduct(productData: Partial<IProduct>) {
        try {
            const product = new Product(productData);
            return await product.save();
        } catch (error) {
            console.log("Error", error);
            throw error;
        }
    }
    
    public async findProductById(userId: string) {
        try {
            return await Product.findById(userId);
        } catch (error) {
            console.log("Error", error);
            throw error;
        }
    }

    public async getAllActiveProducts() {
        try {
            return await Product.find({ status: "active" });
        } catch (error) {
            console.log("Error", error);
            throw error;
        }
    }

    public async getAllProducts() {
        try {
            return await Product.find();
        } catch (error) {
            console.log("Error", error);
            throw error;
        }
    }
} 

// model => dao => service => controller => routes