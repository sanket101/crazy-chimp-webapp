import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Snackbar, TextField, Typography, withStyles } from "@material-ui/core";
import { authMiddleWare } from "../../utils/auth";
import axios from "axios";
import apiConfig from "../../api/api-config";
import { handleApiError } from "../../utils/error-handling";
import VALIDATION_ERROR from '../../constants/validation-errors';
import styles from './account-details.style';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AccountDetails = (props) => {
    const { history, setUserDetails, userDetails, classes } = props;
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState(userDetails?.firstName || '');
    const [lastName, setLastName] = useState(userDetails?.lastName || '');
    const [emailId, setEmailId] = useState(userDetails?.email || '');
    const [phoneNumber, setPhoneNumber] = useState(userDetails?.phoneNumber || '');
    const [loyaltyPoints, setLoyaltyPoints] = useState(userDetails?.loyaltyPoints || 0);
    const [errorState, setErrorState] = useState({
        phoneNumber: '',
        firstName: '',
        lastName: '',
    });
    const [userDetailsUpdated, setDetailsUpdated] = useState(false);
    const [updateApiLoad, setUpdateApiLoad] = useState(false);

    const callUserDetailsApi = async () => {
        try {
            authMiddleWare(history);
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };

            const responseUserDetails = await axios.get(apiConfig.getUserDetails);

            if (responseUserDetails && responseUserDetails.data && responseUserDetails.data.userCredentials) {
                setUserDetails(responseUserDetails.data.userCredentials);
            }
            setLoading(false);
        }
        catch (err) {
            console.log(err);
            if (err.request.status === 403) {
                props.setLoginError(VALIDATION_ERROR.LOGIN_BEFORE_CONTINUE);
            }
            setLoading(false);
            //redirect to error page
            handleApiError(history, err);
        }
    };

    const checkFieldValidation = (fieldName, value) => {
        if (fieldName === "phoneNumber") {
            if (!value || value.trim() === "") {
                setErrorState({ ...errorState, [fieldName]: VALIDATION_ERROR.FIELD_LEFT_BLANK });
                return false;
            }
            const pattern = new RegExp("^[6-9][0-9]{9}$");
            if (value.length !== 10 || !pattern.test(value)) {
                setErrorState({ ...errorState, [fieldName]: VALIDATION_ERROR.FIELD_INVALID });
                return false;
            }
            setErrorState({ ...errorState, [fieldName]: '' })
            return true;
        }

        if (fieldName === "firstName" || fieldName === "lastName") {
            if (!value || value.trim() === "") {
                setErrorState({ ...errorState, [fieldName]: VALIDATION_ERROR.FIELD_LEFT_BLANK });
                return false;
            }
            const pattern = new RegExp('^[a-zA-Z ]{2,30}$');
            if (!pattern.test(value)) {
                setErrorState({ ...errorState, [fieldName]: VALIDATION_ERROR.FIELD_INVALID });
                return false;
            }
            setErrorState({ ...errorState, [fieldName]: '' })
            return true;
        }
    };

    const onBlur = (fieldName, value) => {
        checkFieldValidation(fieldName, value);
    };

    const updateDetails = async () => {
        setUpdateApiLoad(true);
        const isFormValid = !errorState.firstName && !errorState.lastName && !errorState.phoneNumber;
        if(isFormValid && (userDetails.firstName !== firstName || userDetails.lastName !== lastName || userDetails.phoneNumber !== phoneNumber)) {
            try {
                const response = await axios.post(apiConfig.updateUserDetails, { firstName, lastName, phoneNumber });
                if(response && response.data && response.data.message) {
                    setDetailsUpdated(true);
                    setUpdateApiLoad(false);
                }
            }
            catch(err) {
                console.log(err);
                if (err.request.status === 403) {
                    props.setLoginError(VALIDATION_ERROR.LOGIN_BEFORE_CONTINUE);
                }
                setUpdateApiLoad(false);
                handleApiError(history, err);
            }
        }
        else {
            setUpdateApiLoad(false);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setDetailsUpdated(false);
    };

    useEffect(() => {
        if(Object.keys(userDetails).length === 0) {
            callUserDetailsApi();
        }
        else {
            setLoading(false); 
        }
    }, []);

    if (loading) {
        return <Box sx={{ textAlign: 'center' }}>
            <CircularProgress />
        </Box>;
    }

    return (
        <>
        <div className={classes.accountDetailsWrapper}>
            <div>
                <Typography variant="body1">* Please note you cannot edit your email id and loyalty points!</Typography>
            </div>

            <br />

            <div>
                <TextField
                    id="outlined-first-name-input"
                    label="First Name"
                    type="text"
                    variant="filled"
                    className={classes.textFieldCss}
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    onBlur={(event) => onBlur('firstName', event.target.value)}
                    error={errorState.firstName ? true : false}
                    helperText={errorState.firstName}
                    autoComplete="new-password"
                />

                <TextField
                    id="outlined-last-name-input"
                    label="Last Name"
                    type="text"
                    variant="filled"
                    className={classes.textFieldCss}
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    onBlur={(event) => onBlur('lastName', event.target.value)}
                    error={errorState.lastName ? true : false}
                    helperText={errorState.lastName}
                    autoComplete="new-password"
                />
            </div>

            <div>
                <TextField
                    id="outlined-email-input"
                    label="Email Address"
                    type="email"
                    variant="filled"
                    className={classes.textFieldCss}
                    value={emailId}
                    disabled={true}
                    autoComplete="new-password"
                />

                <TextField
                    id="outlined-phone-input"
                    label="Phone Number"
                    type="text"
                    variant="filled"
                    className={classes.textFieldCss}
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    onBlur={(event) => onBlur('phoneNumber', event.target.value)}
                    error={errorState.phoneNumber ? true : false}
                    helperText={errorState.phoneNumber}
                    autoComplete="new-password"
                />
            </div>

            <div>
                <TextField
                    id="outlined-phone-input"
                    label="Loyalty Points"
                    type="number"
                    variant="filled"
                    className={classes.textFieldCss}
                    value={loyaltyPoints}
                    autoComplete="new-password"
                    disabled={true}
                />
            </div>
            
            <br />
            
            <div className={classes.buttonWrapper}>
                {!updateApiLoad ? <Button variant='contained' className={classes.shopNowButton} onClick={() => updateDetails()}>UPDATE DETAILS</Button> : <CircularProgress />} 
            </div>
        </div>
        {userDetailsUpdated && <Snackbar open={userDetailsUpdated} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Details updated!
            </Alert>
        </Snackbar>}
    </>
    );
};

export default withStyles(styles)(AccountDetails);