import React, { useState } from "react";
import { Container, Typography, Button, Box, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Register() {
  const { control, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("https://klickks-backend.onrender.com/register", data);
      setMessage(res.data.message);
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <Typography variant="h5" gutterBottom>Register</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: "Email is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
        {message && <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>}
        <Button fullWidth sx={{ mt: 2 }} onClick={() => navigate("/login")}>Go to Login</Button>
      </Box>
    </Container>
  );
}
