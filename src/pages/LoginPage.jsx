import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import Header from "../components/Header";
import { useState } from "react";
import { login } from "../utils/api_users";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = async (event) => {
        try {
            if (!email || !password) {
                toast.error("Please fill up all the fields");
            } else {
                await login( email, password);
                toast.success("User has succesfully logged in");
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <Header current="login" title="Login to Your Account" />
            <Container maxWidth="sm">
                <Paper elevation={1} sx={{ p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body1" sx={{ mb: 0.5 }}>
                            Email
                        </Typography>
                        <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body1" sx={{ mb: 0.5 }}>
                            Password
                        </Typography>
                        <TextField type="password" label="Password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Box>
                    <Box>
                        <Button variant="contained" color="primary" fullWidth onClick={handleFormSubmit}>
                            Login
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}
