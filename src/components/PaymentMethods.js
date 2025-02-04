import React from 'react';
import { Card, CardContent } from '@mui/material';

const PaymentMethods = () => {
  return (
    <Card sx={{ padding: 3, marginBottom: 2 }}>
      <CardContent>
        <h3>Payment Methods</h3>
        <p>Credit Card: **** **** **** 1234</p>
        <p>PayPal: john.doe@paypal.com</p>
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;
