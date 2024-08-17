import { Router } from 'express';
import { ticketDto } from '../dtos/ticket.dto.js';
import {
  createTicket,
  getTicketById,
  getTickets,
  updateTicket,
  deleteTicket
} from '../controllers/ticket.controller.js';

const router = Router();

router.post('/', (req, res, next) => {
  req.body = new TicketDTO(req.body);
  next();
}, createTicket);

router.get('/:id', getTicketById);
router.get('/', getTickets);
router.put('/:id', (req, res, next) => {
  req.body = new TicketDTO(req.body);
  next();
}, updateTicket);
router.delete('/:id', deleteTicket);

export default router;
