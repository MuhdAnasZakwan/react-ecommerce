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
    Chip,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { addProduct } from "../utils/api_products";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import { uploadImage } from "../utils/api_image";
import { API_URL } from "../utils/constants";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const ProductAdd = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    const handleFormSubmit = async (event) => {
        // check error
        if (!name || !price || !category) {
            toast.error("Please fill up the required fields");
        }
        try {
            // trigger API addProduct
            await addProduct(name, description, price, category, image);
            // redirect if successful, show success message
            toast.success("New product has been added");
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Header />
            <Container maxWidth="sm">
                <hr />
                <Typography variant="h3" align="center" mb={3}>
                    Add New Product
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
                <Box mb={2} sx={{display: "flex", gap: "10px", alignItems: "center"}}>
                    { image ? (
                        <>
                        <img src={API_URL + image} width="200px"/>
                        <Button color="info" variant="contained" size="small" onClick={() => setImage(null)}>
                            Remove
                        </Button>
                        </>
                    ) : (
                        <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={async (event) => {
                                const data = await uploadImage(event.target.files[0]);
                                setImage(data.image_url);
                            }}
                            accept="image/*"
                        />
                    </Button>
                    )}
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={handleFormSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default ProductAdd;
