import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link for routing

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password || !companySize || !preferredLanguage) {
      setError('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('https://backend-client-dashboard.onrender.com/auth/register', {
        name,
        email,
        password,
        companySize,
        preferredLanguage,
      });

      console.log("Token received after registration:", response.data.accessToken); // Debugging token
      localStorage.setItem('token', response.data.accessToken); // Save JWT after registration

      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/'); // Redirect to dashboard or home page
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 4, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 3, textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
        Register
      </Typography>

      {/* Error and Success Messages */}
      {error && <Typography color="error" sx={{ marginBottom: 2, textAlign: 'center' }}>{error}</Typography>}
      {success && <Typography color="success" sx={{ marginBottom: 2, textAlign: 'center' }}>{success}</Typography>}

      {/* Name Input */}
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
        inputProps={{ 'aria-label': 'name' }}
      />

      {/* Email Input */}
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        inputProps={{ 'aria-label': 'email' }}
      />

      {/* Password Input */}
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        inputProps={{ 'aria-label': 'password' }}
      />

      {/* Company Size Input */}
      <TextField
        label="Company Size"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={companySize}
        onChange={(e) => setCompanySize(e.target.value)}
        inputProps={{ 'aria-label': 'company size' }}
      />

      {/* Preferred Language Input */}
      <TextField
        label="Preferred Language"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={preferredLanguage}
        onChange={(e) => setPreferredLanguage(e.target.value)}
        inputProps={{ 'aria-label': 'preferred language' }}
      />

      {/* Register Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRegister}
        sx={{
          padding: '12px 0',
          borderRadius: 1,
          boxShadow: 2,
          '&:hover': {
            boxShadow: 6,
            backgroundColor: '#1976d2',
          },
        }}
      >
        Register
      </Button>

      {/* Redirect to Login page */}
      <Typography variant="body2" sx={{ marginTop: 3, textAlign: 'center' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#1976d2' }}>
          Login here
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
