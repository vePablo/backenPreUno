import CartService from './cart.services.js';
import TicketService from './ticket.services.js';
import UserService from './user.services.js';
import ProductService from './product.services.js';

class PurchaseService {
  async processPurchase(cartId, userEmail) {
    // 1. Obtener el carrito y popular
    const cart = await CartService.getCartById(cartId).populate('products.product');
    if (!cart) throw new Error('Carrito no encontrado');

    // 2. Verificar stock
    const { productsWithoutStock, productsWithStock } = this.verifyStock(cart);

    if (productsWithoutStock.length > 0) {
      // 3. Manejar productos sin stock
      await CartService.updateCart(cartId, { products: productsWithStock });
      return { error: 'Stock insuficiente para algunos productos', productsWithoutStock };
    }

    // 4. Calcular el total de la compra
    const totalAmount = CartService.calculateCartTotal(cart);
    console.log('totalAmount', totalAmount); 

    // 5. Actualizar el stock de los productos
    console.log('product stock', cart.products);
    await ProductService.updateStock(cart.products);

    // 6. Crear el ticket
    const user = await UserService.getUserByEmail(userEmail);
    if (!user) throw new Error('Usuario no encontrado');

    const ticket = await TicketService.createTicket(cart, user._id, totalAmount);  // user._id es el ID del usuario

    // 7. Limpiar el carrito
    await CartService.clearCart(cartId);

    return { ticket };
  }

  verifyStock(cart) {
    const productsWithoutStock = [];
    const productsWithStock = [];

    cart.products.forEach(item => {
      if (item.product.stock < item.quantity) {
        productsWithoutStock.push(item.product._id);
      } else {
        productsWithStock.push(item);
      }
    });

    return { productsWithoutStock, productsWithStock };
  }
}

export default new PurchaseService();
