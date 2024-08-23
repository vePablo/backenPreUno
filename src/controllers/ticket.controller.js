import TicketService from '../services/ticket.service.js';

export const createTicket = async (req, res) => {
  try {
    const { cart, userEmail, userId } = req.body;

    // Verificar si se proporciona un email o un ID de usuario
    if (!userEmail && !userId) {
      throw new Error('User email or user ID is required');
    }

    // Obtener el usuario si solo se proporciona el email
    let actualUserId = userId;
    if (userEmail && !userId) {
      const user = await UserDAO.getUserByEmail(userEmail);
      if (!user) {
        throw new Error('User not found');
      }
      actualUserId = user._id;
    }

    // Crear el ticket
    const ticket = await TicketService.createTicket(cart, actualUserId, userEmail);
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