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
    Typography,
} from "@mui/material";
import { getProducts, deleteProduct } from "../utils/api_products";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { AddToCart } from "../utils/cart";

export default function Products() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState("all");

    useEffect(() => {
        getProducts(category, page).then((data) => {
            setProducts(data);
        });
    }, [category, page]);

    const handleProductDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteProduct(id);
                // setProducts(
                //     products.filter((p) => p._id !== id)
                // );

                const updatedProducts = await getProducts(category, page);
                setProducts(updatedProducts);

                toast.success("Product has been deleted");
            }
        });
    };

    return (
        <>
            <Header />
            <Container>
                <Box sx={{mb: 3}} align="center">
                    <Button variant="contained" color="primary" sx={{mx: 1}}>Home</Button>
                    <Button variant="outlined" color="primary" sx={{mx: 1}} component={Link} to="/cart">Cart</Button>
                </Box>
                <hr />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h2>Products</h2>
                    <Button
                        component={Link}
                        to="/products/new"
                        color="success"
                        variant="contained"
                    >
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
                            onChange={(event) => {
                                setCategory(event.target.value);
                                setPage(1);
                            }}
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
                        <Grid size={{ sm: 12, md: 6, lg: 4 }} key={product._id}>
                            <Paper
                                sx={{
                                    p: "10px",
                                    minHeight: 210,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <h2 style={{ marginTop: 0 }}>{product.name}</h2>
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
                                        label={"$" + product.price}
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
                                    onClick={() => {
                                        AddToCart(product);
                                        navigate("/cart");
                                    }}
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
                                    <Button
                                        component={Link}
                                        to={`/products/${product._id}/edit`}
                                        color="primary"
                                        variant="contained"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="error"
                                        variant="contained"
                                        onClick={() => {
                                            handleProductDelete(product._id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                {products.length === 0 ? (
                    <Typography variant="h5" align="center" py={3}>
                        No more products found.
                    </Typography>
                ) : null}
                <Box
                    sx={{
                        py: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        disabled={page === 1 ? true : false}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </Button>
                    <span>Page: {page}</span>
                    <Button
                        variant="contained"
                        disabled={products.length === 0 ? true : false}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </Button>
                </Box>
            </Container>
        </>
    );
}
