import React, { useEffect } from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './common.style';
import { Typography } from "@material-ui/core";
import NavigationBar from "../../components/NavigationBar/navigation-bar";
import Footer from "../../components/Footer/footer";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase/firebase";

const DiscountPage = (props) => {
    const { classes } = props;

    useEffect(() => {
        logEvent(analytics, "screen_view", {
            firebase_screen: "Discount Page",
            firebase_screen_class: "DiscountPage"
        });
    }, []);

    return (
        <>
            <NavigationBar />
            <div className={classes.pageWrapper}>
                <Typography variant="h4" className={classes.primaryFont}>Discounts available!</Typography>
                <br />
                <div className={classes.leftAlignment}>
                    <div>
                        <Typography variant="h6" className={classes.primaryFont}>Earn Free Product Offer</Typography>
                        <Typography variant="body1" className={classes.primaryFont}>Challenge Details: </Typography>
                        <ul className={classes.listWrapper}>
                            <li><Typography variant="body1">Purchase: Buy six products from our diverse range of categories.</Typography></li>
                            <li><Typography variant="body1">Variety: Select products from different categories to make it even more exciting and discover new favorites along the way.</Typography></li>
                            <li><Typography variant="body1">Categories: Explore our extensive collection, including clothing, accessories, and more.</Typography></li>
                            <li><Typography variant="body1">Free Product: Once you've completed your purchase of six products, you will be eligible to get a free product from a specified selection.</Typography></li>
                        </ul>
                        <br />
                        <Typography variant="body1" className={classes.primaryFont}>How to Participate: </Typography>
                        <ul className={classes.listWrapper}>
                            <li><Typography variant="body1">Browse our website and select six products that catch your eye from different categories.</Typography></li>
                            <li><Typography variant="body1">Add the selected products to your shopping cart.</Typography></li>
                            <li><Typography variant="body1">Proceed to the checkout page.</Typography></li>
                            <li><Typography variant="body1">Complete the purchase of the six products.</Typography></li>
                            <li><Typography variant="body1">After completing your purchase, you will receive instructions on how to choose your free product from the eligible selection.</Typography></li>
                            <li><Typography variant="body1">Enjoy your free product!</Typography></li>
                        </ul>
                        <br />

                        <Typography variant="body1" className={classes.primaryFont}>Terms and Conditions:</Typography>
                        <ul className={classes.listWrapper}>
                            <li><Typography variant="body1">The challenge requires the purchase of six products from different categories to be eligible for the free product.</Typography></li>
                            <li><Typography variant="body1">The free product selection will be from a specific list of eligible items.</Typography></li>
                            <li><Typography variant="body1">The value of the free product may vary based on availability and the original purchase value.</Typography></li>
                            <li><Typography variant="body1">This offer cannot be combined with any other promotions or discounts.</Typography></li>
                            <li><Typography variant="body1">The challenge is valid for online orders placed through our website.</Typography></li>
                            <li><Typography variant="body1">We reserve the right to modify or terminate the challenge at any time without prior notice.</Typography></li>
                        </ul>
                        <br />

                        <Typography variant="body1">Get ready to embrace the challenge, shop for amazing products, and enjoy the thrill of receiving a free item! Explore our wide variety of categories, mix and match your purchases, and uncover fantastic finds along the way.</Typography>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default withStyles(styles)(DiscountPage);