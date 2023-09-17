import React, { useEffect, useState, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Button } from '@material-ui/core';
import styles from './landing-section.style';
import  { desktopImgArray, mobileImgArray } from './landing-section-images';
import useCheckMobileScreen from '../../utils/isMobile';
import landingSectionDesktop from '../../assets/Desktop.png';

const LandingSection = (props) => {
    const { classes, onClickShopNow } = props;

    const isMobile = useCheckMobileScreen();

    const [currentIndex, setCurrentIndex] = useState(0);

    const imageArrayToRender = isMobile ? mobileImgArray : mobileImgArray.slice(0, 4);
    const productIndexMapping = {
        "3" : "OST",
        "1" : "HST",
        "2" : "HOODIES",
        "0" : "SWTS"
    };
    
    // Function to move to the next image
    const goToNextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageArrayToRender.length);
    };
  
    useEffect(() => {
      // Automatically move to the next slide every 4 seconds
      const interval = setInterval(goToNextSlide, 4000);
      return () => clearInterval(interval); // Clean up the interval on unmount
    }, [currentIndex]);

    return (
        isMobile ? 
        <>
             <div className={classes.sliderContainer}>
                <div className={classes.slider}>
                    {imageArrayToRender.map((image, index) => (
                        <div
                            key={index}
                            className={`slide ${index === currentIndex ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${image})` }}
                        />
                    ))}
                </div>
                <div className={classes.fixedButton}>
                    <Button variant="contained" className={classes.shopNowButton} onClick={() => onClickShopNow()}>Get Rs. 50 off on orders above Rs.599</Button>
                    <Button variant="contained" className={classes.shopNowButton} onClick={() => onClickShopNow()}>Get Rs. 100 off on orders above Rs.1999</Button>
                </div>
            </div>
        </>
        :
        <>
            <div className={classes.sliderContainer}>
                <div className={classes.sliderDesktop}>
                    {imageArrayToRender.map((image, index) => (
                        <div
                            key={index}
                            className={`slideDesktop ${index < 4 ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${image})` }}
                            onClick={() => props.onClickShopNow(productIndexMapping[index.toString()])}
                        />
                    ))}
                </div>
                <div className={classes.fixedButtonsContainer}>
                    <div className={classes.fixedButtonDesktop}>
                        <Button variant="contained" className={classes.shopNowButton} onClick={() => onClickShopNow()}>Get Rs. 50 off on orders above Rs.599</Button>
                    </div>
                    <div className={classes.fixedButtonDesktop}>
                        <Button variant="contained" className={classes.shopNowButton} onClick={() => onClickShopNow()}>Get Rs. 100 off on orders above Rs.1999</Button>
                    </div>
                </div>
            </div> 
        </>
    );
};

export default withStyles(styles)(LandingSection);