import React, { useState, useEffect } from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './contact.style';
import NavigationBar from "../../components/NavigationBar/navigation-bar";
import Footer from "../../components/Footer/footer";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase/firebase";
import { Typography } from "@material-ui/core";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ContactUsSection from "../../components/ContactUsSection/contact-us-section";
import JoinUsSection from "../../components/JoinUsSection/join-us-section";
import VALIDATION_ERROR from '../../constants/validation-errors';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ContactUsPage = (props) => {
    const { classes } = props;
    const [value, setValue] = useState(0);

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

    const onBlur = (key, value, errorState, setErrorState) => {
        if(key === "email") {
            if(!value || value.trim() === "") {
                setErrorState({...errorState, [key]: VALIDATION_ERROR.FIELD_LEFT_BLANK});
                return false;
            }
            const pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
            if(!pattern.test(value)) {
                setErrorState({...errorState, [key]: VALIDATION_ERROR.FIELD_INVALID});
                return false;
            }
            setErrorState({...errorState, [key]: ''})
            return true;
        }

        if(key === "fname") {
            if(!value || value.trim() === "") {
                setErrorState({...errorState, [key]: VALIDATION_ERROR.FIELD_LEFT_BLANK});
                return false;
            }
            const pattern = new RegExp('^[a-zA-Z ]{2,40}$');
            if(!pattern.test(value)) {
                setErrorState({...errorState, [key]: VALIDATION_ERROR.FIELD_INVALID});
                return false;
            }
            setErrorState({...errorState, [key]: ''})
            return true;
        }

        if(key === "mobNum") {
            if(!value || value.trim() === "") {
                setErrorState({...errorState, [key]: VALIDATION_ERROR.FIELD_LEFT_BLANK});
                return false;
            }
            const pattern = new RegExp("^[6-9][0-9]{9}$");
            if(value.length !== 10 || !pattern.test(value)) {
                setErrorState({...errorState, [key]: VALIDATION_ERROR.FIELD_INVALID});
                return false;
            }
            setErrorState({...errorState, [key]: ''})
            return true;
        }

        if(key === "message") {
            if(!value || value.trim() === "") {
                setErrorState({...errorState, [key]: VALIDATION_ERROR.FIELD_LEFT_BLANK});
                return false;
            }
            const pattern = new RegExp('^[a-zA-Z.! ]{2,200}$');
            if(!pattern.test(value)) {
                setErrorState({...errorState, [key]: VALIDATION_ERROR.FIELD_INVALID});
                return false;
            }
            setErrorState({...errorState, [key]: ''})
            return true;
        }
    };

    const checkFormValidity = (errorState) => {
       let isValid = true;
       const errorKeys = Object.keys(errorState);
       for (let index = 0; index < errorKeys.length && isValid; index++) {
        const element = errorState[errorKeys[index]];
        if(element) {
            isValid = false;
        }
       }
       return isValid;
    }

    return (
        <>
            <NavigationBar />
            <div className={classes.pageWrapper}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab className={classes.fontPrimary} label="Contact Us" {...a11yProps(0)} />
                        <Tab className={classes.fontPrimary} label="Join Us" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <ContactUsSection onBlur={onBlur} checkFormValidity={checkFormValidity} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <JoinUsSection onBlur={onBlur} checkFormValidity={checkFormValidity} />
                </TabPanel>
            </div>
            <Footer />
        </>
    );
};

export default withStyles(styles)(ContactUsPage);;