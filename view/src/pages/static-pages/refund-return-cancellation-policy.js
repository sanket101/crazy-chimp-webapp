import React, { useEffect } from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './common.style';
import { Typography } from "@material-ui/core";
import NavigationBar from "../../components/NavigationBar/navigation-bar";
import Footer from "../../components/Footer/footer";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase/firebase";

const RefundReturnCancellationPolicy = (props) => {
    const { classes } = props;

    useEffect(() => {
        logEvent(analytics, "screen_view", {
            firebase_screen: "Return/Refund/Cancellation Policy Page",
            firebase_screen_class: "RefundReturnCancellationPolicy"
        });
    }, []);

    return (
        <>
            <NavigationBar />
            <div className={classes.pageWrapper}>
                <Typography variant="h3" className={classes.primaryFont}>Refund/Return/Cancellation policies</Typography>
                <br />
                <div className={classes.leftAlignment}>
                    <Typography variant="body1">Products can be only Exchanged and they are Non-Returnable.</Typography>
                    <br />
                    <Typography variant="body1">Products can only be exchanged if and only if there are any printing issues. Issues pertaining to sizes and other issues would not be entertained. To prevent this from happening please use the size chart provided on the product page.</Typography>
                    <br />
                    <Typography variant="body1">If your product does have any printing issue do contact us on our email: crazychimpofficial@gmail.com and include your order number to start the process for exchanging.</Typography>
                    <br />
                    <Typography variant="body1">Please note that if by any circumstances the customer is not available to pick up the order and asks for reshipping, we will charge Courier Fees (Pickup and delivery Fees) for the product.</Typography>
                    <br />
                    <Typography variant="body1">Please Note: Colours may slightly vary depending on your screen brightness and Colour Profiles.</Typography>
                    <br />
                    <Typography variant="body1">The customers cannot cancel the order once it is placed or printed.</Typography>
                    <br />
                    <Typography variant="body1">In case a customers cancels the order once it is printed or refuses to accept it, a cancellation fees of 50% of the item value will be charged.</Typography>
                    <br />
                    <Typography variant="body1">A product is ineligible for exchange if it is done beyond the 7 calendar day period, or if it is used or returned without original packaging. If we receive an inbound shipment for an ineligible exchange, goods will be recycled or discarded without notice. No exchanges or refunds will be applicable and an additional service fee may be charged. If you send an unauthorized in-bound shipment, we will be unable to serve you in the future.</Typography>
                    <br />
                    <Typography variant="body1">If you discover a manufacturing defect with a product you bought from our store, please send us an email at crazychimpofficial@gmail from the email you placed the order with. As a small business, we can not sustain and accept standard and defective product requests beyond 7 calendar days.</Typography>
                    <br />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default withStyles(styles)(RefundReturnCancellationPolicy);