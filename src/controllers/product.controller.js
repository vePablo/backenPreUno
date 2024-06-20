import ProductService from '../services/product.services.js';

export const createProduct = async (req, res) => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json({ status: 'success', payload: product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    res.status(200).json({ status: 'success', payload: product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const options = {
      limit: parseInt(limit, 10),
      page: parseInt(page, 10),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
    };
    const filters = query ? { category: query } : {};
    const result = await ProductService.getProducts(filters, options);
    res.status(200).json({ 
      status: 'success', 
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}&limit=${limit}` : null,
      nextLink: result.hasNextPage ? `/products?page=${result.nextPage}&limit=${limit}` : null
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await ProductService.updateProduct(req.params.id, req.body);
    res.status(200).json({ status: 'success', payload: product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await ProductService.deleteProduct(req.params.id);
    res.status(200).json({ status: 'success', message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
