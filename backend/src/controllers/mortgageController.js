import { Mortgage, Payment } from '../models/index.js';

export const createMortgage = async (req, res) => {
  try {
    const { amount, termMonths, income, notes } = req.body;
    if (!amount || !termMonths) {
      return res.status(400).json({ message: 'Amount and term are required' });
    }

    const mortgage = await Mortgage.create({
      userId: req.session.user.id,
      amount,
      termMonths,
      income: income ?? req.session.user.income ?? null,
      notes,
      status: 'pending',
    });

    return res.status(201).json({ mortgage });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to submit mortgage request', error: error.message });
  }
};

export const getMyMortgages = async (req, res) => {
  const mortgages = await Mortgage.findAll({
    where: { userId: req.session.user.id },
    include: [{ model: Payment, as: 'payments' }],
    order: [['createdAt', 'DESC']],
  });
  return res.json({ mortgages });
};
