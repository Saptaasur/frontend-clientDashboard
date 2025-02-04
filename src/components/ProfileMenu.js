import React from 'react';
import { Menu, MenuItem, Divider } from '@mui/material';
import { Link } from 'react-router-dom'; // Using Link for routing

const ProfileMenu = ({ showProfileMenu, setShowProfileMenu }) => {
  const handleClose = () => {
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    // Remove the token from localStorage to log the user out
    localStorage.removeItem('token');
    
    // Reload the page to ensure the user is logged out
    window.location.reload(); // Reload the page after logout
  };

  return (
    <Menu
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={showProfileMenu}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        <Link to="/profile">Edit Profile</Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link to="/account-settings">Account Settings</Link>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* Logout functionality */}
    </Menu>
  );
};

export default ProfileMenu;
