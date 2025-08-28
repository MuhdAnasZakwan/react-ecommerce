import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router";

const Header = (props) => {
    const { current, title = "Welcome To My Store" } = props;
    return (
        <Box fullWidth sx={{ textAlign: "center", my: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
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
            </Box>
        </Box>
    );
};

export default Header;
