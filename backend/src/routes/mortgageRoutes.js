import { Router } from 'express';
import { createMortgage, getMyMortgages } from '../controllers/mortgageController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = Router();

router.post('/', isAuthenticated, createMortgage);
router.get('/me', isAuthenticated, getMyMortgages);

export default router;
