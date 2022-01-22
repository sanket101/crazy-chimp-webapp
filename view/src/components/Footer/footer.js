import React from 'react';
import { useHistory } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Link } from '@material-ui/core';
import styles from './footer.style';
import ROUTES from '../../constants/routes-name';

const Footer = (props) => {
    const { classes } = props;
    let history = useHistory();
    return(
        <div className={classes.footerWrapper}>
            <Typography variant='caption'>Copyright © 2022 Crazy Chimp : A Unit of Excelsior - All Rights Reserved.</Typography>
            <div className={classes.footerLinks}>
                <Link component="button" variant="body2" className={classes.footerLink} onClick={() => history.push(ROUTES.PRIVACY_POLICY)}>Privacy Policy</Link>
                <Link component="button" variant="body2" className={classes.footerLink} onClick={() => history.push(ROUTES.TNC)}>Terms and Conditions</Link>
            </div>
        </div>
    );
};

export default withStyles(styles)(Footer);