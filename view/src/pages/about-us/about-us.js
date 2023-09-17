import React, { useEffect } from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './about-us.style';
import NavigationBar from "../../components/NavigationBar/navigation-bar";
import Footer from "../../components/Footer/footer";
import bg from "../../assets/about-us-bg.png";
import { Typography } from "@material-ui/core";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase/firebase";

const AboutUsPage = (props) => {
    const { classes } = props;

    useEffect(() => {
        logEvent(analytics, "screen_view", {
            firebase_screen: "About Us Page",
            firebase_screen_class: "AboutUsPage"
        });
    }, []);

    return (
        <>
            <NavigationBar />
            <div className={classes.pageWrapper}>
                <div className={classes.hideForMobile}>
                    <img src={bg} width="733px" />
                </div>
                <div className={classes.rightWrapper}>
                    <Typography variant="h6" className={classes.aboutUsText}>About Us</Typography>
                    <br />
                    <Typography variant="h4" className={classes.subHeading}>A bunch of anime geeks</Typography>
                    <br />
                    <Typography variant="body1">
                    We are dedicated to providing the best selection of anime-themed products for all your favourite shows and characters.
    Our website features a wide range of high-quality products, including action figures, posters, clothing, keychains, and more. We have something for every fan, from casual viewers to die-hard collectors.
    Our products are carefully curated and sourced from the best manufacturers to ensure the highest quality and authenticity. We are proud to offer products from some of the most popular anime shows, including Naruto, Attack on Titan, Dragon Ball, and more.
    At our website, we strive to provide exceptional customer service and a seamless shopping experience. Our website is easy to navigate, and we offer fast and reliable shipping to all locations worldwide. We also offer hassle-free returns and exchanges, so you can shop with confidence.
    In addition to our products, we also provide valuable resources for anime fans, including reviews, recommendations, and news about upcoming releases and events. We are passionate about anime and love to share our knowledge and enthusiasm with our customers.
    So why wait? Explore our website today and find the perfect anime-themed products to add to your collection. And don't forget to sign up for our newsletter to stay up-to-date on the latest anime news and product releases.
                    </Typography>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default withStyles(styles)(AboutUsPage);