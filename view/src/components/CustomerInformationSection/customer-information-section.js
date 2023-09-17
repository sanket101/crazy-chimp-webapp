import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, TextField, InputLabel, Select, MenuItem, Card, CardContent, CardActions, Button, CircularProgress, Backdrop, RadioGroup, FormControlLabel, Radio, IconButton, FormControl } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import styles from './customer-information-section.style';
import VALIDATION_ERROR from '../../constants/validation-errors';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomerInformationSection = (props) => {
    const { classes, customerInformation } = props;
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
        if (fieldName === "emailId") {
            if (!value || value.trim() === "") {
                setErrorState({ ...errorState, [fieldName]: VALIDATION_ERROR.FIELD_LEFT_BLANK });
                return false;
            }
            const pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
            if (!pattern.test(value)) {
                setErrorState({ ...errorState, [fieldName]: VALIDATION_ERROR.FIELD_INVALID });
                return false;
            }
            setErrorState({ ...errorState, [fieldName]: '' })
            return true;
        }
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

        if (fieldName === "firstName" || fieldName === "secondName" || fieldName === "city") {
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

        if (fieldName === "addressLine1" || fieldName === "addressLine2" || fieldName === "country" || fieldName === "state") {
            if (!value || value.trim() === "") {
                setErrorState({ ...errorState, [fieldName]: VALIDATION_ERROR.FIELD_LEFT_BLANK });
                return false;
            }

            setErrorState({ ...errorState, [fieldName]: '' })
            return true;
        }

        if (fieldName === "postalCode") {
            if (!value || value.trim() === "") {
                setErrorState({ ...errorState, [fieldName]: VALIDATION_ERROR.FIELD_LEFT_BLANK });
                return false;
            }
            const pattern = new RegExp('^[1-9][0-9]{5}$');
            if (value.length !== 6 || !pattern.test(value)) {
                setErrorState({ ...errorState, [fieldName]: VALIDATION_ERROR.FIELD_INVALID });
                return false;
            }
            setErrorState({ ...errorState, [fieldName]: '' })
            return true;

        }
    };

    const onBlur = (fieldName, value) => {
        const isValid = checkFieldValidation(fieldName, value);
        if (isValid) {
            props.setCustomerInformation({ ...customerInformation, [fieldName]: value });
        }
        else {
            props.setCustomerInformation({ ...customerInformation, [fieldName]: '' });
        }
    };

    const confirmAddress = () => {
        // props.setAddNewButtonTriggered(false);
        props.addNewCustomerAddress();
    };

    const getCardRadioButton = (address, index) => {
        return (
            <Card className={classes.addressCardWrapper}>
                <CardContent>
                    <div className='card-action-section'>
                        <div>
                            <Typography variant='subtitle2' color="text.secondary" gutterBottom>
                                {`${address.name}`}
                            </Typography>
                            <Typography variant='subtitle2' color="text.secondary" gutterBottom>
                                {`${address.address}, ${address.city}, ${address.state} - ${address.pincode}`}
                            </Typography>
                            <Typography variant='subtitle2' color="text.secondary" gutterBottom>
                                {`Contact : ${address.phone}`}
                            </Typography>
                        </div>
                        <div>
                            <IconButton onClick={() => deleteAddressItem(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    };

    const deleteAddressItem = (index) => {
        const toBeDeletedAddress = props.userAddresses[index];
        const newAddressList = props.userAddresses.filter(item => item.addressId !== toBeDeletedAddress.addressId);
        props.setUserAddresses(newAddressList);
        props.deleteAddress(toBeDeletedAddress.addressId)
    };

    return (
        <>
            <div className={classes.customerInformationSectionWrapper}>
                {props.userAddresses.length > 0 &&
                    <>
                        <div className={classes.addressWrapper}>
                            {/* {props.userAddresses.map((address, index) => {
                                return (
                                    <Card key={index} className={classes.addressCardWrapper}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                {`${address.name}`}
                                            </Typography>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                {`${address.address}, ${address.city}, ${address.state} - ${address.pincode}`}
                                            </Typography>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                {`Number : ${address.phone}`}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            {props.selectedAddressIndex === index ? 
                                                <Button size="small" startIcon={<CheckBox />}>Selected</Button>
                                                :
                                                <Button size="small" onClick={() => props.selectExistingAddress(index)}>Select</Button>
                                            }
                                        </CardActions>
                                    </Card>
                                );
                            })} */}
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    value={props.selectedAddressIndex.toString()}
                                    onChange={(evt) => props.selectExistingAddress(evt.target.value)}
                                >
                                    {props.userAddresses.map((address, index) => {
                                        return (
                                            <FormControlLabel value={index.toString()} control={<Radio />} label={getCardRadioButton(address, index)} />
                                        );
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className={classes.addNewButtonWrapper}>
                            <Button variant='outlined' onClick={() => props.setAddNewButtonTriggered(true)}>Add New Address</Button>
                        </div>
                    </>
                }
                {(props.userAddresses.length === 0 || props.addNewButtonTriggered) &&
                    <>
                        <Typography variant="body1" className={classes.subHeading}>CUSTOMER INFORMATION</Typography>
                        <div>
                            <TextField
                                id="outlined-email-input"
                                label="Email Address"
                                type="email"
                                variant="filled"
                                className={classes.textFieldCss}
                                value={emailId}
                                onChange={(event) => setEmailId(event.target.value)}
                                onBlur={(event) => onBlur('emailId', event.target.value)}
                                error={errorState.emailId ? true : false}
                                helperText={errorState.emailId}
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

                        <Typography variant="body1" className={classes.subHeading}>SHIPPING ADDRESS</Typography>

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
                                value={secondName}
                                onChange={(event) => setSecondName(event.target.value)}
                                onBlur={(event) => onBlur('secondName', event.target.value)}
                                error={errorState.secondName ? true : false}
                                helperText={errorState.secondName}
                                autoComplete="new-password"
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
                                variant="filled"
                                className={classes.textFieldCss}
                                value={addressLine1}
                                onChange={(event) => setAddressLine1(event.target.value)}
                                onBlur={(event) => onBlur('addressLine1', event.target.value)}
                                error={errorState.addressLine1 ? true : false}
                                helperText={errorState.addressLine1}
                                autoComplete="new-password"
                            />

                            <TextField
                                id="outlined-street-input"
                                label="Street Address"
                                type="text"
                                variant="filled"
                                className={classes.textFieldCss}
                                value={addressLine2}
                                onChange={(event) => setAddressLine2(event.target.value)}
                                onBlur={(event) => onBlur('addressLine2', event.target.value)}
                                error={errorState.addressLine2 ? true : false}
                                helperText={errorState.addressLine2}
                                autoComplete="new-password"
                            />

                        </div>

                        <div>
                            <TextField
                                id="outlined-city-input"
                                label="City"
                                type="text"
                                variant="filled"
                                className={classes.textFieldCss}
                                value={city}
                                onChange={(event) => setCity(event.target.value)}
                                onBlur={(event) => onBlur('city', event.target.value)}
                                error={errorState.city ? true : false}
                                helperText={errorState.city}
                                autoComplete="new-password"
                            />

                            <TextField
                                id="outlined-postal-input"
                                label="Postal / Zip"
                                type="text"
                                variant="filled"
                                className={classes.textFieldCss}
                                value={postalCode}
                                onChange={(event) => setPostalCode(event.target.value)}
                                onBlur={(event) => onBlur('postalCode', event.target.value)}
                                error={errorState.postalCode ? true : false}
                                helperText={errorState.postalCode}
                                autoComplete="new-password"
                            />

                        </div>

                        {props.showAddressDisclaimer ? <Typography variant="subtitle1" className={classes.subHeading}>*Please enter all the above mentioned fields to add new address entry.</Typography> : <></>}
                        <div className={classes.addressButtonContainer}>
                            <Button variant='outlined' onClick={() => props.setAddNewButtonTriggered(false)}>CANCEL</Button>
                            <Button variant='outlined' onClick={() => confirmAddress()}>CONFIRM ADDRESS</Button>
                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default withStyles(styles)(CustomerInformationSection);