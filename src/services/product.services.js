import Product from '../models/product.models.js';

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

  static async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default ProductService;
