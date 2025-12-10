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
      
      if (!productData.name || !productData.price) {
        return res.status(400).json({ 
          message: 'Missing required fields: name and price are required' 
        });
      }
      
      const product = await this.productService.createProduct(productData);
      
      if (!product) {
        return res.status(400).json({
          message: 'Product not created'
        });
      }
      
      return res.status(201).json({ 
        message: 'Product created successfully',
        data: product
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key error')) {
        return res.status(400).json({
          message: `Duplicate data: ${(error as any)?.errorResponse?.keyValue?.name}`,
          error: error instanceof Error ? error.message : 'Unable to create product'
        });
      }
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unable to create product'
      });
    }
  };

  getProduct = async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      const product = await this.productService.getProductById(String(productId));

      if (!product) {
        return res.status(404).json({ 
          message: 'Product not found' 
        });
      }

      return res.status(200).json({ 
        message: 'Product fetched successfully',
        data: product
      });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unable to fetch product'
      });
    }
  };

  getAllProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.getAllProductsList();
      return res.status(200).json({ 
        message: 'Products fetched successfully',
        data: products
      });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unable to fetch products'
      });
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      const productData = req.body;
      const product = await this.productService.updateProduct(
        String(productId),
        productData
      );

      if (!product) {
        return res.status(404).json({ 
          message: 'Product not found' 
        });
      }

      return res.status(200).json({ 
        message: 'Product updated successfully',
        data: product
      });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unable to update product'
      });
    }
  };

  deactivateProduct = async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      console.log("Deactivating product with ID: ", productId);
      const product = await this.productService.deactivateProduct(productId);

      if (!product) {
        return res.status(404).json({ 
          message: 'Product not found' 
        });
      }

      return res.status(200).json({ 
        message: 'Product deactivated successfully'
      });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unable to deactivate product'
      });
    }
  };
}
