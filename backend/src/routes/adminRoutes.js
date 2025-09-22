import { Router } from 'express';
import { listMortgages, updateMortgage, listUsers, updateUser, recordPayment } from '../controllers/adminController.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/mortgages', isAuthenticated, isAdmin, listMortgages);
router.put('/mortgages/:id', isAuthenticated, isAdmin, updateMortgage);
router.post('/mortgages/:id/payments', isAuthenticated, isAdmin, recordPayment);
router.get('/users', isAuthenticated, isAdmin, listUsers);
router.put('/users/:id', isAuthenticated, isAdmin, updateUser);

export default router;
