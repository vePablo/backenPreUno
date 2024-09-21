import { Router } from 'express';
import { generateMockUsers, getUser, generateMockPets } from '../controllers/mock.controller.js';

const router = Router();

router.post('/generateUsers', generateMockUsers);
router.get('/users', getUser);
router.post('/generatePets', generateMockPets);

export default router;
