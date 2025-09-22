import sequelize from '../config/database.js';
import UserFactory from './User.js';
import MortgageFactory from './Mortgage.js';
import PaymentFactory from './Payment.js';

const User = UserFactory(sequelize);
const Mortgage = MortgageFactory(sequelize);
const Payment = PaymentFactory(sequelize);

User.hasMany(Mortgage, { foreignKey: 'userId', as: 'mortgages' });
Mortgage.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Mortgage.hasMany(Payment, { foreignKey: 'mortgageId', as: 'payments' });
Payment.belongsTo(Mortgage, { foreignKey: 'mortgageId', as: 'mortgage' });

const syncDatabase = async () => {
  await sequelize.sync();
};

export { sequelize, syncDatabase, User, Mortgage, Payment };
