// src/pages/Login.jsx
import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement login logic here
        console.log("Login details", { email, password });
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Paper elevation={3} sx={{ width: "100%", maxWidth: "800px", padding: 2, margin: 2 }}>
                <Typography variant="h5" align="center">
                    Login
                </Typography>
                <form
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "20px" }}
                        component={Link} to="/"
                    >
                        Login
                    </Button>
                </form>
                <Typography
                    variant="body2"
                    style={{ marginTop: "10px", textAlign: "center" }}
                >
                    Don"t have an account? <Link to="">Sign Up</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;
