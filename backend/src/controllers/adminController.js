import { User, Mortgage, Payment } from '../models/index.js';

export const listMortgages = async (req, res) => {
  const mortgages = await Mortgage.findAll({
    include: [
      { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
      { model: Payment, as: 'payments' },
    ],
    order: [['createdAt', 'DESC']],
  });
  return res.json({ mortgages });
};

export const updateMortgage = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, interestRate, pendingAmount, totalAmount, nextPaymentDate, notes } = req.body;

    const mortgage = await Mortgage.findByPk(id);
    if (!mortgage) {
      return res.status(404).json({ message: 'Mortgage not found' });
    }

    if (status) mortgage.status = status;
    if (interestRate !== undefined) mortgage.interestRate = interestRate;
    if (pendingAmount !== undefined) mortgage.pendingAmount = pendingAmount;
    if (totalAmount !== undefined) mortgage.totalAmount = totalAmount;
    if (nextPaymentDate !== undefined) mortgage.nextPaymentDate = nextPaymentDate;
    if (notes !== undefined) mortgage.notes = notes;

    await mortgage.save();

    return res.json({ mortgage });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update mortgage', error: error.message });
  }
};

export const recordPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, paymentDate } = req.body;
    const mortgage = await Mortgage.findByPk(id);
    if (!mortgage) {
      return res.status(404).json({ message: 'Mortgage not found' });
    }

    const payment = await Payment.create({
      mortgageId: mortgage.id,
      amount,
      paymentDate: paymentDate ?? new Date(),
    });

    if (mortgage.pendingAmount !== null && amount !== undefined) {
      mortgage.pendingAmount = Math.max((mortgage.pendingAmount ?? 0) - amount, 0);
      await mortgage.save();
    }

    return res.status(201).json({ payment });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to record payment', error: error.message });
  }
};

export const listUsers = async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role', 'phone', 'income', 'address'] });
  return res.json({ users });
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, phone, income, address } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name !== undefined) user.name = name;
    if (role !== undefined) user.role = role;
    if (phone !== undefined) user.phone = phone;
    if (income !== undefined) user.income = income;
    if (address !== undefined) user.address = address;

    await user.save();

    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};
