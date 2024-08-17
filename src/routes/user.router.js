import { Router } from 'express';
import { userDto } from '../dtos/user.dto.js';
import {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';

const router = Router();

router.post('/', (req, res, next) => {
  req.body = new UserDTO(req.body);
  next();
}, createUser);

router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmail);
router.put('/:id', (req, res, next) => {
  req.body = new UserDTO(req.body);
  next();
}, updateUser);
router.delete('/:id', deleteUser);

export default router;
