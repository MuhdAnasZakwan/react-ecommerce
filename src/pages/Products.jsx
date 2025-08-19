import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Paper,
    Chip,
} from "@mui/material";
import { getProducts } from "../utils/api";
import { useState, useEffect } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("all");

    useEffect(() => {
        getProducts(category).then((data) => {
            setProducts(data);
        });
    }, [category]);

    return (
        <>
            <Box fullWidth sx={{ textAlign: "center" }}>
                <h1>Welcome to My Store</h1>
            </Box>
            <Container>
                <hr />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h2>Products</h2>
                    <Button color="success" variant="contained">
                        Add New
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        mb: "20px",
                    }}
                >
                    <FormControl sx={{ minWidth: "200px" }}>
                        <InputLabel id="categories-label">Category</InputLabel>
                        <Select
                            labelId="categories-label"
                            id="category"
                            value={category}
                            label="Category"
                            onChange={(event) =>
                                setCategory(event.target.value)
                            }
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value={"Consoles"}>Consoles</MenuItem>
                            <MenuItem value={"Games"}>Games</MenuItem>
                            <MenuItem value={"Accessories"}>
                                Accessories
                            </MenuItem>
                            <MenuItem value={"Subscriptions"}>
                                Subscriptions
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid size={{ sm: 12, md: 6, lg: 4 }}>
                            <Paper sx={{ p: "10px", minHeight: 210, display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                <h2 style={{ marginTop: 0 }}>
                                    {product.name}
                                </h2>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Chip
                                        variant="outlined"
                                        size="small"
                                        label={product.price}
                                        color="success"
                                    />
                                    <Chip
                                        variant="outlined"
                                        size="small"
                                        label={product.category}
                                        color="warning"
                                    />
                                </Box>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ my: "20px" }}
                                >
                                    Add To Cart
                                </Button>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Chip label="Edit" color="primary"></Chip>
                                    <Chip label="Delete" color="error"></Chip>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}
