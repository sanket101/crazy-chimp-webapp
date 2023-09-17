import React, { useState, useEffect } from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './faq.style';
import NavigationBar from "../../components/NavigationBar/navigation-bar";
import Footer from "../../components/Footer/footer";
import bg from "../../assets/about-us-bg.png";
import { Typography } from "@material-ui/core";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase/firebase";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const orderFaqs = [
    {
        question: "How do I place an order on your website?",
        answer: "To place an order, simply browse our collection and select the items you wish to purchase. Add them to your cart, proceed to checkout, and follow the prompts to provide your shipping and payment information. Once your order is confirmed, you will receive an email notification."
    },
    {
        question: "Is it mandatory to create an account to place an order?",
        answer: "Yes, creating an account is mandatory to place an order. It allows for a smoother shopping experience, as you can track your orders, save your payment details, and access exclusive offers and promotions. Rest assured that your information will be securely stored and protected."
    },
    {
        question: "Can I modify or cancel my order after it has been placed?",
        answer: "Unfortunately, we are unable to modify or cancel orders once they have been placed. Please review your order carefully before confirming your purchase. If you encounter any issues or need assistance, please reach out to our customer service team as soon as possible."
    },
    {
        question: "Is it safe to enter my payment information on your website?",
        answer: "Yes, we take the security of your information seriously. Our website employs industry-standard encryption technology to ensure that your payment details are secure. We also offer trusted payment options, including credit/debit cards and secure online payment platforms, for your convenience."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we offer international shipping for select customers. If you have already contacted us through Instagram or email and received confirmation for international shipping, please proceed with placing your order. During the checkout process, you can select your country and provide your shipping address. Please note that international shipping may incur additional customs fees or import duties, which are the responsibility of the customer."
    },
    {
        question: "How can I track the status of my order?",
        answer: "Once your order is shipped, you will receive a tracking number via email. You can use this tracking number to monitor the progress of your package. Alternatively, you can log into your account on our website and view the order details to find the tracking information."
    },
    {
        question: "What if I receive a defective or incorrect item?",
        answer: "If you receive a defective or incorrect item, please contact our customer service team immediately. We will gladly assist you in resolving the issue and arranging a return or exchange, depending on the circumstances."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We offer a variety of payment methods to make your shopping experience convenient. We accept major credit and debit cards, including Visa, Mastercard, American Express, and Discover. Additionally, we provide options for UPI (Unified Payments Interface) payments and QR code payments. You can select your preferred payment method during checkout to complete your purchase securely."
    },
];

const shippingFaqs = [
    {
        question: "Where do you ship to?",
        answer: "We offer shipping services throughout India, covering all states and cities. Additionally, we also provide shipping to selected international countries."
    },
    {
        question: "How much does shipping cost?",
        answer: "Shipping costs may vary depending on your location, the size and weight of the package, and the shipping method selected. The exact shipping cost for your order will be calculated and displayed during the checkout process. We strive to offer competitive shipping rates while ensuring reliable and timely delivery."
    },
    {
        question: "How long will it take for my order to arrive?",
        answer: "The estimated delivery time will depend on your location, the shipping method chosen, and any potential customs procedures. During the checkout process, you will see an estimated delivery time frame for your order (usually it’s 7-8 days). Please note that unforeseen circumstances or high-demand periods may affect delivery times, but we always strive to deliver your order as quickly as possible."
    },
    {
        question: "Will I receive a tracking number for my shipment?",
        answer: "Yes, once your order is shipped, we will provide you with a tracking number via email. You can use this tracking number to monitor the progress of your package. Tracking information may also be available within your account on our website."
    },
    {
        question: "What if there is an issue with my shipment or delivery?",
        answer: "If you encounter any issues with your shipment or delivery, please contact our customer service team as soon as possible. We will do our best to assist you and resolve any problems that may arise during the shipping process."
    },
];

const returnFaqs = [
    {
        question: "What is your return policy?",
        answer: "We want you to be completely satisfied with your purchase. If for any reason you are not happy with your order, we offer a flexible return policy. Please review our return policy page on our website for detailed information on eligibility, timelines, and procedures."
    },
    {
        question: "How do I initiate a return?",
        answer: "To initiate a return, please reach out to us at crazychimpofficial@gmail.com."
    },
    {
        question: "Is there a time limit for returns?",
        answer: "We have a specified return window within which returns must be initiated. Please refer to our return policy for specific details regarding the return window for your purchase."
    },
    {
        question: "Who covers the return shipping costs?",
        answer: "The responsibility for return shipping costs may vary depending on the reason for the return. In some cases, we provide prepaid return labels, while in other cases, the customer may be responsible for the return shipping fees. Please refer to our return policy for more information regarding return shipping costs."
    },
    {
        question: "How long does it take to process a return?",
        answer: "Once we receive your returned item, our team will inspect it to ensure it meets the return eligibility criteria. The processing time for returns may vary, but we strive to process returns as quickly as possible. You will be notified via email regarding the status of your return and any applicable refund or exchange."
    },
    {
        question: "Can I exchange an item instead of returning it for a refund?",
        answer: "In certain cases, exchanges may be available for eligible items. If you prefer an exchange instead of a refund, please follow the instructions outlined in our return policy for initiating an exchange request. Availability of exchanges may depend on stock availability and other factors."
    },
    {
        question: "What if I receive a defective or incorrect item?",
        answer: "If you receive a defective or incorrect item, please contact our customer service team immediately. We will work with you to resolve the issue promptly, either by providing a replacement, refund, or alternative solution."
    },
];

