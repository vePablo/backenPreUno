import TicketModel from '../models/ticket.models.js';

class TicketDAO {
  async create(ticketData) {
    try {
      const ticket = new TicketModel(ticketData);
      return await ticket.save();
    } catch (error) {
      throw new Error('Error creating ticket: ' + error.message);
    }
  }

  async getById(id) {
    try {
      return await TicketModel.findById(id);
    } catch (error) {
      throw new Error('Error getting ticket by ID: ' + error.message);
    }
  }

  async update(id, ticketData) {
    try {
      return await TicketModel.findByIdAndUpdate(id, ticketData, { new: true });
    } catch (error) {
      throw new Error('Error updating ticket: ' + error.message);
    }
  }

  async delete(id) {
    try {
      return await TicketModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting ticket: ' + error.message);
    }
  }
}

export default new TicketDAO();
