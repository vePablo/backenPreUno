import Product from '../models/product.models.js';

class ProductDAO {
  async createProduct(data) {
    const product = new Product(data);
    return await product.save();
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async getProducts(query = {}, options = {}) {
    return await Product.paginate(query, options); 
  }

  async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default new ProductDAO();
