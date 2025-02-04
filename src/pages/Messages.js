import React from 'react';
import { Box, Typography } from '@mui/material';

const Messages = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Messages</Typography>
      <ul>
        <li>Message 1: New task assigned</li>
        <li>Message 2: Reminder for meeting</li>
        <li>Message 3: Project deadline approaching</li>
      </ul>
    </Box>
  );
};

export default Messages;
