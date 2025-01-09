import { useState } from "react";
import {Box, TextField, Button, Typography, Container, CssBaseline, Alert, Link} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        const user = users.find(
            (user) => user.email === email && user.password === password
        );

        if (user) {
            Cookies.set("auth_token", "your-token-here");
            navigate("/");
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Link href="/reset-password" variant="body2">
                            Forgot password?
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginForm;
