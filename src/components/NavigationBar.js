import React, { useState } from 'react';
import { Button, Box, AppBar, Toolbar, Typography, Modal, Box as MuiBox } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const NavigationBar = () => {
  const [openMessagesModal, setOpenMessagesModal] = useState(false);
  const [openNotificationsModal, setOpenNotificationsModal] = useState(false);

  const handleMessagesOpen = () => setOpenMessagesModal(true);
  const handleMessagesClose = () => setOpenMessagesModal(false);
  
  const handleNotificationsOpen = () => setOpenNotificationsModal(true);
  const handleNotificationsClose = () => setOpenNotificationsModal(false);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2', padding: '10px 0' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button 
            component={Link} 
            to="/" 
            variant="outlined" 
            sx={{ color: 'white', '&:hover': { backgroundColor: '#1565c0', borderColor: '#1565c0' } }}
          >
            Dashboard Insights
          </Button>
          <Button 
            component={Link} 
            to="/profile" 
            variant="outlined" 
            sx={{ color: 'white', '&:hover': { backgroundColor: '#1565c0', borderColor: '#1565c0' } }}
          >
            Profile
          </Button>
          <Button 
            variant="outlined" 
            sx={{ color: 'white', '&:hover': { backgroundColor: '#1565c0', borderColor: '#1565c0' } }}
            onClick={handleMessagesOpen}
          >
            Messages
          </Button>
          <Button 
            variant="outlined" 
            sx={{ color: 'white', '&:hover': { backgroundColor: '#1565c0', borderColor: '#1565c0' } }}
            onClick={handleNotificationsOpen}
          >
            Notifications
          </Button>
          <Button 
            component={Link} 
            to="/account-settings" // Add Link to Account Settings page
            variant="outlined" 
            sx={{ color: 'white', '&:hover': { backgroundColor: '#1565c0', borderColor: '#1565c0' } }}
          >
            Account Settings
          </Button>
        </Box>
      </Toolbar>

      {/* Messages Modal */}
      <Modal
        open={openMessagesModal}
        onClose={handleMessagesClose}
        aria-labelledby="messages-modal-title"
        aria-describedby="messages-modal-description"
      >
        <MuiBox sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 3, width: '80%', maxWidth: 600
        }}>
          <Typography variant="h6" id="messages-modal-title">Messages</Typography>
          <Typography id="messages-modal-description" sx={{ marginTop: 2 }}>
            <ul>
              <li>Message 1: New task assigned</li>
              <li>Message 2: Reminder for meeting</li>
              <li>Message 3: Project deadline approaching</li>
            </ul>
          </Typography>
          <Button onClick={handleMessagesClose} sx={{ marginTop: 2 }}>Close</Button>
        </MuiBox>
      </Modal>

      {/* Notifications Modal */}
      <Modal
        open={openNotificationsModal}
        onClose={handleNotificationsClose}
        aria-labelledby="notifications-modal-title"
        aria-describedby="notifications-modal-description"
      >
        <MuiBox sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 3, width: '80%', maxWidth: 600
        }}>
          <Typography variant="h6" id="notifications-modal-title">Notifications</Typography>
          <Typography id="notifications-modal-description" sx={{ marginTop: 2 }}>
            <ul>
              <li>Notification 1: New comment on your project</li>
              <li>Notification 2: Project approved by client</li>
              <li>Notification 3: Task deadline approaching</li>
            </ul>
          </Typography>
          <Button onClick={handleNotificationsClose} sx={{ marginTop: 2 }}>Close</Button>
        </MuiBox>
      </Modal>
    </AppBar>
  );
};

export default NavigationBar;
