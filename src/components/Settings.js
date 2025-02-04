import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const Settings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') setOldPassword(value);
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that new passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User is not authenticated. Please log in.');
        return;
      }

      // Send change password request to backend
      const response = await axios.post(
        'http://localhost:5000/api/change-password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to change password.');
    }
  };

  return (
    <Card sx={{ padding: 3, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Account Settings
        </Typography>

        {/* Display error or success messages */}
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}

        {/* Change Password Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Old Password"
            name="oldPassword"
            type="password"
            value={oldPassword}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />
          <TextField
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />
          <Button variant="contained" color="primary" type="submit" sx={{ padding: '10px 20px' }}>
            Change Password
          </Button>
        </form>

        {/* Additional settings like Two-Factor Authentication */}
        <Typography sx={{ marginTop: 3 }}>Two-Factor Authentication</Typography>
        <p>Enable or disable two-factor authentication for extra security.</p>
      </CardContent>
    </Card>
  );
};

export default Settings;
