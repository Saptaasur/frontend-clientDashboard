import React from 'react';
import { Card, CardContent } from '@mui/material';

const Notifications = () => {
  return (
    <Card sx={{ padding: 3, marginBottom: 2 }}>
      <CardContent>
        <h3>Notifications</h3>
        <p>No new notifications</p>
      </CardContent>
    </Card>
  );
};

export default Notifications;
