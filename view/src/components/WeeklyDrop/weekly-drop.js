import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from './weekly-drop.style';
import withStyles from '@material-ui/core/styles/withStyles';
import { PRODUCT_NAME } from "../../constants/product-constants";

const WeeklyDrop = (props) => {
    const { classes } = props;
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if(props.weeklyDropProduct && Object.keys(props.weeklyDropProduct).length > 0) {
            setLoading(false);
        }
    }, [props.weeklyDropProduct]);

    console.log('WEEKLY DROP', props.weeklyDropProduct);

    return (
        <>
            {isLoading ? 
                <Box>
                    <CircularProgress />
                </Box>
                :
                <>
                    <div className={classes.hideForMobile}>
                        <div className={classes.weeklyDropWrapper}>
                            <div className={classes.weeklyDropContent}>
                                <Typography variant="h6" className={classes.secondaryFont}>This Weeks Drop</Typography>
                                <Typography variant="body1" className={classes.primaryFont}>{PRODUCT_NAME[props.weeklyDropProduct.productCategory]}</Typography>
                                <Typography variant="h4" className={classes.primaryFont}>{props.weeklyDropProduct.name}</Typography>
                                <Typography variant="body1" className={classes.primaryFont}>{`₹`}<del>{props.weeklyDropProduct.actualPrice}</del>{" "}{props.weeklyDropProduct.salePrice}</Typography>
                                <br />
                                <br />
                                <Button variant="contained" className={classes.shopNowButton} onClick={() => props.onProductClick(props.weeklyDropProduct)}>SHOP NOW</Button>
                            </div>
                            <div>
                                <img src={props.weeklyDropProduct.images[0]} width={"250px"} />
                            </div>
                        </div>
                    </div>
                    <div className={classes.hideForDesktop}>
                        <div className={classes.weeklyDropWrapper}>
                            <Typography variant="h4" className={classes.secondaryFont}>This Weeks Drop</Typography>
                            <img src={props.weeklyDropProduct.images[0]} width={"250px"} />
                            <Typography variant="h6" className={classes.primaryFont}>{props.weeklyDropProduct.name}</Typography>
                            <Typography variant="body1" className={classes.primaryFont}>{`₹`}<del>{props.weeklyDropProduct.actualPrice}</del>{" "}{props.weeklyDropProduct.salePrice}</Typography>
                            <Button variant="contained" className={classes.shopNowButton} onClick={() => props.onProductClick(props.weeklyDropProduct)}>SHOP NOW</Button>
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default withStyles(styles)(WeeklyDrop);