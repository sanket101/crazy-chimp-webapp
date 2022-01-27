import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import Footer from '../../components/Footer/footer';
import CustomerInformationSection from '../../components/CustomerInformationSection/customer-information-section';
import ShippingPaymentSection from '../../components/ShippingPaymentSection/shipping-payment-section';
import OrderConfirmationSection from '../../components/OrderConfirmationSection/order-confirmation-section';
import { Stepper, Step, StepLabel, Typography, Box, Button, Badge, Divider, TextField, CircularProgress, Backdrop } from '@material-ui/core';
import styles from './checkout.style';
import VALIDATION_ERROR from '../../constants/validation-errors';
import axios from 'axios';
import apiConfig from '../../api/api-config';
import ROUTES from '../../constants/routes-name';
import { authMiddleWare } from '../../utils/auth';
import { addNewAddress, setSelectedAddress, setUserAddresses } from '../../redux/User/user.actions';
import { updateCart } from '../../redux/Products/products.actions';
import { setLoginError } from '../../redux/General/general.actions';
import { handleApiError } from '../../utils/error-handling';

const Checkout = (props) => {
    const { classes, cart } = props;
    const [activeStep, setActiveStep] = useState(0);
    const [customerInformation, setCustomerInformation] = useState({
        emailId: '',
        phoneNumber: '',
        firstName: '',
        secondName: '',
        country: '',
        state: '',
        city: '',
        addressLine1: '',
        addressLine2: '',
        postalCode: ''
    });
    const [discountCode, setDiscountCode] = useState('');
    const [discountCodeError, setDiscountCodeError] = useState('');
    const [addDiscount, setAddDiscount] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [addAddressApiTriggered, setAddAddressApiTriggered] = useState(false);
    const [cartItems, setCartItems] = useState(cart);

    const steps = ['Customer Information', 'Shipping & Payment', 'Order Confirmation'];
    let history = useHistory();
    const getAppropriateComponent = () => {
        if(activeStep === 0) {
            return <CustomerInformationSection 
                        customerInformation={customerInformation} 
                        setCustomerInformation={setCustomerInformation} 
                        userAddresses={props.userAddresses}
                        selectExistingAddress={selectExistingAddress}
                        selectedAddressIndex={props.selectedAddressIndex}
                        addNewCustomerAddress={addNewCustomerAddress}
                    />;
        }
        else if(activeStep === 1) {
            return <ShippingPaymentSection 
                        customerInformation={props.userAddresses[props.selectedAddressIndex]} 
                        handleBack={handleBack} 
                        getCodCharges={getCodCharges} 
                        setPaymentMethod={setPaymentMethod} 
                        paymentMethod={paymentMethod} 
                    />;
        }
        else {
            return <OrderConfirmationSection />;
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    
    const handleNext = () => {
        const isActiveStepValid = checkActiveStepValidation();
        if(isActiveStepValid) {
            if(activeStep === 1) {
                callInvoiceApi();
            }
            setActiveStep(activeStep + 1);
        }
    };

    const checkActiveStepValidation = () => {
        if(activeStep === 0) {
            if(props.selectedAddressIndex >=0) {
                return true;
            }
            return false;
        }
        if(activeStep === 1) {
            if(!discountCodeError && paymentMethod) {
                return true;
            }
            return false;
        }
    }

    const getProductTotal = () => {
        let productTotal = 0;
        cartItems.forEach(element => {
            productTotal += element.productDetails.salePrice * element.qty;
        });
        return productTotal;
    };
    
    const getShippingAmount = () => {
        // let countOfHST = 0;
        // const shippingAmountHST = 50;
        // cartItems.forEach(element => {
        //     if(element.productDetails.productCategory === "HST") {
        //         countOfHST += 1;
        //     }
        // });
        // return Math.ceil(countOfHST / 2) * shippingAmountHST;
        return 0;
    };

    const getCodCharges = () => {
        let atleastOneEprintProduct = 0;
        let atleastOnePrintroveProduct = 0;

        for (let index = 0; index < cartItems.length; index++) {
            const element = cartItems[index];

            if(element.productDetails.productCategory === "HST" || element.productDetails.productCategory === "FST") {
                atleastOneEprintProduct += 1;
            }
            else {
                atleastOnePrintroveProduct +=1
            }
                
        }

        if(atleastOneEprintProduct > 0 && atleastOnePrintroveProduct > 0) {
            return 100;
        }
        else if(atleastOneEprintProduct > 0 || atleastOnePrintroveProduct > 0) {
            return 50; 
        } 
    };

    const getOrderTotal = () => {
        if(activeStep === 0) {
            return getProductTotal() - getDiscount();
        }
        if(paymentMethod === "cod") {
            return getProductTotal() + getShippingAmount() + getCodCharges() - getDiscount();
        }
        return getProductTotal() + getShippingAmount() - getDiscount();
    };

    const applyDiscount = () => {
        if(!discountCode || discountCode.trim() === "") {
            setDiscountCodeError(VALIDATION_ERROR.FIELD_LEFT_BLANK);
            setAddDiscount(false);
        }
        // check discount code validation
        // else if() {

        // }
        else {
            setDiscountCodeError(''); 
            setAddDiscount(true);
        }
    };

    const getDiscount = () => {
        if(addDiscount) {
            return 50;
        }
        else {
            return 0;
        }
    };

    const callUserDetailsApi = async () => {
        try {
            authMiddleWare(history);
            const authToken = localStorage.getItem('AuthToken');
		    axios.defaults.headers.common = { Authorization: `${authToken}` };
            const response = await axios.get(apiConfig.getAllSavedAddress);
            if(response && response.data && response.data.length > 0) {
                props.setUserAddresses(response.data);
            }
            setLoading(false);
        }
        catch(err) {
            console.log(err);
            if(err.request.status === 403) {
                props.setLoginError(VALIDATION_ERROR.LOGIN_BEFORE_CONTINUE);
            }
            setLoading(false);
            //redirect to error page
            handleApiError(history, err);
        }
    };

    const selectExistingAddress = (index) => {
        props.setSelectedAddress(index);
    };

    const checkNewAddressValidity = () => {
        return customerInformation.emailId && customerInformation.phoneNumber && 
            customerInformation.firstName && customerInformation.secondName && 
            customerInformation.country && customerInformation.state && customerInformation.city && 
            customerInformation.addressLine1 && customerInformation.addressLine2 && customerInformation.postalCode;
    };

    const addNewCustomerAddress = async () => {
        setAddAddressApiTriggered(true);
        try {
            if(checkNewAddressValidity()) {
                authMiddleWare(history);
                const authToken = localStorage.getItem('AuthToken');
                axios.defaults.headers.common = { Authorization: `${authToken}` };
                const requestPayload = {
                    name: `${customerInformation.firstName} ${customerInformation.secondName}`,
                    phone: customerInformation.phoneNumber,
                    address: `${customerInformation.addressLine1} ${customerInformation.addressLine2}`,
                    pincode: customerInformation.postalCode,
                    city: customerInformation.city,
                    state: customerInformation.state,
                    country: customerInformation.country
                };
                const response = await axios.post(apiConfig.addAddress, requestPayload);
                if(response && response.data && response.data.id) {
                    props.addNewAddress(response.data);
                    selectExistingAddress(props.userAddresses.length);
                }
            }
            setAddAddressApiTriggered(false);
        }
        catch(err) {
            // Redirects to error page
            setAddAddressApiTriggered(false);
            handleApiError(history, err);
        }
    };

    const callInvoiceApi = async () => {
        // call add - order api
        try {
            authMiddleWare(history);
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            let orderIdArray = [];
            for (let index = 0; index < props.cart.length; index++) {
                const cartItem = props.cart[index];
                const requestPayload = {
                    productId: cartItem.productDetails.productId,
                    productName: cartItem.productDetails.name,
                    productImage: cartItem.productDetails.images[0],
                    quantity: cartItem.qty,
                    size: cartItem.size,
                    color: cartItem.color
                };
                const response = await axios.post(apiConfig.addOrder, requestPayload);
                if(response && response.data && response.data.id) {
                    orderIdArray.push(response.data.id);
                }
            }

            if(orderIdArray.length > 0) {
                const requestPayload = {
                    addressId: props.userAddresses[props.selectedAddressIndex].addressId,
                    orders: orderIdArray,
                    paymentMethod: paymentMethod,
                    productTotalAmount: getProductTotal(),
                    shippingAmount: getShippingAmount(),
                    codAmount: paymentMethod === "cod" ? getCodCharges() : 0,
                    discountAmount: addDiscount ? getDiscount() : 0,
                    discountCode : discountCode ? discountCode : ''
                };
                const response = await axios.post(apiConfig.addInvoice, requestPayload);
                if(response && response.data && response.data.id) {
                    props.updateCart([]);
                }
            }
        }
        catch(err) {
            handleApiError(history, err);
        }
    };

    useEffect(() => {
       callUserDetailsApi(); 
    }, []);

    if(props.cart.length === 0) {
        history.push(ROUTES.HOME);
        return <></>;
    }

    return (
        <>
            <NavigationBar />
                <div className={classes.checkoutWrapper}>
                    {
                        isLoading ?
                            <Box className={classes.productListWrapper} sx={{textAlign: 'center'}}>
                                <CircularProgress />
                            </Box>
                            :
                            <>
                                <div className={classes.multiStep}>
                                    <Stepper activeStep={activeStep}>
                                        {steps.map((label, index) => {
                                            return (
                                                <Step key={label}>
                                                    <StepLabel>{label}</StepLabel>
                                                </Step>
                                            )
                                        })}
                                    </Stepper>
                                    {getAppropriateComponent()}

                                    {activeStep !== steps.length - 1 && <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>

                                        <Box sx={{ flex: '1 1 auto' }} />

                                        <Button onClick={handleNext}>
                                            {activeStep === steps.length - 2 ? 'Place Order' : 'Next'}
                                        </Button>
                                    </Box>}
                                </div>
                                <div className={classes.shoppingCart}>
                                    <Typography variant="h5" className={classes.shoppingCartHeading}>YOUR ORDER</Typography>
                                    {cartItems.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <div className={classes.shoppingCartItem}>
                                                    <div className={classes.shoppingCartItemLeft}>
                                                        <Badge badgeContent={item.qty} color="primary">
                                                            <img alt={item.productDetails.name} src={item.productDetails.images[0]} height="60px" loading="lazy"/> 
                                                        </Badge>
                                                        <div className={classes.shoppingCartItemProductInfo}>
                                                            <Typography variant="body1">{item.productDetails.name}</Typography>
                                                            <Typography variant="body2">{`${item.color}/${item.size}`}</Typography>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <Typography variant="body1">{`₹ ${item.productDetails.salePrice}`}</Typography>
                                                    </div>
                                                </div>
                                                <div className={classes.dividerWrapper}>
                                                    <Divider />
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {activeStep !== 2 && 
                                        <>
                                            <div className={classes.discountWrapper}>
                                                <TextField
                                                    id="outlined-street-input"
                                                    label="Discount Code"
                                                    type="text"
                                                    variant="outlined"
                                                    className={classes.textFieldCss}
                                                    value={discountCode}
                                                    onChange={(event) => setDiscountCode(event.target.value)}
                                                    error={discountCodeError ? true : false}
                                                    helperText={discountCodeError}
                                                />

                                                <Button variant="contained" onClick={applyDiscount}>
                                                    Apply
                                                </Button>
                                            </div>
                                            <div className={classes.dividerWrapper}>
                                                <Divider />
                                            </div>
                                        </>
                                    }
                                    <div className={classes.shoppingCartItem}>
                                        <Typography variant="body1">Subtotal</Typography>
                                        <Typography variant="body1">{`₹ ${getProductTotal()}`}</Typography>
                                    </div>

                                    {addDiscount && <div className={classes.shoppingCartItem}>
                                        <Typography variant="body1">Discount</Typography>
                                        <Typography variant="body1">{`-₹ ${getDiscount()}`}</Typography>
                                    </div>}

                                    <div className={classes.shoppingCartItem}>
                                        <Typography variant="body1">Shipping</Typography>
                                        <Typography variant="body1">{activeStep === 0 ? 'Calculated at next step' : `₹ ${getShippingAmount()}`}</Typography>
                                    </div>

                                    {activeStep !== 0 && paymentMethod === "cod" && <div className={classes.shoppingCartItem}>
                                        <Typography variant="body1">COD Charges</Typography>
                                        <Typography variant="body1">{`₹ ${getCodCharges()}`}</Typography>
                                    </div>}

                                    <div className={classes.dividerWrapper}>
                                        <Divider />
                                    </div>

                                    <div className={classes.shoppingCartItem}>
                                        <Typography variant="h6">Total</Typography>
                                        <Typography variant="h6">{`₹ ${getOrderTotal()}`}</Typography>
                                    </div>
                                </div>
                            </>
                    }
                </div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={addAddressApiTriggered}
                    // onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => {
	const reduxState = state.productDetails.toJS();
    const reduxStateUser = state.userDetails.toJS();

	return {
		cart: reduxState.cart,
        userAddresses: reduxStateUser.userAddresses,
        selectedAddressIndex: reduxStateUser.selectedAddressIndex
	};
};
  
const mapDispatchToProps = dispatch => {
	return {
        setUserAddresses : (userAddresses) => dispatch(setUserAddresses(userAddresses)),
        setSelectedAddress: (index) => dispatch(setSelectedAddress(index)),
        addNewAddress: (address) => dispatch(addNewAddress(address)),
        updateCart: (newCart) => dispatch(updateCart(newCart)),
        setLoginError: (msg) => dispatch(setLoginError(msg))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Checkout));