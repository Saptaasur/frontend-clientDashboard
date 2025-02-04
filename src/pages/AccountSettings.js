import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Settings from '../components/Settings';

const AccountSettings = () => {
  return (
    <Card sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Account Settings
        </Typography>
        <Settings /> {/* This renders the ClientInfoCard */}
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
