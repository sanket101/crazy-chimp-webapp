import React from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './common.style';
import { Typography } from "@material-ui/core";
import NavigationBar from "../../components/NavigationBar/navigation-bar";
import Footer from "../../components/Footer/footer";

const TechnicalErrorPage = (props) => {
    const { classes } = props;
    return (
        <>
            <NavigationBar />
            <div className={classes.pageWrapper}>
                <Typography variant="h3" className={classes.primaryFont}>Something went wrong!</Typography>
                <Typography variant="body1">It seems there is some issue from our end. Please try again after sometime...Apologies :(</Typography>
            </div>
            <Footer />
        </>
    );
};

export default withStyles(styles)(TechnicalErrorPage);