import { Box, Typography, Container, Button } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove("auth_token");
        navigate("/login");
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
                    Home Page
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
                    Welcome to the Home Page! Click the button below to navigate to your Dashboard.
                </Typography>

                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </Container>
    );
};

export default HomePage;
