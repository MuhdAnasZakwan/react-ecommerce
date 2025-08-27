import {
    Box,
    Button,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Link } from "react-router";
import { deleteItemFromCart } from "../utils/cart";
import { useNavigate } from "react-router";
import Header from "../components/Header";

const CartPage = () => {
    const navigate = useNavigate();

    const cartsLocalStorage = localStorage.getItem("carts");
    const carts = cartsLocalStorage ? JSON.parse(cartsLocalStorage) : [];

    let totalPrice = 0;
    const priceArray = carts.map((cart) => cart.price * cart.quantity);
    for (let i = 0; i < priceArray.length; i++) {
        totalPrice = totalPrice + priceArray[i];
    }

    return (
        <>
            <Header current="cart" title="Cart" />
            <Container sx={{ textAlign: "center" }}>
                <hr />
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>
                                    Product
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ fontWeight: 700 }}
                                >
                                    Price
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ fontWeight: 700 }}
                                >
                                    Quantity
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ fontWeight: 700 }}
                                >
                                    Total
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ fontWeight: 700 }}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {carts.length > 0 ? (
                                carts.map((cart) => (
                                    <TableRow key={cart.id}>
                                        <TableCell>{cart.name}</TableCell>
                                        <TableCell align="right">
                                            ${cart.price}
                                        </TableCell>
                                        <TableCell align="right">
                                            {cart.quantity}
                                        </TableCell>
                                        <TableCell align="right">
                                            $
                                            {(
                                                cart.price * cart.quantity
                                            ).toFixed(2)}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => {
                                                    deleteItemFromCart(cart.id);
                                                    navigate("/cart");
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell>No Products Added Yet</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            )}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ fontWeight: 700 }}
                                >
                                    ${totalPrice}
                                </TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
                >
                    <Button
                        variant="contained"
                        disabled={carts.length === 0}
                        color="primary"
                        component={Link}
                        to="/checkout"
                    >
                        Checkout
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default CartPage;
