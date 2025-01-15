"use client";
import { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Set the correct endpoint for login or registration
      const endpoint = isRegistering
        ? "http://localhost:8080/api/auth/signup"
        : "http://localhost:8080/api/auth/login";

      const response = await axios.post(endpoint, {
        email,
        password,
      });

      if (response.status === 200) {
        router.push("/Products");
      }
    } catch (err) {
      console.error(err);
      alert("Authentication failed");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" mb={3}>
        {isRegistering ? "Register" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth>
          {isRegistering ? "Register" : "Login"}
        </Button>
        <Button
          fullWidth
          onClick={() => setIsRegistering(!isRegistering)}
          style={{ marginTop: "10px" }}
        >
          Switch to {isRegistering ? "Login" : "Register"}
        </Button>
      </form>
    </Box>
  );
}
