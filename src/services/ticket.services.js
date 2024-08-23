import TicketDAO from '../daos/ticket.dao.js';
import { v4 as uuidv4 } from 'uuid';

class TicketService {
  static async createTicket(cart, userEmail) {
    const amount = cart.products.reduce(
      (acc, curr) => acc + curr.quantity * curr.product.price,
      0
    );

    const ticketData = {
      code: uuidv4(),
      purchase_datetime: new Date(),
      amount,
      purchaser: userEmail,  // Cambiado de userId a userEmail
      products: cart.products.map(p => ({
        productId: p.product._id,
        quantity: p.quantity,
        price: p.product.price
      }))
    };

    return TicketDAO.create(ticketData);
  }

  static async getTicketById(id) {
    return TicketDAO.getById(id);
  }

  static async updateTicket(id, ticketData) {
    return TicketDAO.update(id, ticketData);
  }

  static async deleteTicket(id) {
    return TicketDAO.delete(id);
  }
}

export default TicketService;