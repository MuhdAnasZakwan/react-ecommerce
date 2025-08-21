import { Box, Typography } from "@mui/material";

const Header = () => {
    return (
        <Box fullWidth sx={{ textAlign: "center", my: 2}}>
            <Typography variant="h3" sx={{fontWeight: 700}}>Welcome to My Store</Typography>
        </Box>
    );
};

export default Header;