import { useState, useEffect } from "react";
import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import Header from "../components/Header";
import { deleteOrder, getOrders, updateOrder } from "../utils/api_orders";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getOrders()
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleUpdate = async (_id, status) => {
        try {
            // trigger API addProduct
            await updateOrder(_id, status);
            // redirect if successful, show success message
            toast.success("Status has been updated");
            navigate("/orders");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDelete = async (_id) => {
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
                await deleteOrder(_id);

                const updatedOrders = await getOrders(_id);
                setOrders(updatedOrders);

                toast.success("Order has been deleted");
            }
        });
    };

    console.log(orders);

    return (
        <>
            <Header current="orders" title="My Orders" />
            <Container maxWidth="lg">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Customer</TableCell>
                                <TableCell>Products</TableCell>
                                <TableCell>Total Amount</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Payment Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow
                                    key={order.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Typography>
                                            {order.customerName}
                                        </Typography>
                                        <Typography>
                                            ({order.customerEmail})
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {order.products.map((product) => (
                                            <Typography>
                                                {product.name}
                                            </Typography>
                                        ))}
                                    </TableCell>
                                    <TableCell>{order.totalPrice}</TableCell>
                                    <TableCell>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">
                                                Status
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Status"
                                                defaultValue={order.status}
                                                disabled={
                                                    order.status === "pending"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(event) =>
                                                    handleUpdate(
                                                        order._id,
                                                        event.target.value
                                                    )
                                                }
                                            >
                                                <MenuItem
                                                    value={"pending"}
                                                    disabled
                                                >
                                                    Pending
                                                </MenuItem>
                                                <MenuItem value={"paid"}>
                                                    Paid
                                                </MenuItem>
                                                <MenuItem value={"failed"}>
                                                    Failed
                                                </MenuItem>
                                                <MenuItem value={"completed"}>
                                                    Completed
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>{order.paid_at}</TableCell>
                                    <TableCell>
                                        {order.status === "pending" ? (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleDelete(order._id)}
                                            >
                                                Delete
                                            </Button>
                                        ) : (
                                            ""
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
};

export default OrdersPage;
