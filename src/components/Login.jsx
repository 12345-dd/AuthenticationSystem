import React, { useState } from "react";
import { Container, Typography, Button, Box, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Login() {
  const { control, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("https://klickks-backend.onrender.com/login", data, { withCredentials: true });
      setMessage(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <Typography variant="h5" gutterBottom>Login</Typography>
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
            rules={{ required: "Password is required" }}
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
            Login
          </Button>
        </form>
        {message && <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>}
        <Button fullWidth sx={{ mt: 2 }} onClick={() => navigate("/register")}>Go to Register</Button>
      </Box>
    </Container>
  );
}
