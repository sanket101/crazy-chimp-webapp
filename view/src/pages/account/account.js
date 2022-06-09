import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import withStyles from '@material-ui/core/styles/withStyles';
import Footer from '../../components/Footer/footer';
import { Typography, Box, CircularProgress } from '@material-ui/core';
import styles from './account.style';
import { authMiddleWare } from '../../utils/auth';
import { setUserInvoices } from '../../redux/User/user.actions';
import { handleApiError } from '../../utils/error-handling';
import InvoiceDisplayCard from '../../components/InvoiceDisplayCard/invoice-display-card';
import axios from 'axios';
import apiConfig from '../../api/api-config';

const Account = (props) => {
    const [isLoading, setLoading] = useState(true);
    const { classes } = props;
    let history = useHistory();

    const showUserInvoices = async() => {
        try {
            authMiddleWare(history);
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            const response = await axios.get(apiConfig.getUserInvoices);
            if(response && response.data && response.data.length > 0) {
                props.setUserInvoices(response.data);
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
                <Typography variant='h3' className={classes.primaryFont}>Your Recent Orders</Typography>
                {props.userInvoices.map((userInvoice, index) => {
                    return (
                        <InvoiceDisplayCard key={index} invoice={userInvoice} />
                    )
                })}
            </div>
        );
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
                    renderInvoices()
                }
            </div>
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => {
	const reduxState = state.userDetails.toJS();
	return {
		userInvoices: reduxState.userInvoices
	};
};
  
const mapDispatchToProps = dispatch => {
	return {
        setUserInvoices: (invoices) => dispatch(setUserInvoices(invoices))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account));