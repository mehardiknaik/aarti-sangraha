import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAartiStore } from "../../stores/aartiStore";

const AddAartiPage = () => {
  const { addAarti } = useAartiStore();

  // Local state for form fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Handle input change
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleAddAarti = (e:any) => {
    e.preventDefault(); // prevent page reload
    console.log("Submitting Aarti:", formData);
    addAarti(formData.name, formData.description);
    // addAarti(formData); // call your store's add function
    setFormData({ name: "", description: "" }); // reset form
  };

  return (
    <Box component="form" onSubmit={handleAddAarti} sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Add Aarti
      </Typography>

      <TextField
        label="Aarti Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Aarti Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        required
      />

      <Button variant="contained" color="primary" type="submit">
        Add Aarti
      </Button>
    </Box>
  );
};

export default AddAartiPage;
