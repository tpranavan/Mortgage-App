import { User, Mortgage, Payment } from '../models/index.js';

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  income: user.income,
  address: user.address,
});

export const getProfile = async (req, res) => {
  const user = await User.findByPk(req.session.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json({ user: sanitizeUser(user) });
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, phone, income, address } = req.body;
    user.name = name ?? user.name;
    user.phone = phone ?? user.phone;
    user.income = income ?? user.income;
    user.address = address ?? user.address;

    await user.save();

    req.session.user = sanitizeUser(user);

    return res.json({ user: sanitizeUser(user) });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update profile', error: error.message });
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

export const getMortgagePayments = async (req, res) => {
  const { id } = req.params;
  const mortgage = await Mortgage.findOne({
    where: { id, userId: req.session.user.id },
    include: [{ model: Payment, as: 'payments', order: [['paymentDate', 'DESC']] }],
  });

  if (!mortgage) {
    return res.status(404).json({ message: 'Mortgage not found' });
  }

  return res.json({ payments: mortgage.payments });
};
