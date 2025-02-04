import React from 'react';
import { Box } from '@mui/material';
import ClientInfoCard from '../components/ClientInfoCard';
import PaymentMethods from '../components/PaymentMethods';
import Notifications from '../components/Notifications';

const ProfileDashboard = () => {
  return (
    <Box>
      <h2>Profile Dashboard</h2>
      <ClientInfoCard />
      <PaymentMethods />
      <Notifications />
    </Box>
  );
};

export default ProfileDashboard;
