import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Box, Typography, Link, Divider, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import styles from './shipping-payment-section.style';

const ShippingPaymentSection = (props) => {
    const { classes, customerInformation } = props;

    const handlePaymentChange = (event) => {
        props.setPaymentMethod(event.target.value);
    };

    return (
        <div>
            <Box className={classes.boxWrapper}>
                <div className={classes.customerInfoWrapper}>
                    <Typography variant="body2" className={classes.secondaryFont}>Contact</Typography>
                    <Typography variant="body1" className={classes.primaryFont}>{`${customerInformation.emailId} / ${customerInformation.phoneNumber}`}</Typography>
                    <Link onClick={() => props.handleBack()} variant="body2" className={classes.highlightFont}>Change</Link>
                </div>

                <div className={classes.dividerWrapper}>
                    <Divider />
                </div>

                <div className={classes.customerInfoWrapper}>
                    <Typography variant="body2" className={classes.secondaryFont}>Ship to</Typography>
                    <Typography variant="body1" className={classes.primaryFont}>{`${customerInformation.addressLine1} ${customerInformation.addressLine2} ${customerInformation.postalCode} ${customerInformation.city}`}</Typography>
                    <Link onClick={() => props.handleBack()} variant="body2" className={classes.highlightFont}>Change</Link>
                </div>
            </Box>

            <Box className={classes.boxWrapper}>
                <Typography variant="h4" className={classes.primaryFont}>Payment Method</Typography>
                <div className={classes.dividerWrapper}>
                            <Divider />
                        </div>
                    <RadioGroup
                        aria-label="gender"
                        name="controlled-radio-buttons-group"
                        value={props.paymentMethod}
                        onChange={handlePaymentChange}
                    >
                        <div className={classes.customerInfoWrapper}>
                            <FormControlLabel value="online" control={<Radio color={'primary'} />} label="Online Payment" />
                            <Typography variant="body2" className={classes.secondaryFont}>Free</Typography>
                        </div>
                        {/* <FormControlLabel value="online" control={<Radio color={'primary'} />} label="Online Payment" />
                        <FormControlLabel value="cod" control={<Radio color={'primary'} />} label="Cash on Delivery" /> */}
                        <div className={classes.dividerWrapper}>
                            <Divider />
                        </div>
                        <div className={classes.customerInfoWrapper}>
                            <FormControlLabel value="cod" control={<Radio color={'primary'} />} label="Cash on Delivery" />
                            <Typography variant="body2" className={classes.secondaryFont}>{`+ Rs.${props.getCodCharges()}`}</Typography>
                        </div>
                    </RadioGroup>
            </Box>


        </div>
    );
};

export default withStyles(styles)(ShippingPaymentSection);