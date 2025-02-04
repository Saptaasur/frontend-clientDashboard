import React, { useState } from 'react';
import { Button, Box } from '@mui/material'; // <-- Import Button here
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai'; // Profile icon
import ProfileMenu from './components/ProfileMenu';
import NavigationBar from './components/NavigationBar';
import ClientDashboard from './pages/ClientDashboard';
import ProfileDashboard from './pages/ProfileDashboard';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import AccountSettings from './pages/AccountSettings';  // Import Account Settings

const App = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const token = localStorage.getItem('token'); // Check if the user is logged in

  return (
    <Router>
      <Box sx={{ padding: 3 }}>
        <NavigationBar />
        {token ? (
          <>
            <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h1>Client & Profile Dashboard</h1>
              <Button 
                variant="contained" 
                onClick={() => setShowProfileMenu(!showProfileMenu)} 
                startIcon={<AiOutlineUser />}
              >
                Profile
              </Button>
            </header>

            <ProfileMenu 
              showProfileMenu={showProfileMenu} 
              setShowProfileMenu={setShowProfileMenu} 
            />

            <Routes>
              <Route path="/" element={<ClientDashboard />} />
              <Route path="/profile" element={<ProfileDashboard />} />
              <Route path="/account-settings" element={<AccountSettings />} /> {/* Route to Account Settings */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Box>
    </Router>
  );
};

export default App;
