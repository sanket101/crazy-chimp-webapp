import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import withStyles from '@material-ui/core/styles/withStyles';
import Footer from '../../components/Footer/footer';
import ProductDetailsSection from '../../components/ProductDetailsSection/product-details-section';
import styles from './product-details.style';
import { Typography, Snackbar, CircularProgress, Box } from '@material-ui/core';
import MuiAlert from '@mui/material/Alert';
import { addToCart, setStockAvailability } from '../../redux/Products/products.actions';
import { useHistory } from 'react-router-dom';
import ROUTES from '../../constants/routes-name';
import axios from 'axios';
import apiConfig from '../../api/api-config';
import { handleApiError } from '../../utils/error-handling';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const getClothGSM = (productCategory) => {
    if(productCategory === "HST" || productCategory === "FST") {
        return 180;
    }

    return 320;
}

const ProductDetails = (props) => {
    const [addToCart, setAddToCart] = useState(false);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const { classes, productDetails } = props;
    let history = useHistory();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAddToCart(false);
    };

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlreadyAdded(false);
    };

    const addToCartButtonHandler = (color, size, qty) => {
        const newOrder = {
            color,
            size,
            qty,
            productDetails
        };
        const checkIfAlreadyExistInCart = props.cart.filter((item, index) => {
            return item.color === color && item.size === size && item.productDetails?.productId === productDetails?.productId
        });

        if(checkIfAlreadyExistInCart.length > 0) {
            setAlreadyAdded(true);
            setAddToCart(false);
        }
        else {
            props.addToCart(newOrder);
            setAddToCart(true);
            setAlreadyAdded(false);
        }
    };

    const callStockAvailabilityApi = async () => {
        if(Object.keys(props.stockAvailability).length === 0) {
            try {
                const response = await axios.get(apiConfig.getStockAvailability);

                if(response && response.data && response.data.status === "success") {
                    props.setStockAvailability(response.data.stock);
                }

                setLoading(false);
            }
            catch(err) {
                setLoading(false);
                handleApiError(history, err);
            }
        }
        setLoading(false);
        window.scrollTo(0, 0);
    };

    const checkStockAvailability = (color, size) => {
        const productType = productDetails.productCategory || '';
        if(productType && color && size) {
            if(props.stockAvailability[productType] && Object.keys(props.stockAvailability[productType]).length > 0){
                const variant = props.stockAvailability[productType];
                const colorKeyName = color.replaceAll(' ', '').toUpperCase();
                if(!variant[colorKeyName] || !variant[colorKeyName][size]) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        return false;
    };

    useEffect(() => {
        callStockAvailabilityApi();
    }, []);

    if(Object.keys(productDetails).length === 0) {
        history.push(ROUTES.HOME);
        return <></>;
    };

    return (
        <>
            <NavigationBar />

            <div className={classes.productDetailsWrapper}>
                {
                    isLoading ?
                    <>
                         <Box sx={{textAlign: 'center'}}>
                            <CircularProgress />
                        </Box>
                    </>

                    :
                    <>
                        <div className={classes.productDetailsContainer}>
                            <ProductDetailsSection productDetails={productDetails} cart={props.cart} setAddToCart={addToCartButtonHandler} checkStockAvailability={checkStockAvailability} />
                        </div>

                        <div className={classes.productDescriptionWrapper}>
                            <div className={classes.productFeature}>
                                <Typography variant="h5" className={classes.primaryFont}>PURE COTTON</Typography>
                                <Typography variant="body1" className={classes.secondaryFont}>100% combed cotton with single jersey to make it wrinkle-free and smooth. Doesn’t let you feel hot!</Typography>
                            </div>

                            <div className={classes.productFeature}>
                                <Typography variant="h5" className={classes.primaryFont}>DURABLE FABRIC</Typography>
                                <Typography variant="body1" className={classes.secondaryFont}>{`${getClothGSM(productDetails.productCategory)} gsm bio-washed material for a soft and silky fabric finish, along with superior colour brightness. Lasts up to 30 washes.`}</Typography>
                            </div>

                            <div className={classes.productFeature}>
                                <Typography variant="h5" className={classes.primaryFont}>ULTIMATE PRINTS</Typography>
                                <Typography variant="body1" className={classes.secondaryFont}>Special Inks are used here to make sure your printed designs are stretch resistant. We use one of the finest DTF printing method to make designs durable.</Typography>
                            </div>
                        </div>

                        {addToCart && <Snackbar open={addToCart} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Product added to cart!
                            </Alert>
                        </Snackbar>}

                        {alreadyAdded && <Snackbar open={alreadyAdded} autoHideDuration={4000} onClose={handleErrorClose}>
                            <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                                Product already added to cart!
                            </Alert>
                        </Snackbar>}
                    </>
                }
            </div>

            <Footer />
        </>
    );
};

const mapStateToProps = (state) => {
    const reduxState = state.productDetails.toJS();
	return {
        productDetails: reduxState.productDetails,
        cart: reduxState.cart,
        stockAvailability: reduxState.stockAvailability
    };
};
  
const mapDispatchToProps = dispatch => {
	return {
        addToCart: (cartItem) => dispatch(addToCart(cartItem)),
        setStockAvailability: (data) => dispatch(setStockAvailability(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductDetails));