import React, { useState, useEffect } from "react";
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const ClientInfoCard = () => {
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    companySize: "",
    preferredLanguage: "",
  });

  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(""); // Add error state to display errors

  // Fetch existing client details on component mount
  useEffect(() => {
    const fetchClientInfo = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) {
          setError("User is not authenticated. Please log in.");
          setLoading(false);
          return;
        }
  
        // Send token in the Authorization header
        const response = await axios.get("http://localhost:5000/api/client-info", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setClientInfo(response.data); // Set the client details
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load client information.");
        setLoading(false);
      }
    };
  
    fetchClientInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User is not authenticated. Please log in.");
        return;
      }

      await axios.post("http://localhost:5000/api/update-client", clientInfo, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Client information updated successfully!");
    } catch (error) {
      console.error("Error saving client data:", error);
      alert("Failed to save client data. Make sure you're authenticated.");
    }
  };

  // Show loading message or error message while waiting for response
  if (loading) {
    return <Typography variant="h6" color="textSecondary">Loading client information...</Typography>;
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
          Client Information
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={clientInfo.name}
          onChange={handleChange}
          fullWidth
          sx={{
            marginBottom: 2, 
            '& .MuiInputLabel-root': {
              fontWeight: '500', 
            }
          }}
        />
        <TextField
          label="Email"
          name="email"
          value={clientInfo.email}
          fullWidth
          disabled
          sx={{
            marginBottom: 2, 
            '& .MuiInputLabel-root': {
              fontWeight: '500', 
            }
          }}
        />
        <TextField
          label="Company Size"
          name="companySize"
          value={clientInfo.companySize}
          onChange={handleChange}
          fullWidth
          sx={{
            marginBottom: 2, 
            '& .MuiInputLabel-root': {
              fontWeight: '500', 
            }
          }}
        />
        <TextField
          label="Preferred Language"
          name="preferredLanguage"
          value={clientInfo.preferredLanguage}
          onChange={handleChange}
          fullWidth
          sx={{
            marginBottom: 2, 
            '& .MuiInputLabel-root': {
              fontWeight: '500', 
            }
          }}
        />
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
        Save
      </Button>
    </Card>
  );
};

export default ClientInfoCard;
