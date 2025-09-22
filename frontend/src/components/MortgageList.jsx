import React from 'react';

const formatCurrency = (value) => {
  if (value === null || value === undefined) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const MortgageList = ({ mortgages }) => (
  <div className="card">
    <h2>My Mortgages</h2>
    {mortgages.length === 0 ? (
      <p>No mortgage requests yet.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Term</th>
            <th>Status</th>
            <th>Interest Rate</th>
            <th>Pending Amount</th>
            <th>Total Amount</th>
            <th>Next Payment</th>
          </tr>
        </thead>
        <tbody>
          {mortgages.map((mortgage) => (
            <tr key={mortgage.id}>
              <td>{mortgage.id}</td>
              <td>{formatCurrency(mortgage.amount)}</td>
              <td>{mortgage.termMonths} months</td>
              <td>
                <span className={`status-pill ${mortgage.status}`}>{mortgage.status}</span>
              </td>
              <td>{mortgage.interestRate ? `${mortgage.interestRate}%` : '—'}</td>
              <td>{formatCurrency(mortgage.pendingAmount)}</td>
              <td>{formatCurrency(mortgage.totalAmount)}</td>
              <td>{mortgage.nextPaymentDate ? new Date(mortgage.nextPaymentDate).toLocaleDateString() : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default MortgageList;
