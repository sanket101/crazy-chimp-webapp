import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Box, Button, Dialog, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import styles from './order-confirmation-section.style';
import ROUTES from '../../constants/routes-name';
import { useHistory } from 'react-router-dom';

const OrderConfirmationSection = (props) => {
    const { classes, paymentMethod } = props;

    let history = useHistory();

    const renderConfirmationSection = () => {
        if (paymentMethod === "cod" || paymentMethod === "qr") {
            return (
                <>
                    <div className={classes.infoIconWrapper}>
                        <InfoIcon />
                    </div>

                    <div className={classes.confirmationWrapper}>
                        <Typography variant="body1" className={classes.secondaryFont}>
                            Thank you for placing the order.
                        </Typography>
                        <Typography variant="h6" className={classes.primaryFont}>
                            We will contact you shortly via email or whatsapp for confirmation of the order.
                        </Typography>

                        <Button variant='contained' className={classes.placeOrderButton} onClick={() => history.push(ROUTES.ACCOUNT)}>My Orders</Button>
                    </div>
                </>
            );
        }

        return (
            <>
                <div className={classes.infoIconWrapper}>
                    <CheckCircleIcon />
                </div>

                <div className={classes.confirmationWrapper}>
                    <Typography variant="body1" className={classes.secondaryFont}>
                        Thank you for the purchase.
                    </Typography>
                    <Typography variant="h6" className={classes.primaryFont}>
                        You will receive the payment invoice shortly on your mentioned email id and the tracking id will be shared as soon as the order is shipped.
                    </Typography>

                    <Button variant='contained' className={classes.placeOrderButton} onClick={() => history.push(ROUTES.ACCOUNT)}>My Orders</Button>
                </div>
            </>
        );
    };

    return (
        <Dialog onClose={() => {}} open={props.confirmationDialog}>
            <Box className={classes.boxWrapper}>
                {renderConfirmationSection()}
            </Box>
        </Dialog>
    )
};

export default withStyles(styles)(OrderConfirmationSection);