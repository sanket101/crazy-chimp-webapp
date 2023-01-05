import React, { useEffect } from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './common.style';
import { Typography } from "@material-ui/core";
import NavigationBar from "../../components/NavigationBar/navigation-bar";
import Footer from "../../components/Footer/footer";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase/firebase";

const PrivacyPolicyPage = (props) => {
    const { classes } = props;

    useEffect(() => {
        logEvent(analytics, "screen_view", {
            firebase_screen: "Privacy Policy Page",
            firebase_screen_class: "PrivacyPolicyPage"
        });
    }, []);

    return (
        <>
            <NavigationBar />
            <div className={classes.pageWrapper}>
                <Typography variant="h3" className={classes.primaryFont}>Privacy Policy</Typography>
                <br />
                <div className={classes.leftAlignment}>
                    <Typography variant="body1">At Crazy Chimp, accessible from https://crazychimp.org, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Crazy Chimp and how we use it.</Typography>
                    <br />
                    <Typography variant="body1">If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</Typography>
                    <br />
                    <Typography variant="body1">This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Crazy Chimp. This policy is not applicable to any information collected offline or via channels other than this website.</Typography>
                    <br />
                    <Typography variant="h6" className={classes.primaryFont}>Consent</Typography>
                    <br />
                    <Typography variant="body1">By using our website, you hereby consent to our Privacy Policy and agree to its terms.</Typography>
                    <br />
                    <Typography variant="h6" className={classes.primaryFont}>Information we collect</Typography>
                    <br />
                    <Typography variant="body1">The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</Typography>
                    <br />
                    <Typography variant="body1">If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</Typography>
                    <br />
                    <Typography variant="body1">When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</Typography>
                    <br />
                    <Typography variant="h6" className={classes.primaryFont}>How we use your information</Typography>
                    <br />
                    <Typography variant="body1">We use the information we collect in various ways, including to:</Typography>
                    <br />
                    <ul className={classes.listWrapper}>
                        <li><Typography variant="body1">Provide, operate, and maintain our website</Typography></li>
                        <li><Typography variant="body1">Improve, personalize, and expand our website</Typography></li>
                        <li><Typography variant="body1">Understand and analyze how you use our website</Typography></li>
                        <li><Typography variant="body1">Develop new products, services, features, and functionality</Typography></li>
                        <li><Typography variant="body1">Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</Typography></li>
                        <li><Typography variant="body1">Send you emails</Typography></li>
                        <li><Typography variant="body1">Find and prevent fraud</Typography></li>
                    </ul>
                    <br />
                    <Typography variant="h6" className={classes.primaryFont}>Log Files</Typography>
                    <br />
                    <Typography variant="body1">Crazy Chimp follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</Typography>
                    <br />
                    <Typography variant="h6" className={classes.primaryFont}>Children's Information</Typography>
                    <br />
                    <Typography variant="body1">Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</Typography>
                    <br />
                    <Typography variant="body1">Crazy Chimp does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</Typography>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default withStyles(styles)(PrivacyPolicyPage);