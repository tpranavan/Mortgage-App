import { DataTypes, Model } from 'sequelize';

class Mortgage extends Model {}

export default (sequelize) => {
  Mortgage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      termMonths: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'term_months',
      },
      income: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
      },
      interestRate: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'interest_rate',
      },
      pendingAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'pending_amount',
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'total_amount',
      },
      nextPaymentDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'next_payment_date',
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at',
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Mortgage',
      tableName: 'mortgages',
    }
  );

  return Mortgage;
};
