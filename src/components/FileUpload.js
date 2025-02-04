import React, { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    // Add logic for uploading file (e.g., API call)
    console.log(selectedFile);
  };

  return (
    <Card sx={{ padding: 3, marginBottom: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Upload Files
        </Typography>

        {/* File input */}
        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginBottom: 12 }}
        />
        {selectedFile && (
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Selected File: {selectedFile.name}
          </Typography>
        )}

        {/* Upload Button */}
        <Button
          onClick={handleFileUpload}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            padding: '12px 0',
            '&:hover': {
              backgroundColor: '#1976d2',
              boxShadow: 6,
            },
          }}
        >
          Upload
        </Button>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
