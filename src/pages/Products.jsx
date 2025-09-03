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
    Card,
    CardMedia,
    CardContent,
    CardActions,
} from "@mui/material";
import { getProducts, deleteProduct } from "../utils/api_products";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { AddToCart } from "../utils/cart";
import { API_URL } from "../utils/constants";
import { getCategories } from "../utils/api_categories";

export default function Products() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState("all");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getProducts(category, page).then((data) => {
            setProducts(data);
        });
    }, [category, page]);

    useEffect(() => {
        getCategories().then((data) => setCategories(data));
    }, []);

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
            <Header current="home" />
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
                            {categories.map((cat) => (
                                <MenuItem value={cat._id}>{cat.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid size={{ sm: 12, md: 6, lg: 4 }} key={product._id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={
                                        API_URL +
                                        (product.image
                                            ? product.image
                                            : "uploads/default_image.png")
                                    }
                                />
                                <CardContent sx={{ p: 3 }}>
                                    <Typography
                                        variant="h5"
                                        sx={{ minHeight: "64px" }}
                                    >
                                        {product.name}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            pt: 2,
                                        }}
                                    >
                                        <Chip
                                            label={"$" + product.price}
                                            color="success"
                                        />
                                        <Chip
                                            label={product.category ? product.category.label : ""}
                                            color="primary"
                                        />
                                    </Box>
                                </CardContent>
                                <CardActions
                                    sx={{ display: "block", px: 3, pb: 3 }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => addToCart(product)}
                                    >
                                        Add To Cart
                                    </Button>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            pt: 2,
                                            marginLeft: "0px !important",
                                        }}
                                    >
                                        <Button
                                            component={Link}
                                            to={`/products/${product._id}/edit`}
                                            variant="contained"
                                            color="info"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => {
                                                handleProductDelete(
                                                    product._id
                                                );
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </CardActions>
                            </Card>
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
