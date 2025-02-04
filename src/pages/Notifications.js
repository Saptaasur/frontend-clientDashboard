import React from 'react';
import { Box, Typography } from '@mui/material';

const Notifications = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Notifications</Typography>
      <ul>
        <li>Notification 1: New comment on your project</li>
        <li>Notification 2: Project approved by client</li>
        <li>Notification 3: Task deadline approaching</li>
      </ul>
    </Box>
  );
};

export default Notifications;
