import React, { useEffect, useState } from 'react';
import AdminMortgageTable from '../components/AdminMortgageTable';
import AdminUserTable from '../components/AdminUserTable';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { setError } = useAuth();
  const [mortgages, setMortgages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setError(null);
    try {
      const [mortgagesResponse, usersResponse] = await Promise.all([
        api.get('/admin/mortgages'),
        api.get('/admin/users'),
      ]);
      setMortgages(mortgagesResponse.data.mortgages);
      setUsers(usersResponse.data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMortgageUpdate = async (id, payload) => {
    await api.put(`/admin/mortgages/${id}`, payload);
    await loadData();
  };

  const handleAddPayment = async (id, payload) => {
    await api.post(`/admin/mortgages/${id}/payments`, payload);
    await loadData();
  };

  const handleUserUpdate = async (id, payload) => {
    await api.put(`/admin/users/${id}`, payload);
    await loadData();
  };

  if (loading) {
    return <p>Loading admin dashboard...</p>;
  }

  return (
    <div>
      <AdminMortgageTable mortgages={mortgages} onUpdate={handleMortgageUpdate} onAddPayment={handleAddPayment} />
      <AdminUserTable users={users} onUpdate={handleUserUpdate} />
    </div>
  );
};

export default AdminDashboard;
