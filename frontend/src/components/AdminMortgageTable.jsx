import React, { useState } from 'react';

const AdminMortgageTable = ({ mortgages, onUpdate, onAddPayment }) => {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [paymentForm, setPaymentForm] = useState({});

  const startEdit = (mortgage) => {
    setEditingId(mortgage.id);
    setForm({
      status: mortgage.status,
      interestRate: mortgage.interestRate ?? '',
      pendingAmount: mortgage.pendingAmount ?? '',
      totalAmount: mortgage.totalAmount ?? '',
      nextPaymentDate: mortgage.nextPaymentDate ? mortgage.nextPaymentDate.substring(0, 10) : '',
      notes: mortgage.notes ?? '',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onUpdate(editingId, {
      ...form,
      interestRate: form.interestRate !== '' ? parseFloat(form.interestRate) : null,
      pendingAmount: form.pendingAmount !== '' ? parseFloat(form.pendingAmount) : null,
      totalAmount: form.totalAmount !== '' ? parseFloat(form.totalAmount) : null,
      nextPaymentDate: form.nextPaymentDate || null,
    });
    setEditingId(null);
    setForm({});
  };

  const handlePaymentChange = (id, event) => {
    const { name, value } = event.target;
    setPaymentForm((prev) => ({ ...prev, [id]: { ...prev[id], [name]: value } }));
  };

  const submitPayment = async (id, event) => {
    event.preventDefault();
    const payload = paymentForm[id] || {};
    await onAddPayment(id, {
      amount: payload.amount ? parseFloat(payload.amount) : 0,
      paymentDate: payload.paymentDate || undefined,
    });
    setPaymentForm((prev) => ({ ...prev, [id]: {} }));
  };

  return (
    <div className="card">
      <h2>All Mortgage Requests</h2>
      {mortgages.length === 0 ? (
        <p>No mortgage requests available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Interest Rate</th>
              <th>Pending Amount</th>
              <th>Total Amount</th>
              <th>Next Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mortgages.map((mortgage) => (
              <tr key={mortgage.id}>
                <td>{mortgage.id}</td>
                <td>
                  {mortgage.user?.name}
                  <br />
                  <small>{mortgage.user?.email}</small>
                </td>
                <td>
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(mortgage.amount)}
                </td>
                <td>{mortgage.status}</td>
                <td>{mortgage.interestRate ?? '—'}</td>
                <td>{mortgage.pendingAmount ?? '—'}</td>
                <td>{mortgage.totalAmount ?? '—'}</td>
                <td>{mortgage.nextPaymentDate ? new Date(mortgage.nextPaymentDate).toLocaleDateString() : '—'}</td>
                <td>
                  {editingId === mortgage.id ? (
                    <form onSubmit={handleSubmit} className="admin-form">
                      <div className="form-group">
                        <label>Status</label>
                        <select name="status" value={form.status} onChange={handleChange}>
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Interest Rate (%)</label>
                        <input name="interestRate" type="number" value={form.interestRate} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Pending Amount</label>
                        <input name="pendingAmount" type="number" value={form.pendingAmount} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Total Amount</label>
                        <input name="totalAmount" type="number" value={form.totalAmount} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Next Payment Date</label>
                        <input name="nextPaymentDate" type="date" value={form.nextPaymentDate} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Notes</label>
                        <textarea name="notes" value={form.notes} onChange={handleChange} rows="2" />
                      </div>
                      <button type="submit">Save</button>
                    </form>
                  ) : (
                    <button type="button" onClick={() => startEdit(mortgage)}>
                      Edit
                    </button>
                  )}

                  <form onSubmit={(event) => submitPayment(mortgage.id, event)} className="admin-form">
                    <h4>Record Payment</h4>
                    <div className="form-group">
                      <label>Amount</label>
                      <input
                        type="number"
                        name="amount"
                        value={paymentForm[mortgage.id]?.amount || ''}
                        onChange={(event) => handlePaymentChange(mortgage.id, event)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        name="paymentDate"
                        value={paymentForm[mortgage.id]?.paymentDate || ''}
                        onChange={(event) => handlePaymentChange(mortgage.id, event)}
                      />
                    </div>
                    <button type="submit">Add Payment</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminMortgageTable;

