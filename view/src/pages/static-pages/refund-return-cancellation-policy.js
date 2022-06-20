import React from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './common.style';
import { Typography } from "@material-ui/core";
import NavigationBar from "../../components/NavigationBar/navigation-bar";
import Footer from "../../components/Footer/footer";

const RefundReturnCancellationPolicy = (props) => {
    const { classes } = props;
    return (
        <>
            <NavigationBar />
            <div className={classes.pageWrapper}>
                <Typography variant="h3" className={classes.primaryFont}>Refund/Return/Cancellation policies</Typography>
                <br />
                <div className={classes.leftAlignment}>
                    <Typography variant="body1">Your first order is covered under our 100% Satisfaction Guarantee. If you are not Satisfied with our product. Contact us on our email: crazychimpofficial@gmail.com and include your order number to start the process. </Typography>
                    <br />
                    <Typography variant="body1">Products can be only Exchanged and they are Non-Returnable (Except for First Time Customer)</Typography>
                    <br />
                    <Typography variant="body1">*Please note that We will charge Courier Fees (Pickup and delivery Fees) for product replacement/Returns if there is a size issue or Personal Issues, To prevent this from happening please use the size chart provided on the product page.</Typography>
                    <br />
                    <Typography variant="body1">COD Orders will only be Refunded as Store Credits.</Typography>
                    <br />
                    <Typography variant="body1">Please Note: Colours may slightly vary depending on your screen brightness and Colour Profiles.</Typography>
                    <br />
                    <Typography variant="body1">Note: Full print tees are non-returnable and non-exchangeable.</Typography>
                    <br />
                    <Typography variant="body1">In case a customers cancels the order once it is printed or refuses to accept it, a cancellation fees of 50% of the item value will be charged.</Typography>
                    <br />
                    <Typography variant="body1">A product is ineligible for exchange if it is done beyond the 7 calendar day period, or if it is used or returned without original packaging. If we receive an inbound shipment for an ineligible exchange, goods will be recycled or discarded without notice. No exchanges or refunds will be applicable and an additional service fee may be charged. If you send an unauthorized in-bound shipment, we will be unable to serve you in the future.</Typography>
                    <br />
                    <Typography variant="body1">If you discover a manufacturing defect with a product you bought from our store, please send us an email at Support@harsido.com from the email you placed the order with. As a small business, we can not sustain and accept standard and defective product requests beyond 7 calendar days.</Typography>
                    <br />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default withStyles(styles)(RefundReturnCancellationPolicy);