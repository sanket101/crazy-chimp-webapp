import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Box, Typography, Link, Divider, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import styles from './shipping-payment-section.style';
import qrcode from '../../assets/download.png';
import ImpLinks from '../../constants/imp-links';

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
                    <Typography variant="body1" className={classes.primaryFont}>{`${customerInformation.phone}`}</Typography>
                    <Link onClick={() => props.handleBack()} variant="body2" className={classes.highlightFont}>Change</Link>
                </div>

                <div className={classes.dividerWrapper}>
                    <Divider />
                </div>

                <div className={classes.customerInfoWrapper}>
                    <Typography variant="body2" className={classes.secondaryFont}>Ship to</Typography>
                    <Typography variant="body1" className={classes.primaryFont}>{`${customerInformation.address}-${customerInformation.pincode} ${customerInformation.city}`}</Typography>
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
                            <Typography variant="body2" className={classes.secondaryFont}>100% Free shipping on all prepaid (pay online) orders</Typography>
                        </div>
                        {/* {props.paymentMethod === "online" ? 
                            <div style={{ display: 'flex'}}>
                                <div>
                                    <img alt='qr code' src={qrcode} width='100px' loading="lazy"/>
                                </div>
                                <div className={classes.paymentDescription}>
                                    <Typography variant="body2" className={classes.secondaryFont}>Please scan this QR code or use our UPI ID : crazychimp@ybl to pay the given amount. Once done, please send us a screenshot over <Link href='mailto:crazychimpofficial@gmail.com?Subject=Payment_Screenshot' target='_blank'>mail</Link> or DM it on <Link href={ImpLinks.CRAZY_CHIMP_INSTAGRAM} target='_blank'>Instagram</Link>.</Typography>
                                </div>
                            </div>
                            :
                            <></>
                        } */}
                        <div className={classes.dividerWrapper}>
                            <Divider />
                        </div>
                        <div className={classes.customerInfoWrapper}>
                            <FormControlLabel value="cod" control={<Radio color={'primary'} />} label="Cash on Delivery" />
                            <Typography variant="body2" className={classes.secondaryFont}>{`+ ₹ ${props.getCodCharges()}`}</Typography>
                        </div>
                    </RadioGroup>
            </Box>


        </div>
    );
};

export default withStyles(styles)(ShippingPaymentSection);