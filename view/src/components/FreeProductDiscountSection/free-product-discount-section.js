import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authMiddleWare } from '../../utils/auth';
import axios from 'axios';
import apiConfig from '../../api/api-config';
import { Box, Button, CircularProgress, Typography, withStyles } from '@material-ui/core';
import styles from './free-product-discount-section.style';
import ROUTES from '../../constants/routes-name';
import GiftLock from '../../assets/Gift_Lock.png';
import GiftUnlock from '../../assets/Gift_Unlock.png';
import HodLock from '../../assets/HOD_Lock.png';
import HodUnlock from '../../assets/HOD_Unlock.png';
import SwtsLock from '../../assets/SWTS_Lock.png';
import SwtsUnlock from '../../assets/SWTS_Unlock.png';
import HstLock from '../../assets/HST_Lock.png';
import HstUnlock from '../../assets/HST_Unlock.png';
import FreeBackground from '../../assets/FreeProductBackground.png';
import useCheckMobileScreen from '../../utils/isMobile';

const FreeProductDiscountSection = (props) => {
    const { classes, freeProductInfo, setFreeProductInfo } = props;
    const [sectionStatus, setSectionStatus] = useState('');
    const [sectionData, setSectionData] = useState(freeProductInfo ? freeProductInfo : {});

    let history = useHistory();
    const isMobile = useCheckMobileScreen();

    const callFreeProductApi = async () => {
        try {
            const authToken = localStorage.getItem('AuthToken');
            if (authToken) {
                axios.defaults.headers.common = { Authorization: `${authToken}` };
                const { data } = await axios.get(apiConfig.getFreeProductDiscountInfo);
                if (data.discountEligibility && data.orderQty) {
                    setSectionData(data);
                    setFreeProductInfo(data);
                    setSectionStatus("SUCCESS");
                }
                else {
                    setSectionStatus("ERROR");
                }
            }
            else {
                setSectionStatus("UNAUTHORIZED");
            }
        }
        catch (err) {
            if (err?.response?.status === 403) {
                setSectionStatus("UNAUTHORIZED");
            }
            else {
                setSectionStatus("ERROR");
            }
        }
    };

    const renderGiftCards = () => {
        let hstOstLeft = sectionData["discountEligibility"].OST_HST_QTY - sectionData["orderQty"].OST_HST_QTY;
        hstOstLeft = hstOstLeft < 0 ? 0 : hstOstLeft;

        let hoodiesLeft = sectionData["discountEligibility"].HOODIES_QTY - sectionData["orderQty"].HOODIES_QTY;
        hoodiesLeft = hoodiesLeft < 0 ? 0 : hoodiesLeft;

        let swtsLeft = sectionData["discountEligibility"].SWTS_QTY - sectionData["orderQty"].SWTS_QTY;
        swtsLeft = swtsLeft < 0 ? 0 : swtsLeft;

        const discountSuccess = (hstOstLeft === 0 && hoodiesLeft === 0 && swtsLeft === 0) ? true : false;

        return (
            <div className={classes.giftCardWrapper}>
                <div className={classes.hideForMobile}>
                    <div>
                        {discountSuccess ? <img src={GiftUnlock} width={'70px'} /> : <img src={GiftLock} width={'70px'} />}
                    </div>
                    <div className={classes.successSection}>
                        <div>
                            {hoodiesLeft === 0 ? <img src={HodUnlock} width={'70px'} /> : <img src={HodLock} width={'70px'} />}
                        </div>
                        <div>
                            {hoodiesLeft === 0 || hoodiesLeft === 1 ? <img src={HodUnlock} width={'70px'} /> : <img src={HodLock} width={'70px'} />}
                        </div>
                        <div>
                            {swtsLeft === 0 ? <img src={SwtsUnlock} width={'70px'} /> : <img src={SwtsLock} width={'70px'} />}
                        </div>
                    </div>
                    <div className={classes.successSection}>
                        <div>
                            {swtsLeft === 0 || swtsLeft === 1 ? <img src={SwtsUnlock} width={'70px'} /> : <img src={SwtsLock} width={'70px'} />}
                        </div>
                        <div>
                            {hstOstLeft === 0 ? <img src={HstUnlock} width={'70px'} /> : <img src={HstLock} width={'70px'} />}
                        </div>
                        <div>
                            {hstOstLeft === 0 || hstOstLeft === 1 ? <img src={HstUnlock} width={'70px'} /> : <img src={HstLock} width={'70px'} />}
                        </div>
                    </div>
                </div>
                <div className={classes.hideForDesktop}>
                    <div className={classes.mobileGiftCardWrapper}>
                        <div className={classes.subsection}>
                            <div>
                                {hoodiesLeft === 0 ? <img src={HodUnlock} width={'70px'} /> : <img src={HodLock} width={'70px'} />}
                            </div>
                            <div>
                                {hoodiesLeft === 0 || hoodiesLeft === 1 ? <img src={HodUnlock} width={'70px'} /> : <img src={HodLock} width={'70px'} />}
                            </div>
                        </div>

                        <div className={classes.subsection}>
                            <div>
                                {swtsLeft === 0 ? <img src={SwtsUnlock} width={'70px'} /> : <img src={SwtsLock} width={'70px'} />}
                            </div>
                            <div>
                                {swtsLeft === 0 || swtsLeft === 1 ? <img src={SwtsUnlock} width={'70px'} /> : <img src={SwtsLock} width={'70px'} />}
                            </div>
                        </div>

                        <div className={classes.subsection}>
                            <div>
                                {hstOstLeft === 0 ? <img src={HstUnlock} width={'70px'} /> : <img src={HstLock} width={'70px'} />}
                            </div>
                            <div>
                                {hstOstLeft === 0 || hstOstLeft === 1 ? <img src={HstUnlock} width={'70px'} /> : <img src={HstLock} width={'70px'} />}
                            </div>
                        </div>

                        <div className={classes.subsection}>
                            <div>
                                {discountSuccess ? <img src={GiftUnlock} width={'70px'} /> : <img src={GiftLock} width={'70px'} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderSection = (isMobile) => {

        if (!sectionStatus) {
            return <Box sx={{ textAlign: 'center' }}>
                <CircularProgress />
            </Box>;
        }
        if (sectionStatus === "ERROR") {
            return <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h6' className={classes.notoSerifFont}>Something went wrong, please try after sometime!</Typography>
            </Box>;
        }
        if (sectionStatus === "UNAUTHORIZED") {
            return <Box sx={{ textAlign: 'center' }}>
                <div className={classes.unauthorizedBg}>
                    <Typography variant='h6' className={classes.notoSerifFont}>Please login here first to get a free product!</Typography>
                    <Button variant="contained" className={classes.shopNowButton} onClick={() => { }}>LOGIN</Button>
                </div>
            </Box>;
        }
        if (sectionStatus === "SUCCESS") {
            return <div className={classes.successSection}>
                <div style={{ marginBottom: "1rem", textAlign: isMobile ? "center" : "left" }}>
                    <Typography variant='h6' className={classes.notoSerifFont}>
                        EARN A FREE PRODUCT BY <br /> UNLOCKING THE <br /> ITEMS IN CARDS.
                    </Typography>
                    <Typography variant='subtitle1' onClick={() => history.push(ROUTES.DISCOUNT)}>Click to know more about rules</Typography>
                </div>
                {renderGiftCards()}
            </div>
        }
    };

    useEffect(() => {
        if (!freeProductInfo) {
            callFreeProductApi();
        }
    }, []);

    return <div className={classes.sectionWrapper}>{renderSection(isMobile)}</div>;
};

export default withStyles(styles)(FreeProductDiscountSection);