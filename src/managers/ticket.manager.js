import TicketModel from '../models/ticket.models.js';
import { v4 as uuidv4 } from 'uuid';

class TicketManager {
  static async createTicket(cart, userId) {
    const amount = cart.products.reduce(
      (acc, curr) => acc + curr.quantity * curr.product.price,
      0
    );

    const ticket = await TicketModel.create({
      code: uuidv4(),
      purchase_datetime: new Date(),
      amount,
      purchaser: userId,
    });

    return ticket;
  }
}

export default TicketManager;
