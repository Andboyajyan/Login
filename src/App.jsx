import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoginForm from "./pages/login";
import HomePage from "./pages/home";
import ResetPasswordPage from "./pages/reset";

const defaultUsers = [
    { email: "user1@example.com", password: "password123" },
    { email: "user2@example.com", password: "password456" },
    { email: "user3@example.com", password: "password789" },
];

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(defaultUsers));
}

const ProtectedRoute = ({ element }) => {
    const token = Cookies.get("auth_token");
    return token ? element : <Navigate to="/login" />;
};

const UnauthenticatedRoute = ({ element }) => {
    const token = Cookies.get("auth_token");
    return !token ? element : <Navigate to="/" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
                <Route path="/login" element={<UnauthenticatedRoute element={<LoginForm />} />} />
                <Route path="/reset-password" element={<UnauthenticatedRoute element={<ResetPasswordPage />} />} />
            </Routes>
        </Router>
    );
};

export default App;
