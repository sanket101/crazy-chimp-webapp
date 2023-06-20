import React from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './contact-us.style';
import { Typography, IconButton, TextField, Button } from '@material-ui/core';
import { Instagram as InstagramIcon, Facebook as FacebookIcon} from '@material-ui/icons';
import NavigationBar from "../../components/NavigationBar/navigation-bar";
import Footer from "../../components/Footer/footer";
import LINKS from '../../constants/imp-links';

const ContactUsPage = (props) => {
    const { classes } = props;
    return (
        <>
            <NavigationBar />
            <div className={classes.pageWrapper}>
                <Typography variant="h3" className={classes.primaryFont}>Contact Us</Typography>
                <div className={classes.contactUsDescription}>
                    <Typography variant="body1" className={classes.contactUsEmail}>Feel free to reach out to us at <a className={classes.emailLink} href='mailto:crazychimpofficial@gmail.com'>crazychimpofficial@gmail.com</a> for any business query, order status or just to say Hi :)</Typography>
                    <Typography variant="body1">We are quite active on our social media platforms as well. You can DM us for any queries!</Typography>

                    <Typography variant="body1">Office Address : 24, Vasant Nagar, Near Diksha Bhoomi, Nagpur, Maharashtra, 440022</Typography>
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
            <Footer />
        </>
    );
};

export default withStyles(styles)(ContactUsPage);