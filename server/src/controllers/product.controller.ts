import type { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = ProductService.getInstance();
  }

  createProduct = async (req: Request, res: Response) => {
    try {
      const productData = req.body;
      const product = await this.productService.createProduct(productData);
      
      return res.status(201).json({ 
        product, 
        message: 'Product created successfully' 
      });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Internal server error: ' + error 
      });
    }
  };

  getProductProfile = async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      const product = await this.productService.getProductById(String(productId));

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      return res.status(200).json({ 
        product, 
        message: 'Product profile fetched successfully' 
      });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Internal server error: ' + error 
      });
    }
  };

  getAllProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.getAllProducts();
      return res.status(200).json({ 
        products, 
        message: 'Products fetched successfully' 
      });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Internal server error: ' + error 
      });
    }
  };
}
