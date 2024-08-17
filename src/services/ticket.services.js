import TicketDAO from '../daos/ticket.dao.js';

class TicketService {
  async createTicket(ticketData) {
    try {
      return await TicketDAO.create(ticketData);
    } catch (error) {
      throw new Error('Error creating ticket: ' + error.message);
    }
  }

  async getTicketById(id) {
    try {
      return await TicketDAO.getById(id);
    } catch (error) {
      throw new Error('Error getting ticket by ID: ' + error.message);
    }
  }

  async updateTicket(id, ticketData) {
    try {
      return await TicketDAO.update(id, ticketData);
    } catch (error) {
      throw new Error('Error updating ticket: ' + error.message);
    }
  }

  async deleteTicket(id) {
    try {
      return await TicketDAO.delete(id);
    } catch (error) {
      throw new Error('Error deleting ticket: ' + error.message);
    }
  }
}

export default new TicketService();
