import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Card, CardContent, Badge, Divider } from '@material-ui/core';
import styles from './invoice-display-card.style';

const InvoiceDisplayCard = (props) => {
    const { classes, invoice } = props;
    const orderDate = new Date(invoice.createdAt);

    const getOrderTotal = () => {
        let orderTotal = +invoice.productTotalAmount + +invoice.shippingAmount;
        if(invoice.paymentMethod === "cod") {
            orderTotal += +invoice.codAmount; 
        }
        if(invoice.discountCode) {
            orderTotal -= +invoice.discountAmount;
        }
        return orderTotal;
    };
    const orderTotal = getOrderTotal();
    const shippingAddress = `${invoice.shippingAddress.address}, ${invoice.shippingAddress.city}, ${invoice.shippingAddress.state} - ${invoice.shippingAddress.pincode}`;
    return (
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
                            <Typography variant='body1'>Status</Typography>
                            <Typography variant='h6' className={classes.primaryFont}>{invoice.status}</Typography>
                        </div>
                    </div>
                    <div className={classes.shippingDetails}>
                        <Typography variant='body1'>Shipping Address</Typography>
                        <Typography variant='h6' className={classes.primaryFont}>{shippingAddress}</Typography>
                    </div>
                    <div className={classes.dividerWrapper}>
                        <Divider />
                    </div>
                    
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
                </CardContent>
            </Card>
        </div>
    );
};

export default withStyles(styles)(InvoiceDisplayCard);