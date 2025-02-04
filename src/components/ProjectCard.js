import React, { useState, useEffect } from "react";
import { Card, CardContent, TextField, Button, Typography, List, ListItem, ListItemText, Grid, IconButton } from "@mui/material";
import { MdEdit, MdDelete } from 'react-icons/md'; // Edit and Delete icons
import axios from "axios";

const ProjectInfoCard = () => {
  const [projectInfo, setProjectInfo] = useState({
    name: "",
    status: "",
    developer: "",
    dueDate: "",
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null); // Track the project being edited

  // Fetch existing project details on component mount
  useEffect(() => {
    const fetchProjectInfo = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) {
          setError("User is not authenticated. Please log in.");
          setLoading(false);
          return;
        }

        // Send token in the Authorization header
        const response = await axios.get("https://backend-client-dashboard.onrender.com/api/project-info", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProjects(response.data); // Set the project details
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load project information.");
        setLoading(false);
      }
    };

    fetchProjectInfo();
  }, []);

  // Handle input changes for new project or editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle saving a new or updated project
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User is not authenticated. Please log in.");
        return;
      }

      // If editing an existing project, update it
      if (editingProjectId) {
        await axios.post("https://backend-client-dashboard.onrender.com/api/update-project", {
          ...projectInfo,
          projectId: editingProjectId, // Send the project ID to update the specific project
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Project updated successfully!");
      } else {
        // If it's a new project, add it
        await axios.post("https://backend-client-dashboard.onrender.com/api/add-project", projectInfo, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Project added successfully!");
      }

      // Clear form after saving
      setProjectInfo({ name: "", status: "", developer: "", dueDate: "" });
      setEditingProjectId(null); // Reset editing project ID

      // Fetch the updated projects list
      const response = await axios.get("https://backend-client-dashboard.onrender.com/api/project-info", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data); // Update the project list
    } catch (error) {
      console.error("Error saving project data:", error);
      if (error.response?.status === 403) {
        alert("Unauthorized! Please log in again.");
      } else {
        alert("Failed to save project data. Please try again.");
      }
    }
  };

  // Handle deleting a project
  const handleDelete = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User is not authenticated. Please log in.");
        return;
      }

      await axios.delete(`https://backend-client-dashboard.onrender.com/api/delete-project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Project deleted successfully!");

      // Remove the deleted project from the list
      setProjects(projects.filter(project => project._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project. Please try again.");
    }
  };

  // Show loading message or error message while waiting for response
  if (loading) {
    return <Typography variant="h6" color="textSecondary">Loading project information...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Card sx={{
      padding: 3,
      marginBottom: 2,
      boxShadow: 3,
      borderRadius: 2,
      backgroundColor: "#f9f9f9",
      transition: "box-shadow 0.3s ease",
      '&:hover': {
        boxShadow: 6,
      }
    }}>
      <CardContent>
        <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          {editingProjectId ? "Edit Project" : "Add New Project"}
        </Typography>

        {/* Using Grid system to make form responsive */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Project Name"
              name="name"
              value={projectInfo.name}
              onChange={handleChange}
              fullWidth
              sx={{
                marginBottom: 2,
                '& .MuiInputLabel-root': { fontWeight: '500' }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Assigned Developer"
              name="developer"
              value={projectInfo.developer}
              onChange={handleChange}
              fullWidth
              sx={{
                marginBottom: 2,
                '& .MuiInputLabel-root': { fontWeight: '500' }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Status"
              name="status"
              value={projectInfo.status}
              onChange={handleChange}
              fullWidth
              sx={{
                marginBottom: 2,
                '& .MuiInputLabel-root': { fontWeight: '500' }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Due Date"
              name="dueDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={projectInfo.dueDate}
              onChange={handleChange}
              fullWidth
              sx={{
                marginBottom: 2,
                '& .MuiInputLabel-root': { fontWeight: '500' }
              }}
            />
          </Grid>
        </Grid>
      </CardContent>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{
          marginTop: 2,
          padding: "10px 20px",
          borderRadius: 1,
          fontWeight: 'bold',
          boxShadow: 2,
          '&:hover': {
            boxShadow: 6,
            backgroundColor: "#1976d2",
          },
        }}
      >
        {editingProjectId ? "Update Project" : "Save Project"}
      </Button>

      {/* Display list of projects */}
      <CardContent sx={{ marginTop: 3 }}>
        <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Existing Projects
        </Typography>

        {projects.length > 0 ? (
          <List>
            {projects.map((project, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Project: ${project.name}`}
                  secondary={`Status: ${project.status}, Developer: ${project.developer}, Due Date: ${project.dueDate}`}
                />
                {/* Edit Button */}
                <IconButton
                  color="primary"
                  onClick={() => {
                    setProjectInfo(project); // Populate form with selected project details
                    setEditingProjectId(project._id); // Set the editing project ID
                  }}
                >
                  <MdEdit />
                </IconButton>
                {/* Delete Button */}
                <IconButton
                  color="error"
                  onClick={() => handleDelete(project._id)} // Delete the selected project
                >
                  <MdDelete />
                </IconButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No projects available.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectInfoCard;
