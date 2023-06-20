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

                <div>
                <Typography variant="h6" className={classes.primaryFont}>Contact our Support Team to know what you want</Typography>
                <TextField
                                id="outlined-email-input"
                                label="Name"
                                type="text"
                                variant="outlined"
                                className={classes.textFieldCss}
                                // value={emailId}
                                // onChange={(event) => setEmailId(event.target.value)}
                                // onBlur={(event) => onBlur('emailId', event.target.value)}
                                // error={errorState.emailId ? true : false}
                                // helperText={errorState.emailId}
                                autoComplete="new-password"
                            />

<TextField
                                id="outlined-email-input"
                                label="Email Address"
                                type="email"
                                variant="outlined"
                                className={classes.textFieldCss}
                                // value={emailId}
                                // onChange={(event) => setEmailId(event.target.value)}
                                // onBlur={(event) => onBlur('emailId', event.target.value)}
                                // error={errorState.emailId ? true : false}
                                // helperText={errorState.emailId}
                                autoComplete="new-password"
                            />

<TextField
                                id="outlined-multiline-static"
                                label="Message"
                                multiline
                                rows={4}
                            />

                            
                </div>
                <div>
                    <br />
                    <Button variant="contained">Submit</Button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default withStyles(styles)(ContactUsPage);