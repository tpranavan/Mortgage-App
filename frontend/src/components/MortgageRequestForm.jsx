import React, { useState } from 'react';

const MortgageRequestForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ amount: '', termMonths: '', income: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await onSubmit({
        ...form,
        amount: form.amount ? parseFloat(form.amount) : null,
        termMonths: form.termMonths ? parseInt(form.termMonths, 10) : null,
        income: form.income ? parseFloat(form.income) : undefined,
      });
      setForm({ amount: '', termMonths: '', income: '', notes: '' });
      setMessage('Mortgage request submitted');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Request a Mortgage</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input id="amount" name="amount" type="number" value={form.amount} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="termMonths">Term (months)</label>
          <input
            id="termMonths"
            name="termMonths"
            type="number"
            value={form.termMonths}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="income">Annual Income</label>
          <input id="income" name="income" type="number" value={form.income} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea id="notes" name="notes" value={form.notes} onChange={handleChange} rows="3" />
        </div>
        {message && <p>{message}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default MortgageRequestForm;
