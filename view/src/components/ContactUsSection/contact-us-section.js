import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, IconButton } from '@material-ui/core';
import { Instagram as InstagramIcon, Facebook as FacebookIcon} from '@material-ui/icons';
import styles from './contact-us-section.style';
import LINKS from '../../constants/imp-links';

const ContactUsSection = (props) => {
    const { classes } = props;
    return (
        <div className={classes.contactUsSectionWrapper}>
            <Typography variant="h3">Contact Us</Typography>
            <div className={classes.contactUsDescription}>
                <Typography variant="body1" className={classes.contactUsEmail}>Feel free to reach out to us at <a className={classes.emailLink} href='mailto:crazychimpofficial@gmail.com'>crazychimpofficial@gmail.com</a> or call us at <a className={classes.emailLink} href='tel:+919309515415'>+919309515415</a> for any business query, order status or just to say Hi :)</Typography>
                <Typography variant="body1">We are quite active on our social media platforms as well. You can DM us for any queries!</Typography>
                <div>
                    <IconButton className={classes.socialMediaBtn} href={LINKS.CRAZY_CHIMP_INSTAGRAM} target="_blank">
                        <InstagramIcon />
                    </IconButton>
                    <IconButton className={classes.socialMediaBtn} href={LINKS.CRAZY_CHIMP_FACEBOOK} target="_blank">
                        <FacebookIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default withStyles(styles)(ContactUsSection);