import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Card, CardContent, Badge, Divider, Link, CardActions, Collapse, IconButton, Button, Modal, Box, TextField, CircularProgress } from '@material-ui/core';
import styles from './invoice-display-card.style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { Rating } from '@mui/material';
import axios from 'axios';
import apiConfig from '../../api/api-config';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const InvoiceDisplayCard = (props) => {
    const { classes, invoice } = props;
    const orderDate = new Date(invoice.createdAt);
    const [expanded, setExpanded] = useState(false);
    const [openModal, setModal]= useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const [reviewImage, setReviewImage] = useState({});
    const [reviewDesc, setReviewDesc] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [reviewSubmitted, setReviewSubmitted] = useState('');

    const getOrderTotal = () => {
        let orderTotal = +invoice.productTotalAmount + +invoice.shippingAmount;
        if (invoice.paymentMethod === "cod") {
            orderTotal += +invoice.codAmount;
        }
        if (invoice.discountCode) {
            orderTotal -= +invoice.discountAmount;
        }
        return orderTotal;
    };

    const handleFileChange = (e) => {
        const img = {
          preview: URL.createObjectURL(e.target.files[0]),
          data: e.target.files[0],
        }
        setReviewImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("image", reviewImage);
        const data = { rating: ratingValue, review: reviewDesc };
        const jsonString = JSON.stringify(data);
        const encodedJsonString = encodeURIComponent(jsonString);
        try {
            const response = await axios.post(`${apiConfig.updateInvoiceWithReview}?invoiceId=${invoice.id}&jsonData=${encodedJsonString}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            if(response && response.data && response.data.message) {
                console.log("Success");
                setReviewSubmitted("SUCCESS");
                setLoading(false);
                const newInvoice = {...invoice, ...data };
                props.updateUserInvoices(props.index, newInvoice);
                setInterval(() => {
                    setModal(false);
                }, 2000);
            }
            else {
                console.log("Error");
                setReviewSubmitted("ERROR");
                setLoading(false);
                setInterval(() => {
                    setModal(false);
                }, 2000);
            }
        }
        catch(err) {
            setReviewSubmitted("ERROR");
            setLoading(false);
            console.log('Error while uploading', err);
            setInterval(() => {
                setModal(false);
            }, 2000);
        }
    };

    const orderTotal = getOrderTotal();
    const shippingAddress = `${invoice.shippingAddress.address}, ${invoice.shippingAddress.city}, ${invoice.shippingAddress.state} - ${invoice.shippingAddress.pincode}`;
    return (
        <>
        <div className={classes.invoiceCardWrapper}>
            <Card>
                <CardContent>
                    <div className={classes.invoiceDetails}>
                        <div className={classes.sidePadding}>
                            <Typography variant='body1'>Order Placed</Typography>
                            <Typography variant='h6' className={classes.primaryFont}>{orderDate.toDateString()}</Typography>
                        </div>
                        <div className={classes.sidePadding}>
                            <Typography variant='body1'>Total Amount</Typography>
                            <Typography variant='h6' className={classes.primaryFont}>{`₹ ${orderTotal}`}</Typography>
                        </div>
                        <div className={classes.sidePadding}>
                            <Typography variant='body1'>Id</Typography>
                            <Typography variant='h6' className={classes.primaryFont}>{invoice.id}</Typography>
                        </div>
                        <div className={classes.sidePadding}>
                            <Typography variant='body1'>Status</Typography>
                            <Typography variant='h6' className={classes.primaryFont}>{invoice.status}</Typography>
                        </div>
                    </div>
                    <div className={classes.shippingDetails}>
                        <Typography variant='body1'>Shipping Address</Typography>
                        <Typography variant='h6' className={classes.primaryFont}>{shippingAddress}</Typography>
                    </div>
                    {invoice.trackingLink && <div className={classes.shippingDetails}>
                        <Typography variant='body1'>Tracking Link</Typography>
                        <Link variant='h6' className={classes.primaryFont} href={invoice.trackingLink} target="_blank">{invoice.trackingLink}</Link>
                    </div>}

                    <div className={classes.buttonWrapper}>
                        {invoice.status === "DELIVERED" && !invoice.rating ? <Button variant="contained" className={classes.shopNowButton} onClick={() => setModal(true)}>Review</Button> : <></>}
                        <Button variant="contained" className={classes.shopNowButton} href={`mailto:assist.crazychimp@gmail.com?subject=Query regarding Order:${invoice.id}`}>Query</Button>
                    </div>

                    {invoice.status === "DELIVERED" && !invoice.rating ? <div><Typography variant='body1'>* Get a chance to earn upto Rs.150 off on your next order by reviewing our products!</Typography></div> : <></>}

                    {/* <div className={classes.dividerWrapper}>
                        <Divider />
                    </div> */}

                    {/* <div className={classes.issueWrapper}>
                        <Link variant="body2" className={classes.secondaryFont} href="mailto:assist.crazychimp@gmail.com" >Having some trouble with the delivered product? Please click here or mail us at assist.crazychimp@gmail.com</Link>
                    </div> */}
                </CardContent>
                <CardActions>
                <ExpandMore
                    expand={expanded}
                    onClick={() => {
                        setExpanded(!expanded)
                    }}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                <div className={classes.ordersWrapper}>
                        {invoice.orders.map((order, index) => {
                            return (
                                <div key={index} className={classes.orderWrapper}>
                                    <Badge badgeContent={order.quantity} color="primary">
                                        <img alt={order.productName} src={order.productImage} height="60px" loading="lazy" />
                                    </Badge>
                                    <div>
                                        <Typography variant="body1">{order.productName}</Typography>
                                        <Typography variant="body2">{`${order.color}/${order.size}`}</Typography>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    </Collapse>
            </Card>
        </div>
        <Modal
                open={openModal}
                onClose={() => setModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box className={classes.modalBoxWrapper}>
                    {!reviewSubmitted ? 
                        <form onSubmit={handleSubmit} enctype="multipart/form-data">
                            <div className={classes.ratingWrapper}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Rate our order
                                </Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={ratingValue}
                                    onChange={(event, newValue) => {
                                        setRatingValue(newValue);
                                    }}
                                    precision={0.5}
                                />
                            </div>
                            {/* <Button
                                variant="contained"
                                component="label"
                                >
                                Upload File
                            </Button> */}
                            <div className={classes.reviewSection}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Upload file
                                </Typography>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
                            <div className={classes.reviewSection}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Write a feedback..."
                                    multiline
                                    rows={4}
                                    value={reviewDesc}
                                    onChange={(event) => setReviewDesc(event.target.value)}
                                />
                            </div>
                            {isLoading ? <CircularProgress size={30} className={classes.progess} /> : <Button variant="contained" className={classes.shopNowButton} type="submit">Submit</Button>}

                        </form>
                    :
                        reviewSubmitted === "SUCCESS" ?  <Typography id="modal-modal-title" variant="h6" component="h2">Thank you, we have received your review!</Typography> :
                        <Typography id="modal-modal-title" variant="h6" component="h2">There seems to be some issue with our servers. Please try again after sometime!</Typography>
                    } 
                </Box>
            </Modal>
        </>
    );
};

export default withStyles(styles)(InvoiceDisplayCard);