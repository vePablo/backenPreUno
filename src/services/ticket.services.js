import TicketDAO from '../daos/ticket.dao.js';
import { v4 as uuidv4 } from 'uuid';

class TicketService {
  static async createTicket(cart, userId, totalAmount) {
    const ticketData = {
      code: uuidv4(),
      purchase_datetime: new Date(),
      amount: totalAmount,
      purchaser: userId,
      products: cart.products.map(p => ({
        product: p.product._id,
        quantity: p.quantity,
        price: p.product.price,
      })),
    };

    return await TicketDAO.create(ticketData);
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