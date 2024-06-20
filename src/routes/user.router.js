import { Router } from 'express';
import {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';

const router = Router();

router.post('/', createUser); 
router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmail); 
router.put('/:id', updateUser); 
router.delete('/:id', deleteUser); 

export default router;
