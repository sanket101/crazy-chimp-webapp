import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Divider, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import styles from './shipping-payment-section.style';
import qrcode from '../../assets/download.png';

const ShippingPaymentSection = (props) => {
    const { classes } = props;

    const handlePaymentChange = (event) => {
        props.setPaymentMethod(event.target.value);
    };

    return (
        <div>
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
                {props.paymentMethod === "qr" ?
                    <div style={{ display: 'flex' }}>
                        <div>
                            <img alt='qr code' src={qrcode} width='100px' loading="lazy" />
                        </div>
                        <div className={classes.paymentDescription}>
                            <Typography variant="body2" className={classes.secondaryFont}>Please scan this QR code or use our UPI ID : crazychimp@ybl to pay the given amount. Use this method incase the above Online Payment option is not working for you. </Typography>
                        </div>
                    </div>
                    :
                    <></>
                }
                <div className={classes.dividerWrapper}>
                    <Divider />
                </div>
                <div className={classes.customerInfoWrapper}>
                    <FormControlLabel value="cod" control={<Radio color={'primary'} />} label="Cash on Delivery" />
                    <Typography variant="body2" className={classes.secondaryFont}>{`Additional ₹ ${props.getCodCharges()}/- will be charged, due to post delivery transaction.`}</Typography>
                </div>
            </RadioGroup>
        </div>
    );
};

export default withStyles(styles)(ShippingPaymentSection);