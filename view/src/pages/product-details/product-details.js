import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import withStyles from '@material-ui/core/styles/withStyles';
import Footer from '../../components/Footer/footer';
import ProductDetailsSection from '../../components/ProductDetailsSection/product-details-section';
import styles from './product-details.style';
import { Typography, Snackbar, CircularProgress, Box } from '@material-ui/core';
import MuiAlert from '@mui/material/Alert';
import { addToCart, setProductDetails, setStockAvailability } from '../../redux/Products/products.actions';
import { useHistory } from 'react-router-dom';
import ROUTES from '../../constants/routes-name';
import axios from 'axios';
import apiConfig from '../../api/api-config';
import { handleApiError } from '../../utils/error-handling';
import PRODUCT_TYPE from '../../constants/product-constants';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase/firebase';
import ProductCard from '../../components/ProductCard/product-card';
import { Rerousel } from 'rerousel';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const getClothGSM = (productCategory) => {
    if (productCategory === PRODUCT_TYPE.HST || productCategory === PRODUCT_TYPE.FST || productCategory === PRODUCT_TYPE.OST) {
        return 180;
    }

    return 320;
}

const ProductDetails = (props) => {
    const collabRef = useRef(null);
    const [addToCart, setAddToCart] = useState(false);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [additionalProducts, setAdditionalProducts] = useState([]);


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

        if (checkIfAlreadyExistInCart.length > 0) {
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
        try {
            const response = await axios.get(apiConfig.getStockAvailability);
            return response;
        }
        catch(err) {
            setLoading(false);
            handleApiError(history, err);
            return err;
        }
    }

    const callAdditionalProductsApi = async () => {
        try {
            const response = await axios.get(`${apiConfig.productListApi}/1?genreCategory=${productDetails.genreCategory}`);
            return response;
        }
        catch(err) {
            return {};
        }
    };

    const callStockAvailabilityAndAdditionalProductsApi = async () => {
        if (Object.keys(props.stockAvailability).length === 0) {
            try {
                const responses = [await callStockAvailabilityApi(), await callAdditionalProductsApi()];

                const stockAvailabilityResponse = responses[0];

                const additionalProductsResponse = responses[1];

                if (stockAvailabilityResponse && stockAvailabilityResponse.data && stockAvailabilityResponse.data.status === "success") {
                    props.setStockAvailability(stockAvailabilityResponse.data.stock);
                }

                if(additionalProductsResponse && additionalProductsResponse.data) {
                    if(additionalProductsResponse.data.length > 1) {
                        setAdditionalProducts(additionalProductsResponse.data);
                    }
                    else {
                        const response = await axios.get(`${apiConfig.productListApi}/1?productCategory=${productDetails.productCategory}`);
                        if(response && response.data && response.data.length > 0) {
                            setAdditionalProducts(response.data);
                        }
                    }
                }

                setLoading(false);
            }
            catch (err) {
                setLoading(false);
                handleApiError(history, err);
            }
        }
        else if(additionalProducts.length === 0) {
            try {
                const response = await axios.get(`${apiConfig.productListApi}/1?genreCategory=${productDetails.genreCategory}`);

                if(response && response.data) {
                    if(response.data.length > 1) {
                        setAdditionalProducts(response.data);
                    }
                    else {
                        const productGenreResponse = await axios.get(`${apiConfig.productListApi}/1?productCategory=${productDetails.productCategory}`);
                        if(productGenreResponse && productGenreResponse.data && productGenreResponse.data.length > 0) {
                            setAdditionalProducts(productGenreResponse.data);
                        }
                    }
                }
            }
            catch(err) {

            }
        }
        setLoading(false);
        window.scrollTo(0, 0);
    };

    const checkStockAvailability = (color, size) => {
        const productType = productDetails.productCategory || '';
        if (productType && color && size) {
            if (props.stockAvailability[productType] && Object.keys(props.stockAvailability[productType]).length > 0) {
                const variant = props.stockAvailability[productType];
                const colorKeyName = color.replaceAll(' ', '').toUpperCase();
                if (!variant[colorKeyName] || !variant[colorKeyName][size]) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        return false;
    };

    const renderAdditionalProducts = () => {
        return (
            <Rerousel itemRef={collabRef}>
                {
                    additionalProducts.map((item, i) => {
                        if(productDetails.productId !== item.productId) {
                            return (
                                <div key={i} className={classes.productCard} onClick={() => { props.setProductDetails(item); history.push(ROUTES.PRODUCT_DETAILS);}} ref={collabRef}>
                                    <ProductCard product={item} stylingWithoutMaxWidth={true} />
                                </div>
                            );
                        }
                        return <></>;
                    })
                }
            </Rerousel>
        )
    };

    useEffect(() => {
        callStockAvailabilityAndAdditionalProductsApi();
        logEvent(analytics, "screen_view", {
            firebase_screen: "Product Details Page",
            firebase_screen_class: "ProductDetails"
        });
    }, []);

    if (Object.keys(productDetails).length === 0) {
        history.push(ROUTES.HOME);
        return <></>;
    };

    return (
        <>
            <NavigationBar promotionBar={true} />

            <div className={classes.productDetailsWrapper}>
                {
                    isLoading ?
                        <>
                            <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
                                <CircularProgress />
                            </Box>
                        </>

                        :
                        <>
                            <div className={classes.productDetailsContainer}>
                                <ProductDetailsSection productDetails={productDetails} cart={props.cart} setAddToCart={addToCartButtonHandler} checkStockAvailability={checkStockAvailability} discountCodes={props.discountCodes} />
                            </div>

                            {/* <div className={classes.productDescriptionWrapper}>
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
                        </div> */}

                            <div className={classes.productFeature}>
                                <Typography variant="h5" className={classes.primaryFont}>Products you may like:</Typography>
                                {
                                    additionalProducts.length > 0 ? renderAdditionalProducts() : <Typography variant="body1">Sorry, something went wrong on our side!</Typography>
                                }
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
    const reduxStateGeneral = state.generalDetails.toJS();

    return {
        productDetails: reduxState.productDetails,
        cart: reduxState.cart,
        stockAvailability: reduxState.stockAvailability,
        discountCodes: reduxStateGeneral.discountCodes,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (cartItem) => dispatch(addToCart(cartItem)),
        setStockAvailability: (data) => dispatch(setStockAvailability(data)),
        setProductDetails: (productDetails) => dispatch(setProductDetails(productDetails)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductDetails));