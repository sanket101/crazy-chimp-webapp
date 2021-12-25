import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import Footer from '../../components/Footer/footer';
import CustomerInformationSection from '../../components/CustomerInformationSection/customer-information-section';
import ShippingPaymentSection from '../../components/ShippingPaymentSection/shipping-payment-section';
import OrderConfirmationSection from '../../components/OrderConfirmationSection/order-confirmation-section';
import { Stepper, Step, StepLabel, Typography, Box, Button, Badge, Divider, TextField } from '@material-ui/core';
import styles from './checkout.style';
import VALIDATION_ERROR from '../../constants/validation-errors';

const Checkout = (props) => {
    const { classes } = props;
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

    const cartItems = [{
        name: 'Hokage T-shirt',
        type: 'HST',
        color: 'Maroon',
        size: 'M',
        price: 449,
        quantity: 1
    },{
        name: 'Deku T-shirt',
        type: 'HST',
        color: 'Maroon',
        size: 'M',
        price: 449,
        quantity: 1
    },{
        name: 'Psyduck',
        type: 'HOODIE',
        color: 'Golden Yellow',
        size: 'M',
        price: 999,
        quantity: 1
    }];

    const steps = ['Customer Information', 'Shipping & Payment', 'Order Confirmation'];

    const getAppropriateComponent = () => {
        if(activeStep === 0) {
            return <CustomerInformationSection 
                        customerInformation={customerInformation} 
                        setCustomerInformation={setCustomerInformation} />
        }
        else if(activeStep === 1) {
            return <ShippingPaymentSection customerInformation={customerInformation} 
            handleBack={handleBack} getCodCharges={getCodCharges} setPaymentMethod={setPaymentMethod} paymentMethod={paymentMethod} />;
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
            setActiveStep(activeStep + 1);
        }
    };

    const checkActiveStepValidation = () => {
        if(activeStep === 0) {
            if(customerInformation.emailId && customerInformation.phoneNumber && 
               customerInformation.firstName && customerInformation.secondName && 
               customerInformation.country && customerInformation.state && customerInformation.city && 
               customerInformation.addressLine1 && customerInformation.addressLine2 && customerInformation.postalCode) {
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
            productTotal += element.price * element.quantity;
        });
        return productTotal;
    };
    
    const getShippingAmount = () => {
        let countOfHST = 0;
        const shippingAmountHST = 50;
        cartItems.forEach(element => {
            if(element.type === "HST") {
                countOfHST += 1;
            }
        });
        return Math.ceil(countOfHST / 2) * shippingAmountHST;
    };

    const getCodCharges = () => {
        let atleastOneEprintProduct = 0;
        let atleastOnePrintroveProduct = 0;

        for (let index = 0; index < cartItems.length; index++) {
            const element = cartItems[index];

            if(element.type === "HST" || element.type === "FST") {
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

    return (
        <>
            <NavigationBar />
                <div className={classes.checkoutWrapper}>
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
                                            <Badge badgeContent={item.quantity} color="primary">
                                                <img alt="product" src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d" height="60px" /> 
                                            </Badge>
                                            <div className={classes.shoppingCartItemProductInfo}>
                                                <Typography variant="body1">{item.name}</Typography>
                                                <Typography variant="body2">{`${item.color}/${item.size}`}</Typography>
                                            </div>
                                        </div>

                                        <div>
                                            <Typography variant="body1">{`Rs.${item.price}`}</Typography>
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
                            <Typography variant="body1">{`Rs.${getProductTotal()}`}</Typography>
                        </div>

                        {addDiscount && <div className={classes.shoppingCartItem}>
                            <Typography variant="body1">Discount</Typography>
                            <Typography variant="body1">{`-Rs.${getDiscount()}`}</Typography>
                        </div>}

                        <div className={classes.shoppingCartItem}>
                            <Typography variant="body1">Shipping</Typography>
                            <Typography variant="body1">{activeStep === 0 ? 'Calculated at next step' : `Rs.${getShippingAmount()}`}</Typography>
                        </div>

                        {activeStep !== 0 && paymentMethod === "cod" && <div className={classes.shoppingCartItem}>
                            <Typography variant="body1">COD Charges</Typography>
                            <Typography variant="body1">{`Rs.${getCodCharges()}`}</Typography>
                        </div>}

                        <div className={classes.dividerWrapper}>
                            <Divider />
                        </div>

                        <div className={classes.shoppingCartItem}>
                            <Typography variant="h6">Total</Typography>
                            <Typography variant="h6">{`Rs.${getOrderTotal()}`}</Typography>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    );
};

export default withStyles(styles)(Checkout);