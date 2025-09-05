import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Dashboard() {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("https://klickks-backend.onrender.com/session", { withCredentials: true });
        if (res.data.loggedIn) {
          setStatus("Welcome! You are logged in.");
        } else {
          navigate("/login");
        }
      } catch {
        navigate("/login");
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogout = async () => {
    await axios.post("https://klickks-backend.onrender.com/logout", {}, { withCredentials: true });
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} textAlign="center">
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
        <Typography>{status}</Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2 }}>Logout</Button>
      </Box>
    </Container>
  );
}