const replacementFaqs = [
    {
        question: "What is your replacement policy?",
        answer: "We understand that receiving a defective or incorrect item can be frustrating. We offer a replacement policy to ensure you receive the right product in proper condition. Please review our replacement policy page on our website for detailed information on eligibility, timelines, and procedures."
    },
    {
        question: "How do I request a replacement?",
        answer: "To request a replacement, please follow the steps outlined in our replacement policy. Typically, this involves contacting our customer service team directly and providing relevant details about the issue you encountered with your order. Our team will guide you through the replacement process and provide further instructions."
    },
    {
        question: "What items are eligible for replacement?",
        answer: "Items that are defective, damaged during shipping, or received incorrectly are generally eligible for replacement. However, certain products may have specific replacement eligibility criteria. Please refer to our replacement policy for item-specific details and exceptions."
    },
    {
        question: "Is there a time limit for replacement requests?",
        answer: "We have a specified timeframe within which replacement requests must be initiated. The timeframe may vary depending on the nature of the issue and the specific item. It's important to review our replacement policy for the exact timeframe for your purchase."
    },
    {
        question: "Who covers the shipping costs for replacements?",
        answer: "If the need for a replacement arises due to our error or a defective/damaged item, we typically cover the shipping costs associated with the replacement. However, if the issue is due to customer error or preference (e.g., incorrect size or change of mind), the customer may be responsible for the return shipping fees. Please refer to our replacement policy for more information regarding shipping costs."
    },
    {
        question: "How long does it take to process a replacement?",
        answer: "Once your replacement request is approved, we strive to process replacements as quickly as possible. Processing times may vary depending on the availability of the replacement item and other factors. We will keep you updated on the progress of your replacement and provide an estimated timeframe for delivery."
    },
    {
        question: "Can I request an exchange instead of a replacement?",
        answer: "In some cases, exchanges may be available for eligible items. If you prefer an exchange instead of a replacement, please communicate your preference to our customer service team when initiating the replacement request. Availability of exchanges may depend on stock availability and other factors."
    },
    {
        question: "What if I have additional questions or concerns?",
        answer: "If you have any further questions or concerns regarding replacements or need additional assistance, please don't hesitate to reach out to our customer service team. We are here to ensure a smooth and satisfactory replacement experience for you!"
    },
];

const FaqPage = (props) => {
    const [value, setValue] = useState(0);
    const { classes } = props;

    useEffect(() => {
        logEvent(analytics, "screen_view", {
            firebase_screen: "Faq Page",
            firebase_screen_class: "FaqPage"
        });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
    return (
        <>
            <NavigationBar />
            <div className={classes.pageWrapper}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab className={classes.fontPrimary} label="Order" {...a11yProps(0)} />
                        <Tab className={classes.fontPrimary} label="Shipping" {...a11yProps(1)} />
                        <Tab className={classes.fontPrimary} label="Return" {...a11yProps(2)} />
                        <Tab className={classes.fontPrimary} label="Replacement" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <div style={{textAlign: "left"}}>
                        {orderFaqs.map((order, index) => {
                            return (
                                <div key={index}>
                                    <Typography variant="h6">{order.question}</Typography>
                                    <Typography variant="body1" style={{color: "white"}}>{order.answer}</Typography>
                                    <br />
                                </div>
                            )
                        })}
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div style={{textAlign: "left"}}>
                        {shippingFaqs.map((order, index) => {
                            return (
                                <div key={index}>
                                    <Typography variant="h6">{order.question}</Typography>
                                    <Typography variant="body1" style={{color: "white"}}>{order.answer}</Typography>
                                    <br />
                                </div>
                            )
                        })}
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div style={{textAlign: "left"}}>
                        {returnFaqs.map((order, index) => {
                            return (
                                <div key={index}>
                                    <Typography variant="h6">{order.question}</Typography>
                                    <Typography variant="body1" style={{color: "white"}}>{order.answer}</Typography>
                                    <br />
                                </div>
                            )
                        })}
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <div style={{textAlign: "left"}}>
                        {replacementFaqs.map((order, index) => {
                            return (
                                <div key={index}>
                                    <Typography variant="h6">{order.question}</Typography>
                                    <Typography variant="body1" style={{color: "white"}}>{order.answer}</Typography>
                                    <br />
                                </div>
                            )
                        })}
                    </div>
                </TabPanel>
            </div>
            <Footer />
        </>
    );
};

export default withStyles(styles)(FaqPage);