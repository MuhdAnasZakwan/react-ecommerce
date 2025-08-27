import {
    Box,
    Button,
    Container,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Backdrop,
    CircularProgress,
} from "@mui/material";
import { deleteItemFromCart } from "../utils/cart";
import { Link } from "react-router";
import Header from "../components/Header";
import { useState } from "react";
import { toast } from "sonner";
import validator from "email-validator";
import { createOrder } from "../utils/api_orders";

const CheckoutPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const cartsLocalStorage = localStorage.getItem("carts");
    const carts = cartsLocalStorage ? JSON.parse(cartsLocalStorage) : [];

    let totalPrice = 0;
    const priceArray = carts.map((cart) => cart.price * cart.quantity);
    for (let i = 0; i < priceArray.length; i++) {
        totalPrice = totalPrice + priceArray[i];
    }

    const handleCheckout = async () => {
        if (!name || !email) {
            toast.error("Please fill up all the fields");
        } else if (!validator.validate(email)) {
            toast.error("Please use a valid email address");
        } else {
            try {
                setLoading(true);
                const totalCartPrice = totalPrice;
                const response = await createOrder(
                    name,
                    email,
                    carts,
                    totalCartPrice
                );
                const billplz_url = response.billplz_url;
                window.location.href = billplz_url;
            } catch (error) {
                console.log(error);
                toast.error(error.message);
                setLoading(false);
            }
        }
    };

    return (
        <>
            <Header current="checkout" title="Checkout" />
            <hr />
            <Container maxWidth="lg" sx={{ textAlign: "center" }}>
                <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
                        <Typography variant="h5">
                            Contact Information
                        </Typography>
                        <Box mb={2}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleCheckout}
                            >
                                Pay ${totalPrice}
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
                        <Typography variant="h5">Order Summary</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700 }}>
                                            Product
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{ fontWeight: 700 }}
                                        >
                                            Total
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {carts.length > 0 ? (
                                        carts.map((cart) => (
                                            <TableRow key={cart.id}>
                                                <TableCell>
                                                    {cart.name}
                                                </TableCell>
                                                <TableCell align="right">
                                                    $
                                                    {(
                                                        cart.price *
                                                        cart.quantity
                                                    ).toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell>
                                                No Products Added Yet
                                            </TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    )}
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{ fontWeight: 700 }}
                                        >
                                            ${totalPrice}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Container>

            <Backdrop
                sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default CheckoutPage;
