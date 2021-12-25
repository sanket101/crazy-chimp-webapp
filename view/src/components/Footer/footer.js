import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Link } from '@material-ui/core';
import styles from './footer.style';

const Footer = (props) => {
    const { classes } = props;

    return(
        <div className={classes.footerWrapper}>
            <Typography variant='caption'>Copyright © 2021 Crazy Chimp - All Rights Reserved.</Typography>
            <div className={classes.footerLinks}>
                <Link component="button" variant="body2" className={classes.footerLink}>Privacy Policy</Link>
                <Link component="button" variant="body2" className={classes.footerLink}>Terms and Conditions</Link>
            </div>
        </div>
    );
};

export default withStyles(styles)(Footer);