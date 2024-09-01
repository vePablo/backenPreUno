import Product from '../models/product.models.js';
import ProductDAO from '../daos/product.dao.js';

class ProductService {
  static async createProduct(data) {
    const product = new Product(data);
    return await product.save();
  }

  static async getProductById(id) {
    return await Product.findById(id);
  }

  static async getProducts(filters, options) {
    return await Product.paginate(filters, options);
  }

  static async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }
  static async updateStock(products) {
    for (const { productId, quantity } of products) {
      const product = await ProductDAO.getProductById(productId);
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      if (product.stock < quantity) {
        throw new Error(`Not enough stock for product ${product.name}`);
      }
      product.stock -= quantity;
      await ProductDAO.updateProduct(productId, { stock: product.stock });
    }
  }
  
  static async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default ProductService;
