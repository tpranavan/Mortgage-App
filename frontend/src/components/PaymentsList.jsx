import React from 'react';

const PaymentsList = ({ payments }) => (
  <div className="card">
    <h2>Payment History</h2>
    {payments.length === 0 ? (
      <p>No payments recorded.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payment.amount)}
              </td>
              <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default PaymentsList;
