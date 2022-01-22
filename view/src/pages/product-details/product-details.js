import React, { useState } from 'react';
import { connect } from 'react-redux';
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import withStyles from '@material-ui/core/styles/withStyles';
import Footer from '../../components/Footer/footer';
import ProductDetailsSection from '../../components/ProductDetailsSection/product-details-section';
import styles from './product-details.style';
import { Typography, Snackbar } from '@material-ui/core';
import MuiAlert from '@mui/material/Alert';
import { addToCart } from '../../redux/Products/products.actions';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductDetails = (props) => {
    const [addToCart, setAddToCart] = useState(false);
    const { classes, productDetails } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAddToCart(false);
    };

    const addToCartButtonHandler = (color, size, qty) => {
        const newOrder = {
            color,
            size,
            qty,
            productDetails
        };
        props.addToCart(newOrder);
        setAddToCart(true);
    };

    return (
        <>
            <NavigationBar />

            <div className={classes.productDetailsWrapper}>

                <div className={classes.productDetailsContainer}>
                    <ProductDetailsSection productDetails={productDetails} cart={props.cart} setAddToCart={addToCartButtonHandler} />
                </div>

                <div className={classes.productDescriptionWrapper}>
                    <div className={classes.productFeature}>
                        <Typography variant="h5" className={classes.primaryFont}>PURE COTTON</Typography>
                        <Typography variant="body1" className={classes.secondaryFont}>100% combed cotton with single jersey to make it wrinkle-free and smooth. Doesn’t let you feel hot!</Typography>
                    </div>

                    <div className={classes.productFeature}>
                        <Typography variant="h5" className={classes.primaryFont}>DURABLE FABRIC</Typography>
                        <Typography variant="body1" className={classes.secondaryFont}>180 gsm bio-washed material for a soft and silky fabric finish, along with superior colour brightness. Lasts up to 30 washes.</Typography>
                    </div>

                    <div className={classes.productFeature}>
                        <Typography variant="h5" className={classes.primaryFont}>ULTIMATE PRINTS</Typography>
                        <Typography variant="body1" className={classes.secondaryFont}>Inks used here to make sure your printed designs are stretch resistant. No ‘hide and seek’ with the design.</Typography>
                    </div>
                </div>

                {addToCart && <Snackbar open={addToCart} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Product added to cart!
                    </Alert>
                </Snackbar>}
            </div>

            <Footer />
        </>
    );
};

const mapStateToProps = (state) => {
    const reduxState = state.productDetails.toJS();
	return {
        productDetails: reduxState.productDetails,
        cart: reduxState.cart
    };
};
  
const mapDispatchToProps = dispatch => {
	return {
        addToCart: (cartItem) => dispatch(addToCart(cartItem))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductDetails));