import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import Footer from '../../components/Footer/footer';
import CustomerInformationSection from '../../components/CustomerInformationSection/customer-information-section';
import ShippingPaymentSection from '../../components/ShippingPaymentSection/shipping-payment-section';
import OrderConfirmationSection from '../../components/OrderConfirmationSection/order-confirmation-section';
import { Stepper, Step, StepLabel, Typography, Box, Button, Badge, Divider, TextField, CircularProgress, Backdrop, Accordion, AccordionSummary, AccordionDetails, FormGroup, FormControlLabel, Checkbox, FormHelperText } from '@material-ui/core';
import styles from './checkout.style';
import VALIDATION_ERROR from '../../constants/validation-errors';
import axios from 'axios';
import apiConfig from '../../api/api-config';
import ROUTES from '../../constants/routes-name';
import { authMiddleWare } from '../../utils/auth';
import { addNewAddress, setSelectedAddress, setUserAddresses, setUserDetails } from '../../redux/User/user.actions';
import { updateCart } from '../../redux/Products/products.actions';
import { setDiscountCodes, setLoginError } from '../../redux/General/general.actions';
import { handleApiError } from '../../utils/error-handling';
import { checkDiscountCodeConstraints } from '../../utils/discount-check';
import { checkEnvironment } from '../../utils/general-utils';
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase/firebase";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CSSConstants from '../../constants/css-constants';

const Checkout = (props) => {
    const { classes, cart, userDetails } = props;
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
    const [discountAmount, setDiscountAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [addAddressApiTriggered, setAddAddressApiTriggered] = useState(false);
    const [cartItems, setCartItems] = useState(cart);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [showAddressDisclaimer, setAddressDisclaimer] = useState(false);
    const [addNewButtonTriggered, setAddNewButtonTriggered] = useState(false);
    const [shippingDetailsAccordion, setShippingDetailsAccordion] = useState(true);
    const [paymentModeAccordion, setPaymentModeAccordion] = useState(true);
    const [confirmationDialog, setConfirmationDialog] = useState(false);
    const [shippingDetailsAccordionError, setShippingDetailsAccordionError] = useState(false);
    const [paymentModeAccordionError, setPaymentModeAccordionError] = useState(false);
    const [agreeTnc, setAgreeTnc] = useState(false);
    const [agreeTncError, setAgreeTncError] = useState(false);

    const steps = ['Customer Information', 'Shipping & Payment', 'Order Confirmation'];
    let history = useHistory();

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleOrderPlacement = async () => {
        const isActiveStepValid = checkCompleteFormValidation();
        if (isActiveStepValid) {
            setLoading(true);
                if (paymentMethod === "cod" || paymentMethod === "qr") {
                    await callInvoiceApi(activeStep);
                }
                else {
                    // inititate Paytm Transaction
                    await callInitiatePaytmTransactionApi();
                }
        }
        else {
            if(!props.selectedAddressIndex) {
                setShippingDetailsAccordionError(true);
                document.getElementById("shippingDetailsAccordion").scrollIntoView();
            }
            else if(discountCodeError) {
                document.getElementById("discountWrapper").scrollIntoView();
            }
            else if(!agreeTnc) {
                setAgreeTncError(true);
                document.getElementById("checkBoxWrapper").scrollIntoView();
            }
            else {
                setPaymentModeAccordionError(true);
                document.getElementById("paymentModeAccordion").scrollIntoView();
            }
        }
    };

    const checkCompleteFormValidation = () => {
        if(props.selectedAddressIndex >= 0 && (!discountCodeError || (discountCodeError && !discountCode)) && paymentMethod && agreeTnc) {
            return true;
        }
        return false;
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
        let totalCartWeight = 0;
        const flatRate = 60;
        // if (paymentMethod === "cod") {
        //     cartItems.forEach(element => {
        //         totalCartWeight += +element.productDetails.weightInGms * +element.qty;
        //     });

        //     return Math.ceil(+totalCartWeight / 500) * flatRate;
        // }
        return 0;
    };

    const getCodCharges = () => {
        // let atleastOneEprintProduct = 0;
        // let atleastOnePrintroveProduct = 0;

        // for (let index = 0; index < cartItems.length; index++) {
        //     const element = cartItems[index];

        //     if(element.productDetails.productCategory === "HST" || element.productDetails.productCategory === "FST") {
        //         atleastOneEprintProduct += 1;
        //     }
        //     else {
        //         atleastOnePrintroveProduct +=1
        //     }

        // }

        // if(atleastOneEprintProduct > 0 && atleastOnePrintroveProduct > 0) {
        //     return 100;
        // }
        // else if(atleastOneEprintProduct > 0 || atleastOnePrintroveProduct > 0) {
        //     return 50; 
        // } 
        return 100;
    };

    const getOrderTotal = () => {
        // if (activeStep === 0) {
        //     return getProductTotal() - getTotalDiscountAmountForInvoice();
        // }
        if (paymentMethod === "cod") {
            return getProductTotal() + getShippingAmount() + getCodCharges() - getTotalDiscountAmountForInvoice();
        }
        return getProductTotal() + getShippingAmount() - getTotalDiscountAmountForInvoice();
    };

    const getNumberOfCartItems = () => {
        let cartItemsTotal = 0;

        cartItems.reduce(element => {
            return cartItemsTotal + element.qty;
        }, cartItemsTotal);

        return cartItemsTotal;
    };

    const getRespectiveProductCount = (productType) => {
        let count = 0;
        cartItems.forEach(element => {
            if (element.productDetails.productCategory === productType) {
                count += 1;
            }
        });
        return count;
    };

    const checkDiscountCodeValidity = () => {
        const discountCodeName = discountCode.toUpperCase();
        const applicableCodes = props.discountCodes.filter((discountCode, i) => discountCode.code === discountCodeName);
        if (applicableCodes.length > 0) {
            const isValid = checkDiscountCodeConstraints(applicableCodes[0], getProductTotal(), getNumberOfCartItems(), cartItems);
            if (isValid) {
                if (applicableCodes[0].discountType === "FLAT") {
                    setDiscountAmount(applicableCodes[0].discount);
                }
                else if (applicableCodes[0].discountType === "PERPRODUCT") {
                    setDiscountAmount(applicableCodes[0].discount * getRespectiveProductCount(applicableCodes[0].productType));
                }
                return true;
            }
        }
        return false;
    };

    const applyDiscount = () => {
        if (!discountCode || discountCode.trim() === "") {
            setDiscountCodeError('');
            setAddDiscount(false);
        }
        // check discount code validation
        else if (!checkDiscountCodeValidity()) {
            setDiscountCodeError(VALIDATION_ERROR.FIELD_INVALID);
            setAddDiscount(false);
        }
        else {
            setDiscountCodeError('');
            setAddDiscount(true);
        }
    };

    const getDiscount = () => {
        if (addDiscount) {
            return discountAmount;
        }
        else {
            return 0;
        }
    };

    const getLoyaltyPointDiscount = () => {
        if(userDetails?.loyaltyPoints > 0) {
            return userDetails.loyaltyPoints;
        }
        return 0;
    };

    const callUserDetailsApi = async () => {
        try {
            authMiddleWare(history);
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };

            const responseUserDetails = await axios.get(apiConfig.getUserDetails);

            if(responseUserDetails && responseUserDetails.data && responseUserDetails.data.userCredentials) {
                props.setUserDetails(responseUserDetails.data.userCredentials);
                const response = await axios.get(apiConfig.getAllSavedAddress);
                if (response && response.data && response.data.length > 0) {
                    props.setUserAddresses(response.data);
    
                    // const discountVouchers = await axios.get(apiConfig.getDiscountCodes);
    
                    // if (discountVouchers && discountVouchers.data && discountVouchers.data.length > 0) {
                    //     props.setDiscountCodes(discountVouchers.data);
                    // }
                }
            }
            setLoading(false);
        }
        catch (err) {
            console.log(err);
            if (err.request.status === 403) {
                props.setLoginError(VALIDATION_ERROR.LOGIN_BEFORE_CONTINUE);
            }
            setLoading(false);
            //redirect to error page
            handleApiError(history, err);
        }
    };

    const callInitiatePaytmTransactionApi = async () => {
        try {
            authMiddleWare(history);
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            const { isLocal } = checkEnvironment();
            const orderId = generateUniqueOrderId();
            const orderAmount = getOrderTotal();
            const requestPayload = {
                orderId: orderId,
                websiteName: isLocal ? "WEBSTAGING" : "DEFAULT",
                transactionAmount: orderAmount
            };
            const { data } = await axios.post(apiConfig.initiatePaytmTransaction, requestPayload);
            if (data && data?.txnToken) {
                paytmScriptLoaded(orderId, data.txnToken, orderAmount);
            }
        }
        catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const paytmScriptLoaded = (orderId, token, amount) => {
        const config = {
            "root": "",
            "flow": "DEFAULT",
            "data": {
                "orderId": orderId /* update order id */,
                "token": token /* update token value */,
                "tokenType": "TXN_TOKEN",
                "amount": amount /* update amount */
            },
            "merchant": {
                "name": "Crazy Chimp",
                "redirect": false
            },
            "payMode": {
                "order": ['UPI', 'CARD', 'NB', 'BALANCE']
            },
            "handler": {
                "transactionStatus": function (data) {
                    console.log("payment status ", data);
                    if (data.STATUS === "TXN_SUCCESS") {
                        window?.Paytm?.CheckoutJS?.close();
                        setLoading(true);
                        callInvoiceApi();
                    }
                },
                "notifyMerchant": function (eventName, data) {
                    console.log("notifyMerchant handler function called");
                    console.log("eventName => ", eventName);
                    console.log("data => ", data);
                }
            }
        };

        if (window.Paytm && window.Paytm.CheckoutJS) {
            window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                // after successfully update configuration invoke checkoutjs
                setLoading(false);
                window.Paytm.CheckoutJS.invoke();
            }).catch(function onError(error) {
                console.log("error => ", error);
            });
        }
    };

    const generateUniqueOrderId = () => {
        const date = new Date();
        return 'INV' + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() + (Math.random() * 1000).toFixed();
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
            if (checkNewAddressValidity()) {
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
                if (response && response.data && response.data.id) {
                    props.addNewAddress(response.data);
                    selectExistingAddress(0);
                    setAddNewButtonTriggered(false);
                    window.scrollTo(0,0);
                }
                setAddressDisclaimer(false);
            }
            else {
                setAddressDisclaimer(true);
            }
            setAddAddressApiTriggered(false);
        }
        catch (err) {
            // Redirects to error page
            setAddAddressApiTriggered(false);
            handleApiError(history, err);
        }
    };

    const getTotalDiscountAmountForInvoice = () => {
        let totalDiscount = 0;

        if(addDiscount) {
            totalDiscount += getDiscount();
        }
        
        if(userDetails?.loyaltyPoints > 0) {
            totalDiscount += getLoyaltyPointDiscount();
        }

        return totalDiscount;
    };

    const getCompleteDiscountCode = () => {
        let discountCodeText = '';

        if(discountCode) {
            discountCodeText += discountCode;
        }
        
        if(userDetails?.loyaltyPoints > 0) {
            discountCodeText += '_LP';
        }

        return discountCodeText;
    };

    const getPurchaseAnalyticsObject = (cartItems) => {
        const getItemsArray = () => {
            let populatedArray = [];

            for (let index = 0; index < cartItems.length; index++) {
                const newObject = {
                    item_id: cartItems[index].productDetails.productId,
                    item_name: cartItems[index].productDetails.name,
                    item_category: cartItems[index].productDetails.productCategory,
                    item_category2: cartItems[index].productDetails.genreCategory,
                    quantity: cartItems[index].quantity,
                    item_variant: cartItems[index].color
                }
                populatedArray.push(newObject);
            }

            return populatedArray;
        };

        return {
            transaction_id: generateUniqueOrderId(),
            currency: "INR",
            value: getOrderTotal(),
            coupon: getCompleteDiscountCode(),
            items: getItemsArray()
        }
    };

    const callInvoiceApi = async () => {
        // call add - order api
        try {
            authMiddleWare(history);
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            let ordersArray = [];
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
                ordersArray.push(requestPayload);
            }

            if (ordersArray.length > 0) {
                const requestPayload = {
                    shippingAddress: props.userAddresses[props.selectedAddressIndex],
                    orders: ordersArray,
                    paymentMethod: paymentMethod,
                    productTotalAmount: getProductTotal(),
                    shippingAmount: getShippingAmount(),
                    codAmount: paymentMethod === "cod" ? getCodCharges() : 0,
                    discountAmount: getTotalDiscountAmountForInvoice(),
                    discountCode: getCompleteDiscountCode()
                };
                const response = await axios.post(apiConfig.addInvoice, requestPayload);
                if (response && response.data && response.data.id) {
                    if(userDetails?.loyaltyPoints > 0) {
                        await axios.post(apiConfig.updateUserDetails, { loyaltyPoints: 0 });
                    }
                    setOrderSuccess(true);
                    logEvent(analytics, 'purchase', getPurchaseAnalyticsObject(props.cart));
                    props.updateCart([]);
                    try {
                        await axios.post(apiConfig.sendEmail, { name : props.userAddresses[props.selectedAddressIndex].name, paymentMode: paymentMethod === "online" ? "ONLINE" : "OFFLINE" });
                    }
                    catch(err) {
                        // ignore the error even if the send mail api fails
                    }
                    setLoading(false);
                    // setActiveStep(activeStep + 1);
                    setConfirmationDialog(true);
                }
            }
        }
        catch (err) {
            handleApiError(history, err);
        }
    };

    const deleteAddress = async (addressId) => {
        try {
            authMiddleWare(history);
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            await axios.delete(`${apiConfig.addAddress}/${addressId}`);
        }
        catch(err) {

        }
    };

    const onChangeCheckbox = (event) => {
        if(event.target.value) {
            setAgreeTncError(false);
        }
        setAgreeTnc(!agreeTnc);
    }

    const getLabelData = () => {
        const data = `* Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a target="_blank" href="/privacy-policy" class='pp-link'>privacy policy.</a>`;
        return <div dangerouslySetInnerHTML={{ __html: data }}/>;
    };

    useEffect(() => {
        callUserDetailsApi();
        logEvent(analytics, "screen_view", {
            firebase_screen: "Checkout Page",
            firebase_screen_class: "Checkout"
        });
    }, []);

    useEffect(() => {
        if(props.selectedAddressIndex >=0) {
            setShippingDetailsAccordionError(false);
        }
    }, [props.selectedAddressIndex]);

    useEffect(() => {
        if(paymentMethod) {
            setPaymentModeAccordionError(false);
        }
    }, [paymentMethod]);

    if (props.cart.length === 0 && !orderSuccess) {
        history.push(ROUTES.HOME);
        return <></>;
    }

    console.log('Addresses', props.userAddresses, props.selectedAddressIndex)

    return (
        <>
            <NavigationBar />
            <div className={classes.checkoutWrapper}>
                {
                    isLoading ?
                        <Box className={classes.productListWrapper} sx={{ textAlign: 'center' }}>
                            <CircularProgress />
                        </Box>
                        :
                        <>
                            <div className={classes.multiStep}>
                                <div className={classes.accordionWrapper} id="shippingDetailsAccordion">
                                    <Accordion expanded={shippingDetailsAccordion}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            onClick={() => setShippingDetailsAccordion(!shippingDetailsAccordion)}
                                        >
                                            <div>
                                                <Typography variant='h5'>SHIPPING DETAILS</Typography>
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div>
                                                {shippingDetailsAccordionError ? <Typography variant='subtitle2'>* Please select one of the address or add a new address.</Typography> : <></>}
                                                <CustomerInformationSection
                                                    customerInformation={customerInformation}
                                                    setCustomerInformation={setCustomerInformation}
                                                    userAddresses={props.userAddresses}
                                                    selectExistingAddress={selectExistingAddress}
                                                    selectedAddressIndex={props.selectedAddressIndex}
                                                    addNewCustomerAddress={addNewCustomerAddress}
                                                    addNewButtonTriggered={addNewButtonTriggered}
                                                    setAddNewButtonTriggered={setAddNewButtonTriggered}
                                                    showAddressDisclaimer={showAddressDisclaimer}
                                                    setUserAddresses={props.setUserAddresses}
                                                    deleteAddress={deleteAddress}
                                                />
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                    {props.userAddresses[props.selectedAddressIndex] ? <div style={{color: CSSConstants.FONT_PRIMARY, margin: '1rem'}}>
                                        <div>
                                            <Typography variant='subtitle2'>Selected Address :</Typography>
                                        </div>
                                        <div>
                                            <Typography variant='subtitle2'>{props.userAddresses[props.selectedAddressIndex]?.name}</Typography>
                                            <Typography variant='subtitle2'>{props.userAddresses[props.selectedAddressIndex]?.address}</Typography>
                                            <Typography variant='subtitle2'>{`Contact: ${props.userAddresses[props.selectedAddressIndex]?.phone}`}</Typography>
                                        </div>
                                    </div> : <></>}
                                    
                                </div>
                                <br />
                                <br />
                                <div className={classes.accordionWrapper} id="paymentModeAccordion">
                                    <Accordion expanded={paymentModeAccordion}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            onClick={() => setPaymentModeAccordion(!paymentModeAccordion)}>
                                                <div>
                                                    <Typography variant='h5'>PAYMENT DETAILS</Typography>
                                                    {paymentMethod ? <Typography variant='subtitle2'>{`Selected Payment Mode : ${paymentMethod.toLocaleUpperCase()}`}</Typography> : <></>}
                                                </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div>
                                                {paymentModeAccordionError ? <Typography variant='subtitle2'>* Please select one of the address or add a new address.</Typography> : <></>}
                                                <ShippingPaymentSection
                                                    customerInformation={props.userAddresses[props.selectedAddressIndex]}
                                                    handleBack={handleBack}
                                                    getCodCharges={getCodCharges}
                                                    setPaymentMethod={setPaymentMethod}
                                                    paymentMethod={paymentMethod}
                                                />
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                                {/* {getAppropriateComponent()} */}

                                {/* {activeStep !== steps.length - 1 && <Box className={classes.checkoutCta} sx={{ display: 'flex', flexDirection: 'row', pt: 2, padding: '16px 30px' }}>
                                    {activeStep !== 0 && <Button
                                        variant="outlined"
                                        //color="inherit"
                                        disabled={activeStep === 0 ? true : false}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>}

                                    <Box sx={{ flex: '1 1 auto' }} />

                                    <Button onClick={handleNext} variant="outlined">
                                        {activeStep === steps.length - 2 ? 'Place Order' : 'Next'}
                                    </Button>
                                </Box>} */}
                            </div>
                            <div className={classes.shoppingCart}>
                                <Typography variant="h5" className={classes.shoppingCartHeading}>YOUR ORDER</Typography>
                                <hr className={classes.horizontalBar} />
                                {cartItems.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div className={classes.shoppingCartItem}>
                                                <div className={classes.shoppingCartItemLeft}>
                                                    <Badge badgeContent={item.qty} color="primary">
                                                        <img alt={item.productDetails.name} src={item.productDetails.images[0]} height="60px" loading="lazy" />
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
                                            <br />
                                            {/* <div className={classes.dividerWrapper}>
                                                <Divider />
                                            </div> */}
                                        </div>
                                    );
                                })}

                                {activeStep !== 2 &&
                                    <>
                                        <div className={classes.discountWrapper} id="discountWrapper">
                                            <TextField
                                                id="outlined-street-input"
                                                label="Discount Code"
                                                type="text"
                                                variant="outlined"
                                                className={classes.textFieldCss}
                                                value={discountCode}
                                                onChange={(event) => setDiscountCode(event.target.value.trim())}
                                                error={discountCodeError ? true : false}
                                                helperText={discountCodeError}
                                            />

                                            <Button variant="contained" className={classes.placeOrderButton} onClick={applyDiscount}>
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

                                {userDetails?.loyaltyPoints > 0 && <div className={classes.shoppingCartItem}>
                                    <Typography variant="body1">Feedback Discount</Typography>
                                    <Typography variant="body1">{`-₹ ${getLoyaltyPointDiscount()}`}</Typography>
                                </div>}

                                <div className={classes.shoppingCartItem}>
                                    <Typography variant="body1">Shipping</Typography>
                                    <Typography variant="body1">{`₹ ${getShippingAmount()}`}</Typography>
                                </div>

                                {paymentMethod === "cod" && <div className={classes.shoppingCartItem}>
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

                                <br />

                                <div className={classes.checkBoxWrapper} id="checkBoxWrapper">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox value={agreeTnc} onChange={(event) => onChangeCheckbox(event)} />} label={getLabelData()} />
                                        {agreeTncError && <FormHelperText>Please click this!</FormHelperText>}
                                    </FormGroup>
                                </div>

                                <div className={classes.placeOrderButtonWrapper}>
                                    <Button variant='contained' className={classes.placeOrderButton} onClick={handleOrderPlacement}>Place Order</Button>
                                </div>

                            </div>
                            <OrderConfirmationSection paymentMethod={paymentMethod} confirmationDialog={confirmationDialog} />
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
    const reduxStateGeneral = state.generalDetails.toJS();

    return {
        cart: reduxState.cart,
        userAddresses: reduxStateUser.userAddresses,
        selectedAddressIndex: reduxStateUser.selectedAddressIndex,
        discountCodes: reduxStateGeneral.discountCodes,
        userDetails: reduxStateUser.userDetails
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setUserAddresses: (userAddresses) => dispatch(setUserAddresses(userAddresses)),
        setSelectedAddress: (index) => dispatch(setSelectedAddress(index)),
        addNewAddress: (address) => dispatch(addNewAddress(address)),
        updateCart: (newCart) => dispatch(updateCart(newCart)),
        setLoginError: (msg) => dispatch(setLoginError(msg)),
        setDiscountCodes: (discountCodes) => dispatch(setDiscountCodes(discountCodes)),
        setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Checkout));