import { ProductDao } from "../dao/product.dao";
import type { IProduct } from "../models/product.model";

export class ProductService {
    private static instance: ProductService;
    private productDao: ProductDao;

    private constructor() {
        this.productDao = ProductDao.getInstance();
    }

    public static getInstance(): ProductService {
        if (!this.instance) {
            this.instance = new ProductService();
        }
        return this.instance;
    }

    public async getAllActiveProducts(): Promise<IProduct[]> {
        try {
            return await this.productDao.getAllActiveProducts();
        } catch (error) {
            throw error;
        }
    }

    public async createProduct(
        productData: Partial<IProduct>
    ): Promise<IProduct | null> {
        try {
            return await this.productDao.createProduct(productData);
        } catch (error) {
            throw error;
        }
    }

    public async getProductById(id: string): Promise<IProduct | null> {
        try {
            return await this.productDao.findProductById(id);
        } catch (error) {
            throw error;
        }
    }

    public async getAllProductsList(): Promise<IProduct[]> {
        try {
            return await this.productDao.getAllProducts();
        } catch (error) {
            throw error;
        }
    }

    public async updateProduct(
        productId: string,
        productData: Partial<IProduct>
    ): Promise<IProduct | null> {
        try {
            return await this.productDao.updateProduct(productId, productData);
        } catch (error) {
            throw error;
        }
    }

    public async deactivateProduct(productId: string): Promise<IProduct | null> {
        try {
            return await this.productDao.deactivateProduct(productId);
        } catch (error) {
            throw error;
        }
    }
}
