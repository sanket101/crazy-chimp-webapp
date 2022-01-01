import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Button } from '@material-ui/core';
import styles from './landing-section.style';

const LandingSection = (props) => {
    const { classes, onClickShopNow } = props;

    return (
        <div className={classes.background}>
            <div className={classes.titleSection}>
                <Typography variant="h2" className={classes.headingVariationH2}>Welcome to Crazy Chimp</Typography>
                <Typography variant="h4" className={classes.headingVariationH4}>An Online Marketplace for the best anime merchandise!</Typography>
                <Button variant="contained" className={classes.shopNowButton} onClick={onClickShopNow}>SHOP NOW</Button>
            </div>
        </div>
    );
};

export default withStyles(styles)(LandingSection);