import React from 'react';
import { Box } from '@mui/material';
import ClientInfoCard from '../components/ClientInfoCard';
import ProjectCard from '../components/ProjectCard';
import TaskManager from '../components/TaskManager';

const ClientDashboard = () => {
  return (
    <Box>
      <h2>Client Dashboard</h2>
      <ClientInfoCard />
      <ProjectCard />
      <TaskManager />
    </Box>
  );
};

export default ClientDashboard;
