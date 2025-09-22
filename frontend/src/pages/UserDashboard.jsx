import React, { useEffect, useState } from 'react';
import ProfileForm from '../components/ProfileForm';
import MortgageRequestForm from '../components/MortgageRequestForm';
import MortgageList from '../components/MortgageList';
import PaymentsList from '../components/PaymentsList';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
  const { user, setError } = useAuth();
  const [profile, setProfile] = useState(user);
  const [mortgages, setMortgages] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setError(null);
    try {
      const [profileResponse, mortgagesResponse] = await Promise.all([
        api.get('/users/me'),
        api.get('/mortgages/me'),
      ]);
      setProfile(profileResponse.data.user);
      setMortgages(mortgagesResponse.data.mortgages);
      const allPayments = mortgagesResponse.data.mortgages.flatMap((mortgage) => mortgage.payments || []);
      setPayments(allPayments.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleProfileSave = async (payload) => {
    await api.put('/users/me', payload);
    await loadData();
  };

  const handleMortgageSubmit = async (payload) => {
    await api.post('/mortgages', payload);
    await loadData();
  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <ProfileForm user={profile} onSave={handleProfileSave} />
      <MortgageRequestForm onSubmit={handleMortgageSubmit} />
      <MortgageList mortgages={mortgages} />
      <PaymentsList payments={payments} />
    </div>
  );
};

export default UserDashboard;
