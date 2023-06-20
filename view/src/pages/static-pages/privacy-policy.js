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
                    <br />
                    <Typography variant="h6" className={classes.primaryFont}>Cookies and Web Beacons</Typography>
                    <br />
                    <Typography variant="body1">Like any other website, Crazy Chimp uses “cookies”. These cookies are used to store information including visitors’ preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users’ experience by customizing our web page content based on visitors’ browser type and/or other information.</Typography>
                    <br />
                    <Typography variant="h6" className={classes.primaryFont}>Advertising Partners Privacy Policies</Typography>
                    <br />
                    <Typography variant="body1">You may consult this list to find the Privacy Policy for each of the advertising partners of Crazy Chimp. Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Crazy Chimp, which are sent directly to users’ browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. Note that Crazy Chimp has no access to or control over these cookies that are used by third-party advertisers.</Typography>
                    <br />
                    <Typography variant="h6" className={classes.primaryFont}>Third Party Privacy Policies</Typography>
                    <br />
                    <Typography variant="body1">Crazy Chimp's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options</Typography>
                    <br />
                    <Typography variant="body1">You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers’ respective websites.</Typography>
                    <br />
                    <Typography variant="h6" className={classes.primaryFont}>CCPA Privacy Rights (Do Not Sell My Personal Information)</Typography>
                    <br />
                    <Typography variant="body1">Under the CCPA, among other rights, California consumers have the right to:</Typography>
                    <br />
                    <ul className={classes.listWrapper}>
                        <li><Typography variant="body1">Request that a business that collects a consumer’s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</Typography></li>
                        <li><Typography variant="body1">Request that a business delete any personal data about the consumer that a business has collected.</Typography></li>
                        <li><Typography variant="body1">Request that a business that sells a consumer’s personal data, not sell the consumer’s personal data.</Typography></li>
                        <li><Typography variant="body1">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</Typography></li>
                    </ul>
                    <br />
                    <Typography variant="h6" className={classes.primaryFont}>GDPR Data Protection Rights</Typography>
                    <br />
                    <Typography variant="body1">We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</Typography>
                    <br />
                    <ul className={classes.listWrapper}>
                        <li><Typography variant="body1">The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</Typography></li>
                        <li><Typography variant="body1">The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</Typography></li>
                        <li><Typography variant="body1">The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</Typography></li>
                        <li><Typography variant="body1">The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</Typography></li>
                        <li><Typography variant="body1">The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</Typography></li>
                        <li><Typography variant="body1">The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</Typography></li>
                        <li><Typography variant="body1">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</Typography></li>
                    </ul>
                    <br />
                    <Typography variant="h6" className={classes.primaryFont}>Changes to This Privacy Policy</Typography>
                    <br />
                    <Typography variant="body1">We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page. Our Privacy Policy was created with the help of the Privacy Policy Generator.</Typography>
                    <br />
                    <Typography variant="h6" className={classes.primaryFont}>Contact Us</Typography>
                    <br />
                    <Typography variant="body1">If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.</Typography>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default withStyles(styles)(PrivacyPolicyPage);