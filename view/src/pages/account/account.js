import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import withStyles from '@material-ui/core/styles/withStyles';
import Footer from '../../components/Footer/footer';
import { Typography, Box, CircularProgress, Tabs, Tab, Modal } from '@material-ui/core';
import styles from './account.style';
import { authMiddleWare } from '../../utils/auth';
import { setUserDetails, setUserInvoices } from '../../redux/User/user.actions';
import { handleApiError } from '../../utils/error-handling';
import InvoiceDisplayCard from '../../components/InvoiceDisplayCard/invoice-display-card';
import axios from 'axios';
import apiConfig from '../../api/api-config';
import AccountDetails from '../../components/AccountDetails/account-details';
import { setFreeProductInfo } from '../../redux/General/general.actions';
import FreeProductDiscountSection from '../../components/FreeProductDiscountSection/free-product-discount-section';

const Account = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [value, setValue] = useState(0);
    const { classes } = props;
    let history = useHistory();

    const showUserInvoices = async() => {
        try {
            authMiddleWare(history);
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            const response = await axios.get(apiConfig.getUserInvoices);
            if(response && response.data && response.data.length > 0) {
                const tempArray = [...response.data];
                const sortedArray = tempArray.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                props.setUserInvoices(sortedArray);
            }
            setLoading(false);
        }
        catch(err) {
            setLoading(false);
            handleApiError(history, err);
        }
    };

    const renderInvoices = () => {
        if(props.userInvoices.length === 0) {
            return (
                <div>
                    <Typography variant='h6' className={classes.primaryFont}>You don't have any recent orders!</Typography>
                </div>
            );
        }

        return (
            <div>
                {props.userInvoices?.map((userInvoice, index) => {
                    return (
                        <InvoiceDisplayCard key={index} index={index} invoice={userInvoice} updateUserInvoices={updateUserInvoices} />
                    )
                })}
            </div>
        );
    };

    const updateUserInvoices = (index, updatedInvoice) => {
        const newInvoices = [...props.userInvoices];
        newInvoices[index] = updatedInvoice;
        props.setUserInvoices(newInvoices);
    }

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                className={classes.tabpanel}
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
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        showUserInvoices();
    }, []);

    return (
        <>
            <NavigationBar />
            <div className={classes.accountWrapper}>
                {isLoading ?
                    <Box sx={{textAlign: 'center'}}>
                        <CircularProgress />
                    </Box>
                    :
                    <>
                        <FreeProductDiscountSection freeProductInfo={props.freeProductInfo} setFreeProductInfo={props.setFreeProductInfo} />
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab className={classes.fontPrimary} label="Orders" {...a11yProps(0)} />
                                <Tab className={classes.fontPrimary} label="Account Details" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                          {renderInvoices()}
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <AccountDetails history={history} userDetails={props.userDetails} setUserDetails={props.setUserDetails} />
                        </TabPanel>
                    </>
                }
            </div>
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => {
	const reduxState = state.userDetails.toJS();
    const reduxStateGeneral = state.generalDetails.toJS();
	return {
		userInvoices: reduxState.userInvoices,
        userDetails: reduxState.userDetails,
        freeProductInfo: reduxStateGeneral.freeProductInfo
	};
};
  
const mapDispatchToProps = dispatch => {
	return {
        setUserInvoices: (invoices) => dispatch(setUserInvoices(invoices)),
        setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
        setFreeProductInfo: (data) => dispatch(setFreeProductInfo(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account));