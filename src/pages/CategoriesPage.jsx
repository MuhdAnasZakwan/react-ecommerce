import {
    Box,
    Button,
    Container,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    addCategory,
    deleteCategory,
    getCategories,
    updateCategory,
} from "../utils/api_categories";
import Swal from "sweetalert2";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const CategoriesPage = () => {
    const navigate = useNavigate();
    const [label, setLabel] = useState("");
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCategoryID, setSelectedCategoryID] = useState("");
    const [selectedCategoryLabel, setSelectedCategoryLabel] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getCategories(categories).then((data) => {
            setCategories(data);
        });
    }, [categories]);

    const handleAddCategory = async (event) => {
        if (!label) {
            toast.error("Pleae fill up the required fields");
        }
        try {
            await addCategory(label);
            toast.success("New category has been added");
            navigate("/categories");
            setLabel("");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDeleteCategory = async (_id) => {
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
                await deleteCategory(_id);
                const updatedCategories = await getCategories();
                setCategories(updatedCategories);
                toast.success("Category has been deleted");
            }
        });
    };

    const handleUpdateCategory = async (_id, label) => {
        if (!label) {
            toast.error("Please fill up the required field");
        }
        try {
            await updateCategory(_id, label);
            toast.success("Cateogry has been updated");
            navigate("/categories");
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <Header current="categories" title="Manage Categories" />
            <Container maxWidth="lg">
                <hr />
                <Typography variant="h5">Categories</Typography>
                <Paper
                    elevation={2}
                    sx={{ m: 3, p: 2, display: "flex", gap: 2 }}
                >
                    <TextField
                        label="Category Name"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        fullWidth
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={(event) =>
                            handleAddCategory(event.target.value)
                        }
                    >
                        Add
                    </Button>
                </Paper>
                <Paper elevation={2} sx={{ m: 3, p: 2 }}>
                    <Table fullWidth>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>
                                    Name
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ fontWeight: 700 }}
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category._id}>
                                    <TableCell>{category.label}</TableCell>
                                    <TableCell
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            gap: 2,
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                setOpen(true);
                                                setSelectedCategoryID(category._id);
                                                setSelectedCategoryLabel(category.label);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => {
                                                handleDeleteCategory(
                                                    category._id
                                                );
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                    <Modal open={open} onClose={handleClose}>
                                        <Box sx={style}>
                                            <Typography variant="h4">
                                                Edit Category
                                            </Typography>
                                            <TextField
                                                value={selectedCategoryLabel}
                                                fullWidth
                                                onChange={(e) => setSelectedCategoryLabel(e.target.value)}
                                            />
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    gap: 1,
                                                    mt: 3,
                                                }}
                                            >
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => {
                                                        handleUpdateCategory(selectedCategoryID, selectedCategoryLabel);
                                                        setOpen(false);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    color="error"
                                                    variant="contained"
                                                    onClick={handleClose}
                                                >
                                                    Close
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Modal>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        </>
    );
};

export default CategoriesPage;
