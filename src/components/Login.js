import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link for routing

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // To redirect after login

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill out both fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });

      console.log("Token received:", response.data.accessToken); // Debugging token
      localStorage.setItem('token', response.data.accessToken); // Save JWT token

      navigate('/'); // Redirect to dashboard
      window.location.reload(); // Refresh to reflect authenticated state
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 4, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 3, textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
        Login
      </Typography>

      {/* Error Message */}
      {error && <Typography color="error" sx={{ marginBottom: 2, textAlign: 'center' }}>{error}</Typography>}

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

      {/* Login Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
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
        Login
      </Button>

      {/* Redirect to Register page */}
      <Typography variant="body2" sx={{ marginTop: 3, textAlign: 'center' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#1976d2' }}>
          Register here
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
