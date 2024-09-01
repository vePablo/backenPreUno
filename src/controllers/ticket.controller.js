import TicketService from '../services/ticket.services.js';
import { getUserByEmail } from '../controllers/user.controller.js';

export const createTicket = async (req, res) => {
  try {
    const { cart, userEmail } = req.body;

    // Obtener el usuario por email
    const user = await getUserByEmail(userEmail);
    if (!user) {
      throw new Error('User not found');
    }

    // Crear el ticket usando el ID del usuario
    const ticket = await TicketService.createTicket(cart, user._id, userEmail);
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