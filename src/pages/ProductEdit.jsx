import Header from "../components/Header";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { updateProduct, getProduct } from "../utils/api_products";
import { toast } from "sonner";
import { useNavigate, useParams, Link } from "react-router";

const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null);

    // load data from API
    useEffect(() => {
        getProduct(id)
            .then((productData) => {
                if (productData) {
                    setName(productData ? productData.name : "");
                    setDescription(productData ? productData.description : "");
                    setPrice(productData ? productData.price : 0);
                    setCategory(productData ? productData.category : "");
                } else {
                    setError("Product not found");
                }
            })
            .catch((error) => {
                setError("Product not found");
            });
    }, [id]);

    const handleFormSubmit = async (event) => {
        // check error
        if (!name || !price || !category) {
            toast.error("Please fill up the required fields");
        }
        try {
            // trigger API addProduct
            await updateProduct(id, name, description, price, category);
            // redirect if successful, show success message
            toast.success("Product has been updated");
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (error) {
        return (
            <>
                <Header />
                <Container maxWidth="sm" sx={{ textAlign: "center" }}>
                    <hr />
                    <Typography
                        variant="h3"
                        align="center"
                        mb={2}
                        color="error"
                    >
                        {error}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/"
                    >
                        Go back to home
                    </Button>
                </Container>
            </>
        );
    }

    return (
        <>
            <Header />
            <Container maxWidth="sm">
                <hr />
                <Typography variant="h3" align="center" mb={3}>
                    Edit Product
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        type="number"
                        label="Price"
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="categories-label">Category</InputLabel>
                        <Select
                            labelId="categories-label"
                            id="category"
                            value={category}
                            label="Category"
                            onChange={(event) => {
                                setCategory(event.target.value);
                            }}
                        >
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
                <Box sx={{ mb: 2 }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={handleFormSubmit}
                    >
                        Update
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default ProductEdit;
