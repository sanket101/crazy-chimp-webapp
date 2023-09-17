import React from 'react';
import { useHistory } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Link } from '@material-ui/core';
import styles from './footer.style';
import ROUTES from '../../constants/routes-name';
import logo from '../../assets/logo.png';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import linkedin from '../../assets/linkedin.png';
import mal from '../../assets/mal.png';

const Footer = (props) => {
    const { classes } = props;
    let history = useHistory();
    return (
        <div className={classes.footerWrapper}>
            <div className={classes.logoWrapper}>
                <img src={logo} alt="Crazy Chimp Logo" height="80px" />
            </div>
            <div className={classes.socialMediaIconWrapper}>
                <div>
                    <a href='https://www.instagram.com/crazychimp.in/' target='_blank'>
                        <img src={instagram} alt="Crazy Chimp Instagram" height="32px" />
                    </a>
                </div>

                <div>
                    <a href='https://www.facebook.com/crazychimp.in/' target='_blank'>
                        <img src={facebook} alt="Crazy Chimp Facebook" height="32px" />
                    </a>
                </div>

                <div>
                    <a href='https://www.linkedin.com/company/crazy-chimp/' target='_blank'>
                        <img src={linkedin} alt="Crazy Chimp LinkedIn" height="32px" />
                    </a>
                </div>

                <div>
                    <a href='https://myanimelist.net/profile/crazychimp' target='_blank'>
                        <img src={mal} alt="Crazy Chimp MAL" height="32px" />
                    </a>
                </div>
            </div>
            <div className={classes.footerLinkSectionWrapper}>
                <div>
                    <div className={classes.footerLinkSection}>
                        <div className={classes.footerSubsection}>
                            <Typography variant='body1' className={classes.secondaryFont}>PAGES</Typography>
                            <div className={classes.multiSectionWrapper}>
                                <div onClick={() => history.push(ROUTES.HOME)}>
                                    <Typography variant='caption'>Home</Typography>
                                </div>
                                <div onClick={() => history.push(ROUTES.SHOP)}>
                                    <Typography variant='caption'>Product</Typography>
                                </div>
                                <div onClick={() => history.push(ROUTES.GALLERY)}>
                                    <Typography variant='caption'>Gallery</Typography>
                                </div>
                                <div onClick={() => history.push(ROUTES.LOGIN)}>
                                    <Typography variant='caption'>Login</Typography>
                                </div>
                                <div onClick={() => history.push(ROUTES.ACCOUNT)}>
                                    <Typography variant='caption'>Account</Typography>
                                </div>
                            </div>
                        </div>

                        <div className={classes.footerSubsection}>
                            <Typography variant='body1' className={classes.secondaryFont}>INFORMATION</Typography>
                            <div className={classes.multiSectionWrapper}>
                                <div onClick={() => history.push(ROUTES.ABOUTUS)}>
                                    <Typography variant='caption'>About Us</Typography>
                                </div>
                                <div onClick={() => history.push(ROUTES.CONTACT)}>
                                    <Typography variant='caption'>Join Us</Typography>
                                </div>
                                <div>
                                    <Typography variant='caption'>Business</Typography>
                                </div>
                                <div>
                                    <Typography variant='caption'>Discount</Typography>
                                </div>
                            </div>
                        </div>

                        <div className={classes.footerSubsection}>
                            <Typography variant='body1' className={classes.secondaryFont}>LEGAL</Typography>
                            <div className={classes.multiSectionWrapper}>
                                <div onClick={() => history.push(ROUTES.FAQ)}>
                                    <Typography variant='caption'>Shipping / Return</Typography>
                                </div>
                                <div onClick={() => history.push(ROUTES.PRIVACY_POLICY)}>
                                    <Typography variant='caption'>Privacy Policy</Typography>
                                </div>
                                <div onClick={() => history.push(ROUTES.TNC)}>
                                    <Typography variant='caption'>Terms & Conditions</Typography>
                                </div>
                            </div>
                        </div>

                        <div className={classes.footerSubsection}>
                            <Typography variant='body1' className={classes.secondaryFont}>CONTENT</Typography>
                            <div className={classes.multiSectionWrapper}>
                                <div onClick={() => history.push(`${ROUTES.SHOP}?productCategory=HST`)}>
                                    <Typography variant='caption'>Half Sleeve T-shirt</Typography>
                                </div>
                                <div onClick={() => history.push(`${ROUTES.SHOP}?productCategory=HOODIES`)}>
                                    <Typography variant='caption'>Hoodies</Typography>
                                </div>
                                <div onClick={() => history.push(`${ROUTES.SHOP}?productCategory=SWTS`)}>
                                    <Typography variant='caption'>Sweatshirt</Typography>
                                </div>
                                <div onClick={() => history.push(`${ROUTES.SHOP}?productCategory=OST`)}>
                                    <Typography variant='caption'>Oversized T-shirt</Typography>
                                </div>
                            </div>
                        </div>

                        <div className={classes.footerSubsection}>
                            <Typography variant='body1' className={classes.secondaryFont}>SUPPORT</Typography>
                            <div className={classes.multiSectionWrapper}>
                                <div onClick={() => history.push(ROUTES.CONTACT)}>
                                    <Typography variant='caption'>Contact Us</Typography>
                                </div>
                                <div onClick={() => history.push(ROUTES.FAQ)}>
                                    <Typography variant='caption'>FAQ</Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.hrHighlight}><hr /></div>
                
                <div>
                    <Typography variant='caption'>Copyright © 2022 Crazy Chimp : A Unit of Excelsior - All Rights Reserved.</Typography>
                </div>
                <div>
                    <Typography variant='h4' className={classes.emailWrapper}>crazychimpofficial@gmail.com</Typography>
                </div>
            </div>
        </div>
    );
};

export default withStyles(styles)(Footer);