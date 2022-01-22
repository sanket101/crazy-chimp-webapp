import React from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './common.style';
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import NavigationBar from "../../components/NavigationBar/navigation-bar";
import Footer from "../../components/Footer/footer";

const TnCPage = (props) => {
    const { classes } = props;

    const termsList = [
        'The content of this page is for your general information and use only. It is subject to change without prior notice.',
        'All artworks posted on this page are intended as fan art and not purported to be official merchandise unless indicated otherwise. If you have any issues regarding the artwork do write to us at crazychimpofficial@gmail.com.',
        'You may only purchase or order items for non-commercial and lawful purposes and any other use is not permitted. You agree to pay for all charges noted herein as payable by you.',
        'Crazy Chimp may correct errors or inaccuracies and change or update information on this page at any time without prior notice, including in respect of prices and availability of items. All prices listed on this page are in Indian National Rupees and all charges will be processed in INR.',
        'Crazy Chimp will use commercially reasonable efforts to deliver items as quickly as possible and within any time periods indicated; however, Crazy Chimp will not be responsible for any delays in delivery that are beyond its control. Whenever a delivery is delayed, Crazy Chimp will notify you as soon as possible.',
        'You acknowledge that information and materials provided on the page may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.',
        'We collect personally identifiable information like Name, Postal Address, Email Address, etc when voluntarily submitted by our visitors. The information provided is only used to fulfill your request unless you give it to us in some other manner, for example, for adding to one of our offers or mailing lists.',
        'Orders when placed will be delivered to the given address by at most 15 days. Delivery time may vary depending upon the shipping address and other factors (public holidays, extreme weather conditions, etc.). Whenever a delivery is delayed, Crazy Chimp will notify you as soon as possible.',
        'Customers can exchange their order within 2 days after an order has been delivered. In the interest of hygiene, we refuse returns where it\'s obvious that the item has been worn, washed or soiled. In case you have received a defective product, send us images at crazychimpofficial@gmail.com and we will get back to you. Once confirmed by the Team the refund will be provided either into your bank account.'
    ];

    return (
        <>
            <NavigationBar />
            <div className={classes.pageWrapper}>
                <Typography variant="h3" className={classes.primaryFont}>Terms and Conditions</Typography>
                <List>
                    {
                        termsList.map((item, index) => {
                        return (
                            <ListItem key={index}>
                                <ListItemText primary={item} />
                            </ListItem>
                        ); 
                        })
                    }
                </List>
            </div>
            <Footer />
        </>
    );
};

export default withStyles(styles)(TnCPage);