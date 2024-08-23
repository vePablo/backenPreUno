import CartService from '../services/cart.services.js';
import TicketService from '../services/ticket.services.js';
import ProductService from '../services/product.services.js';
import OrderService from '../services/order.services.js'; 

export const purchaseCart = async (cartId, userEmail) => {
  try {
    const cart = await CartService.getCartById(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    for (const item of cart.items) {
      const product = await ProductService.getProductById(item.productId);
      if (product.stock < item.quantity) {
        throw new Error(`No hay suficiente stock para el producto ${product.name}`);
      }
    }

    const order = await OrderService.createOrder({
      userId: cart.userId,  // Asumiendo que el carrito tiene un userId asociado
      items: cart.items,
      total: cart.total,
    });

    for (const item of cart.items) {
      await ProductService.updateStock(item.productId, item.quantity);
    }

    await CartService.clearCart(cartId);

    const ticket = await TicketService.createTicket (cart, userEmail);
    return { message: 'Compra realizada con éxito', cart, ticket };
  } catch (error) {
    throw new Error(`Error en la compra: ${error.message}`);
  }
};

export const createCart = async (req, res) => {
  try {
    const cart = await CartService.createCart(req.body);
    res.status(201).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cart = await CartService.getCartById(req.params.id);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getCartByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await CartService.getCartByUserId(userId);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const cart = await CartService.updateCart(req.params.id, req.body);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    await CartService.deleteCart(req.params.id);
    res.status(200).json({ status: 'success', message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const addProductsToCart = async (req, res) => {
  try {
    const products = req.body.products;

    if (!Array.isArray(products)) {
      console.log('Invalid input: Products should be an array');
      throw new Error('Products should be an array');
    }

    console.log('Adding products to cart:', products);

    const cart = await CartService.addProductsToCart(req.params.id, products);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    console.error('Error in addProductsToCart:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};



export const removeProductFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await CartService.removeProductFromCart(req.params.id, productId);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await CartService.clearCart(req.params.id);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
