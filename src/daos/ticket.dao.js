import Ticket from '../models/ticket.models.js';

class TicketDAO {
  async create(ticketData) {
    try {
      const ticket = new Ticket(ticketData);
      return await ticket.save();
    } catch (error) {
      throw new Error('Error creating ticket: ' + error.message);
    }
  }

  async getById(id) {
    try {
      return await Ticket.findById(id);
    } catch (error) {
      throw new Error('Error getting ticket by ID: ' + error.message);
    }
  }

  async update(id, ticketData) {
    try {
      return await Ticket.findByIdAndUpdate(id, ticketData, { new: true });
    } catch (error) {
      throw new Error('Error updating ticket: ' + error.message);
    }
  }

  async delete(id) {
    try {
      return await Ticket.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting ticket: ' + error.message);
    }
  }
}

export default new TicketDAO();
