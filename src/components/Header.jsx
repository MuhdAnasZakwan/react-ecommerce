import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router";

const Header = (props) => {
    const { current, title = "Welcome To My Store" } = props;
    return (
        <Box fullWidth sx={{ textAlign: "center", my: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3}}>
                {title}
            </Typography>
            <Box sx={{ mb: 3 }}>
                <Button
                    variant={current === "home" ? "contained" : "outlined"}
                    color="primary"
                    sx={{ mx: 1 }}
                    component={Link}
                    to="/"
                >
                    Home
                </Button>
                <Button
                    variant={current === "cart" ? "contained" : "outlined"}
                    color="primary"
                    sx={{ mx: 1 }}
                    component={Link}
                    to="/cart"
                >
                    Cart
                </Button>
                <Button
                    variant={current === "orders" ? "contained" : "outlined"}
                    color="primary"
                    sx={{ mx: 1 }}
                    component={Link}
                    to="/orders"
                >
                    My Orders
                </Button>
                <Button
                    variant={current === "categories" ? "contained" : "outlined"}
                    color="primary"
                    sx={{ mx: 1 }}
                    component={Link}
                    to="/categories"
                >
                    Categories
                </Button>
                <Button
                    variant={current === "login" ? "contained" : "outlined"}
                    color="primary"
                    sx={{ mx: 1 }}
                    component={Link}
                    to="/login"
                >
                    Login
                </Button>
                <Button
                    variant={current === "signup" ? "contained" : "outlined"}
                    color="primary"
                    sx={{ mx: 1 }}
                    component={Link}
                    to="/signup"
                >
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
};

export default Header;
