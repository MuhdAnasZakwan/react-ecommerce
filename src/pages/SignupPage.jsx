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
import { toast } from "sonner";
import { signup } from "../utils/api_users";
import { useNavigate } from "react-router";

const SignupPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleFormSubmit = async (event) => {
        try {
            if (!name || !email || !password || !confirmPassword) {
                toast.error("Please fill up all the fields");
            } else if (password !== confirmPassword){
                toast.error("Password does not match");
            } else {
                await signup(name, email, password);
                toast.success("New users has been created")
                navigate("/")
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <Header current="signup" title="Create a New Account" />
            <Container maxWidth="sm">
                <Paper elevation={1} sx={{ p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body1" sx={{ mb: 0.5 }}>
                            Name
                        </Typography>
                        <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)}/>
                    </Box>
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
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body1" sx={{ mb: 0.5 }}>
                            Confirm Password
                        </Typography>
                        <TextField label="Confirm Password" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </Box>
                    <Box>
                        <Button variant="contained" color="primary" fullWidth onClick={handleFormSubmit}>
                            Sign Up
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default SignupPage;