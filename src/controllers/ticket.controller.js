import TicketService from '../services/ticket.services.js';

export const createTicket = async (req, res) => {
  try {
    const ticket = await TicketService.createTicket(req.body);
    res.status(201).json({ status: 'success', payload: ticket });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const ticket = await TicketService.getTicketById(req.params.id);
    res.status(200).json({ status: 'success', payload: ticket });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getTickets = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort } = req.query;
    const options = {
      limit: parseInt(limit, 10),
      page: parseInt(page, 10),
      sort: sort ? { purchase_datetime: sort === 'asc' ? 1 : -1 } : {},
    };
    const result = await TicketService.getTickets({}, options);
    res.status(200).json({ status: 'success', ...result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const ticket = await TicketService.updateTicket(req.params.id, req.body);
    res.status(200).json({ status: 'success', payload: ticket });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    await TicketService.deleteTicket(req.params.id);
    res.status(200).json({ status: 'success', message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
