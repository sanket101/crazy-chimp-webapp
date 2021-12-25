import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, TextField, InputLabel, Select, MenuItem } from '@material-ui/core';
import styles from './customer-information-section.style';
import VALIDATION_ERROR from '../../constants/validation-errors';

const CustomerInformationSection = (props) => {
    const { classes, customerInformation } = props;
    console.log('CUST', customerInformation);
    const [emailId, setEmailId] = useState(customerInformation.emailId);
    const [phoneNumber, setPhoneNumber] = useState(customerInformation.phoneNumber);
    const [firstName, setFirstName] = useState(customerInformation.firstName);
    const [secondName, setSecondName] = useState(customerInformation.secondName);
    const [country, setCountry] = useState(customerInformation.country);
    const [state, setState] = useState(customerInformation.state);
    const [addressLine1, setAddressLine1] = useState(customerInformation.addressLine1);
    const [addressLine2, setAddressLine2] = useState(customerInformation.addressLine2);
    const [city, setCity] = useState(customerInformation.city);
    const [postalCode, setPostalCode] = useState(customerInformation.postalCode);

    const countryDropdown = ['India'];
    const stateDropdown = {
        India: [
            'Andhra Pradesh',
            'Arunachal Pradesh',
            'Assam',
            'Bihar',
            'Chhattisgarh',
            'Goa',
            'Gujarat',
            'Haryana',
            'Himachal Pradesh',
            'Jharkhand',
            'Karnataka',
            'Kerala',
            'Madhya Pradesh',
            'Maharashtra',
            'Manipur',
            'Meghalaya',
            'Mizoram',
            'Nagaland',
            'Odisha',
            'Punjab',
            'Rajasthan',
            'Sikkim',
            'Tamil Nadu',
            'Telangana',
            'Tripura',
            'Uttar Pradesh',
            'Uttarakhand',
            'West Bengal',
            'Andaman and Nicobar',
            'Chandigarh',
            'Delhi',
            'Jammu and Kashmir',
            'Lakshadweep',
            'Ladakh',
            'Puducherry'
        ]
    };

    const [errorState, setErrorState] = useState({
        emailId: '',
        phoneNumber: '',
        firstName: '',
        secondName: '',
        country: '',
        state: '',
        city: '',
        addressLine1: '',
        addressLine2: '',
        postalCode: ''
    });

    const checkFieldValidation = (fieldName, value) => {
        if(fieldName === "emailId") {
            if(!value || value.trim() === "") {
                setErrorState({...errorState, [fieldName]: VALIDATION_ERROR.FIELD_LEFT_BLANK});
                return false;
            }
            const pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
            if(!pattern.test(value)) {
                setErrorState({...errorState, [fieldName]: VALIDATION_ERROR.FIELD_INVALID});
                return false;
            }
            setErrorState({...errorState, [fieldName]: ''})
            return true;
        }
        if(fieldName === "phoneNumber") {
            if(!value || value.trim() === "") {
                setErrorState({...errorState, [fieldName]: VALIDATION_ERROR.FIELD_LEFT_BLANK});
                return false;
            }
            const pattern = new RegExp("^[6-9][0-9]{9}$");
            if(value.length !== 10 || !pattern.test(value)) {
                setErrorState({...errorState, [fieldName]: VALIDATION_ERROR.FIELD_INVALID});
                return false;
            }
            setErrorState({...errorState, [fieldName]: ''})
            return true;
        }
        
        if(fieldName === "firstName" || fieldName === "secondName" || fieldName === "city") {
            if(!value || value.trim() === "") {
                setErrorState({...errorState, [fieldName]: VALIDATION_ERROR.FIELD_LEFT_BLANK});
                return false;
            }
            const pattern = new RegExp('^[a-zA-Z ]{2,30}$');
            if(!pattern.test(value)) {
                setErrorState({...errorState, [fieldName]: VALIDATION_ERROR.FIELD_INVALID});
                return false;
            }
            setErrorState({...errorState, [fieldName]: ''})
            return true;
        }

        if(fieldName === "addressLine1" || fieldName === "addressLine2" || fieldName === "country" || fieldName === "state") {
            if(!value || value.trim() === "") {
                setErrorState({...errorState, [fieldName]: VALIDATION_ERROR.FIELD_LEFT_BLANK});
                return false;
            }

            setErrorState({...errorState, [fieldName]: ''})
            return true;
        }

        if(fieldName === "postalCode") {
            if(!value || value.trim() === "") {
                setErrorState({...errorState, [fieldName]: VALIDATION_ERROR.FIELD_LEFT_BLANK});
                return false;
            }
            const pattern = new RegExp('^[1-9][0-9]{5}$');
            if(value.length !== 6 || !pattern.test(value)) {
                setErrorState({...errorState, [fieldName]: VALIDATION_ERROR.FIELD_INVALID});
                return false;
            }
            setErrorState({...errorState, [fieldName]: ''})
            return true;

        }
    };

    const onBlur = (fieldName, value) => {
        const isValid = checkFieldValidation(fieldName, value);
        if(isValid) {
            props.setCustomerInformation({...customerInformation, [fieldName]: value});
        }
        else {
            props.setCustomerInformation({...customerInformation, [fieldName]: ''});
        }
    };

    return (
        <div className={classes.customerInformationSectionWrapper}>
            <Typography variant="h5" className={classes.subHeading}>CUSTOMER INFORMATION</Typography>
            <div>
                <TextField
                    id="outlined-email-input"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    className={classes.textFieldCss}
                    value={emailId}
                    onChange={(event) => setEmailId(event.target.value)}
                    onBlur={(event) => onBlur('emailId', event.target.value)}
                    error={errorState.emailId ? true : false}
                    helperText={errorState.emailId}
                />

                <TextField
                    id="outlined-phone-input"
                    label="Phone Number"
                    type="text"
                    variant="outlined"
                    className={classes.textFieldCss}
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    onBlur={(event) => onBlur('phoneNumber', event.target.value)}
                    error={errorState.phoneNumber ? true : false}
                    helperText={errorState.phoneNumber}
                />
            </div>

            <Typography variant="h5" className={classes.subHeading}>SHIPPING ADDRESS</Typography>

            <div>
                <TextField
                    id="outlined-first-name-input"
                    label="First Name"
                    type="text"
                    variant="outlined"
                    className={classes.textFieldCss}
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    onBlur={(event) => onBlur('firstName', event.target.value)}
                    error={errorState.firstName ? true : false}
                    helperText={errorState.firstName}
                />

                <TextField
                    id="outlined-last-name-input"
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    className={classes.textFieldCss}
                    value={secondName}
                    onChange={(event) => setSecondName(event.target.value)}
                    onBlur={(event) => onBlur('secondName', event.target.value)}
                    error={errorState.secondName ? true : false}
                    helperText={errorState.secondName}
                />
            </div>

            <div className={classes.dropdownWidgetWrapper}>

                <div className={classes.dropdownWidget}>
                    <InputLabel id="demo-simple-select-label" className={classes.inputLabel}>Country</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={country}
                        label="Country"
                        className={classes.selectLabel}
                        onChange={(event) => { 
                            setCountry(event.target.value)
                            onBlur('country', event.target.value);
                        }}
                    >
                        {countryDropdown.map((country, i) => {
                            return (<MenuItem value={country}>{country}</MenuItem>)
                        })}
                    </Select>
                </div>

                <div className={classes.dropdownWidget}>
                    <InputLabel id="demo-simple-select-label" className={classes.inputLabel}>State</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state}
                        label="State"
                        className={classes.selectLabel}
                        onChange={(event) => { 
                            setState(event.target.value);
                            onBlur('state', event.target.value);
                        }}
                    >
                        {country && stateDropdown[country].map((states, i) => {
                            return (<MenuItem value={states}>{states}</MenuItem>)
                        })}
                    </Select>
                </div>
            </div>

            <div>
                <TextField
                    id="outlined-apt-input"
                    label="Apt, Unit, Suite, etc"
                    type="text"
                    variant="outlined"
                    className={classes.textFieldCss}
                    value={addressLine1}
                    onChange={(event) => setAddressLine1(event.target.value)}
                    onBlur={(event) => onBlur('addressLine1', event.target.value)}
                    error={errorState.addressLine1 ? true : false}
                    helperText={errorState.addressLine1}
                />

                <TextField
                    id="outlined-street-input"
                    label="Street Address"
                    type="text"
                    variant="outlined"
                    className={classes.textFieldCss}
                    value={addressLine2}
                    onChange={(event) => setAddressLine2(event.target.value)}
                    onBlur={(event) => onBlur('addressLine2', event.target.value)}
                    error={errorState.addressLine2 ? true : false}
                    helperText={errorState.addressLine2}
                />

            </div>

            <div>
                <TextField
                    id="outlined-city-input"
                    label="City"
                    type="text"
                    variant="outlined"
                    className={classes.textFieldCss}
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    onBlur={(event) => onBlur('city', event.target.value)}
                    error={errorState.city ? true : false}
                    helperText={errorState.city}
                />

                <TextField
                    id="outlined-postal-input"
                    label="Postal / Zip"
                    type="text"
                    variant="outlined"
                    className={classes.textFieldCss}
                    value={postalCode}
                    onChange={(event) => setPostalCode(event.target.value)}
                    onBlur={(event) => onBlur('postalCode', event.target.value)}
                    error={errorState.postalCode ? true : false}
                    helperText={errorState.postalCode}
                />

            </div>
                
        </div>
    );
};

export default withStyles(styles)(CustomerInformationSection);