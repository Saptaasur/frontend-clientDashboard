import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Welcome to Client Dashboard
      </Typography>
      <Button variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={() => navigate('/login')}>
        Login
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => navigate('/register')}>
        Register
      </Button>
    </Box>
  );
};

export default Home;
