import { Router } from 'express';
import { getProfile, updateProfile, getMyMortgages, getMortgagePayments } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = Router();

router.get('/me', isAuthenticated, getProfile);
router.put('/me', isAuthenticated, updateProfile);
router.get('/me/mortgages', isAuthenticated, getMyMortgages);
router.get('/me/mortgages/:id/payments', isAuthenticated, getMortgagePayments);

export default router;
