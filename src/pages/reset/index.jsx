import { useState } from "react";
import { Box, TextField, Button, Typography, Container, CssBaseline, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const handleResetPassword = (event) => {
        event.preventDefault();

        if (!email || !oldPassword || !newPassword) {
            setError("Please fill in all fields.");
            return;
        }

        const user = users.find((user) => user.email === email);

        if (user && user.password === oldPassword) {
            user.password = newPassword;

            localStorage.setItem("users", JSON.stringify(users));

            setSuccess(true);
            setError("");

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } else {
            setError("Invalid email or old password.");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>

                {error && <Alert severity="error" sx={{ mt: 2, width: "100%" }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mt: 2, width: "100%" }}>Password reset successful. Redirecting...</Alert>}

                <Box component="form" onSubmit={handleResetPassword} sx={{ mt: 3 }}>
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
                        name="oldPassword"
                        label="Old Password"
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Reset Password
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ResetPasswordPage;
