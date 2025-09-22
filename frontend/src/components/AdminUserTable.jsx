import React, { useState } from 'react';

const AdminUserTable = ({ users, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});

  const startEdit = (user) => {
    setEditingId(user.id);
    setForm({
      name: user.name,
      role: user.role,
      phone: user.phone ?? '',
      income: user.income ?? '',
      address: user.address ?? '',
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
      income: form.income !== '' ? parseFloat(form.income) : null,
    });
    setEditingId(null);
    setForm({});
  };

  return (
    <div className="card">
      <h2>Manage Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Income</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.phone ?? '—'}</td>
                <td>{user.income ?? '—'}</td>
                <td>{user.address ?? '—'}</td>
                <td>
                  {editingId === user.id ? (
                    <form onSubmit={handleSubmit} className="admin-form">
                      <div className="form-group">
                        <label>Name</label>
                        <input name="name" value={form.name} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Role</label>
                        <select name="role" value={form.role} onChange={handleChange}>
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Phone</label>
                        <input name="phone" value={form.phone} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Income</label>
                        <input name="income" type="number" value={form.income} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Address</label>
                        <textarea name="address" value={form.address} onChange={handleChange} rows="2" />
                      </div>
                      <button type="submit">Save</button>
                    </form>
                  ) : (
                    <button type="button" onClick={() => startEdit(user)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserTable;
