import React, { useEffect, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Button } from '@material-ui/core';
import styles from './landing-section.style';
import  { desktopImgArray, mobileImgArray } from './landing-section-images';
import useCheckMobileScreen from '../../utils/isMobile';

const LandingSection = (props) => {
    const { classes, onClickShopNow } = props;

    const isMobile = useCheckMobileScreen();

    const imageArrayToRender = isMobile ? mobileImgArray : desktopImgArray;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const cacheImages = async (srcArray) => {
        const promises = await srcArray.map((src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();

                img.src = src;
                img.onload = resolve();
                img.onerror = reject();
            });
        });

        await Promise.all(promises);
    };

    useEffect(() => {
        cacheImages(imageArrayToRender);

        const interval = setInterval(() => {
            setCurrentImageIndex(currentImageIndex => ((currentImageIndex + 1) % imageArrayToRender.length));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={currentImageIndex%2 === 0 ? true : false}
                    addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                    }}
                    classNames="backgroundimage">
                        <div className={classes.background}>
                            <img src={imageArrayToRender[currentImageIndex]} />
                            <div className={classes.titleSection}>
                                <Typography variant="h2" className={classes.headingVariationH2}>Welcome to <span className={classes.landingPageHighlighter}>Crazy Chimp</span></Typography>
                                <Typography variant="h4" className={classes.headingVariationH4}>An Online Marketplace for the <span className={classes.landingPageHighlighter}>best anime merchandise</span>!</Typography>
                                <Button variant="contained" className={classes.shopNowButton} onClick={onClickShopNow}>SHOP NOW</Button>
                            </div>
                        </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
};

export default withStyles(styles)(LandingSection);