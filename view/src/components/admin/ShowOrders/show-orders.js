import React, { useEffect, useState } from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './show-orders.style';
import { Container, CssBaseline, TextField, Typography, Avatar, Button, Modal, CircularProgress, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@material-ui/core";
import ReceiptIcon from '@mui/icons-material/Receipt';
import { authMiddleWare } from "../../../utils/auth";
import { useHistory } from "react-router-dom";
import axios from "axios";
import apiConfig from "../../../api/api-config";
import { handleApiError } from "../../../utils/error-handling";
import SendIcon from '@mui/icons-material/Send';

const ShowOrders = (props) => {
    const { classes } = props;
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [isLoading, setLoading] = useState(true);
    const [invoices, setInvoices] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [activeInvoice, setActiveInvoice] = useState({});

    let history = useHistory();

    const callInvoicesByDateApi = async () => {
        try {
            authMiddleWare(history);
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            const requestPayload = {
                date
            };
            const response = await axios.post(apiConfig.getInvoiceByDate, requestPayload);
            if(response && response.data && response.data.length > 0) {
                //Save Invoice
                setInvoices(response.data);
            }
            setLoading(false);
        }
        catch(err) {
            setLoading(false);
            handleApiError(history, err);
        }
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const getTotal = () => {
        return +activeInvoice.productTotalAmount + +activeInvoice.shippingAmount + +activeInvoice.codAmount - +activeInvoice.discountAmount;
    };

    const renderModal = () => {
        return (
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.modalContentWrapper}>
                    <div className={classes.flexContent}>
                        <div>
                            <Typography variant="body1">Placed on</Typography>
                            <Typography variant="h6">{activeInvoice.createdAt}</Typography>
                        </div>

                        <div>
                            <Typography variant="body1">Method</Typography>
                            <Typography variant="h6">{activeInvoice.paymentMethod}</Typography>
                        </div>

                        <div>
                            <Typography variant="body1">Status</Typography>
                            <Typography variant="h6">{activeInvoice.status}</Typography>
                        </div>
                    </div>

                    <div className={classes.flexContent}>
                        <div>
                            <Typography variant="body1">Product Amount</Typography>
                            <Typography variant="h6">₹ {activeInvoice.productTotalAmount}</Typography>
                        </div>

                        <div>
                            <Typography variant="body1">Shipping Amount</Typography>
                            <Typography variant="h6">₹ {activeInvoice.shippingAmount}</Typography>
                        </div>

                        <div>
                            <Typography variant="body1">Cod Amount</Typography>
                            <Typography variant="h6">₹ {activeInvoice.codAmount}</Typography>
                        </div>
                
                        <div>
                            <Typography variant="body1">Discount Code</Typography>
                            <Typography variant="h6">{activeInvoice.discountCode}</Typography>
                        </div>

                        <div>
                            <Typography variant="body1">Discount Amount</Typography>
                            <Typography variant="h6">₹ {activeInvoice.discountAmount}</Typography>
                        </div>

                        <div>
                            <Typography variant="body1">Total Amount</Typography>
                            <Typography variant="h6">₹ {getTotal()}</Typography>
                        </div>
                    </div>

                    <div>
                        <Typography variant="body1">Customer Name - Mobile Number</Typography>
                        <Typography variant="h6">{`${activeInvoice.shippingAddress.name} - ${activeInvoice.shippingAddress.phone}`}</Typography>

                        <br />

                        <Typography variant="body1">Shipping Address</Typography>
                        <Typography variant="h6">{`${activeInvoice.shippingAddress.address}, ${activeInvoice.shippingAddress.city}, ${activeInvoice.shippingAddress.state} - ${activeInvoice.shippingAddress.pincode}`}</Typography>
                    </div>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 750 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center">Product Name</TableCell>
                                    <TableCell align="center">Size / Qty</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {activeInvoice.orders.map((order, index) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                <img src={order.productImage} alt="product-image" width="40px" />
                                            </TableCell>
                                            <TableCell align="center">{order.productName}</TableCell>
                                            <TableCell align="center">{`${order.size }/${order.quantity}`}</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
        );
    };

    const checkInvoiceDetails = (userInvoice) => {
        setActiveInvoice(userInvoice);
        setOpenModal(true);
    };

    useEffect(() => {
        callInvoicesByDateApi();
    }, []);

    return (
        <>
            {/* <CssBaseline /> */}
            {isLoading ?
                <CircularProgress />
                :
                <div className={classes.paper}>
                    {/* <Avatar className={classes.avatar}>
                        <ReceiptIcon />
                    </Avatar> */}
                    <Typography variant="h6">Orders</Typography>

                    <div className={classes.dateWrapper}>
                        <TextField type="date" label="Date" variant="outlined" value={date} onChange={(event) => setDate(new Date(event.target.value).toISOString().split('T')[0])}/>

                        <Button 
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                                Apply
                        </Button>
                    </div>

                    {invoices.length === 0 ? 
                        <Typography variant="h6">No Orders found on this date!</Typography>
                        :
                        <>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 750 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Placed On</TableCell>
                                            <TableCell align="center">Customer Name</TableCell>
                                            <TableCell align="center">Status</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {invoices.map((userInvoice, index) => {
                                        return (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align="center">
                                                    {userInvoice.createdAt}
                                                </TableCell>
                                                <TableCell align="center">{userInvoice.shippingAddress.name}</TableCell>
                                                <TableCell align="center">{userInvoice.status}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton onClick={() => checkInvoiceDetails(userInvoice)}><SendIcon /></IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {openModal && renderModal()}
                        </>
                    }
                </div>
            }
        </>
    );
};

export default withStyles(styles)(ShowOrders);