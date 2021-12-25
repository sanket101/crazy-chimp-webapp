import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Box, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import styles from './order-confirmation-section.style';

const OrderConfirmationSection = (props) => {
    const { classes } = props;

    return (
        <Box className={classes.boxWrapper}>
            <div className={classes.infoIconWrapper}>
                <InfoIcon />
            </div>

            <div className={classes.confirmationWrapper}>
                <Typography variant="body1" className={classes.secondaryFont}>
                    Thanks for purchasing from us. We have received your order request.
                </Typography>
                <Typography variant="h6" className={classes.primaryFont}>
                    You will soon receive an order confirmation via email or whatsapp. Kindly confirm it to place your order with us!
                </Typography>
            </div>
        </Box>
    )
};

export default withStyles(styles)(OrderConfirmationSection);