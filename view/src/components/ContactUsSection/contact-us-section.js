import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Button, TextField, Snackbar, CircularProgress, IconButton } from '@material-ui/core';
import styles from './contact-us-section.style';
import apiConfig from '../../api/api-config';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import { handleApiError } from '../../utils/error-handling';
import { useHistory } from 'react-router-dom';
import { Instagram as InstagramIcon, Facebook as FacebookIcon} from '@material-ui/icons';
import LINKS from '../../constants/imp-links';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ContactUsSection = (props) => {
    const { classes } = props;
    const [fname, setFname] = useState('');
    const [email, setEmail] = useState('');
    const [mobNum, setMobnum] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [contactAdded, setContactAdded] = useState(false);
    const [errorState, setErrorState] = useState({
        fname: '',
        email: '',
        mobNum: '',
        message: ''
    });
    const [cannotSubmit, setCannotSubmit] = useState(false);

    let history = useHistory();

    const onSubmitHandler = async () => {
        const isValid = fname && email && mobNum && message && props.checkFormValidity(errorState);
        if (isValid) {
            setLoading(true);
            const requestPayload = {
                type: 'CONTACT',
                fullName: fname,
                email,
                phoneNumber: mobNum,
                message
            };
            try {
                const response = await axios.post(apiConfig.addContactList, requestPayload);
                if (response && response.data && response.data.id) {
                    setLoading(false);
                    setContactAdded(true);
                    setFname('');
                    setEmail('');
                    setMobnum('');
                    setMessage('');
                }
            }
            catch (err) {
                handleApiError(history, err);
            }
        }
        else {
            setCannotSubmit(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setContactAdded(false);
    };

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setCannotSubmit(false);
    }

    return (
        <div className={classes.contactUsSectionWrapper}>
            <div>
                <div className={classes.contactUsDescription}>
                    <Typography variant="body1" className={classes.contactUsEmail}>Feel free to reach out to us at <a className={classes.emailLink} href='mailto:crazychimpofficial@gmail.com'>crazychimpofficial@gmail.com</a> for any business query, order status or just to say Hi :)</Typography>
                    <Typography variant="body1">We are quite active on our social media platforms as well. You can DM us for any queries!</Typography>

                    <Typography variant="body1">Office Address : 24, Vasant Nagar, Near Diksha Bhoomi, Nagpur, Maharashtra, 440022</Typography>
                    <div>
                        <IconButton className={classes.socialMediaBtn} href={LINKS.CRAZY_CHIMP_INSTAGRAM} target="_blank">
                            <InstagramIcon />
                        </IconButton>
                        <IconButton className={classes.socialMediaBtn} href={LINKS.CRAZY_CHIMP_FACEBOOK} target="_blank">
                            <FacebookIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div>
            <Typography variant="h4">Get in touch</Typography>
            <div>
                <Typography variant="h6">Enter Details</Typography>
                <div>
                    <TextField
                        id="outlined-first-name-input"
                        label="Full Name"
                        type="text"
                        variant="filled"
                        className={classes.textFieldCss}
                        value={fname}
                        onChange={(event) => setFname(event.target.value)}
                        onBlur={(event) => props.onBlur('fname', event.target.value, errorState, setErrorState)}
                        error={errorState.fname ? true : false}
                        helperText={errorState.fname}
                        autoComplete="new-password"
                    />

                    <TextField
                        id="outlined-first-name-input"
                        label="Email"
                        type="email"
                        variant="filled"
                        className={classes.textFieldCss}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        onBlur={(event) => props.onBlur('email', event.target.value, errorState, setErrorState)}
                        error={errorState.email ? true : false}
                        helperText={errorState.email}
                        autoComplete="new-password"
                    />
                </div>

                <TextField
                    id="outlined-first-name-input"
                    label="Mobile Number"
                    type="number"
                    variant="filled"
                    className={classes.textFieldCssWithFullWidth}
                    value={mobNum}
                    onChange={(event) => setMobnum(event.target.value)}
                    onBlur={(event) => props.onBlur('mobNum', event.target.value, errorState, setErrorState)}
                    error={errorState.mobNum ? true : false}
                    helperText={errorState.mobNum}
                    autoComplete="new-password"
                />
                <br />
                <TextField
                    id="outlined-first-name-input"
                    label="Message"
                    type="text"
                    variant="filled"
                    className={classes.textAreaCss}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onBlur={(event) => props.onBlur('message', event.target.value, errorState, setErrorState)}
                    error={errorState.message ? true : false}
                    helperText={errorState.message}
                    autoComplete="new-password"
                />
                <br />
                <Button variant="contained" className={classes.submitBtn} onClick={onSubmitHandler}>
                    Submit
                    {loading && <CircularProgress size={30} className={classes.progess} />}
                </Button>
            </div>
            {contactAdded && <Snackbar open={contactAdded} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    We have received your message. We will revert back shortly!
                </Alert>
            </Snackbar>}
            {cannotSubmit && <Snackbar open={cannotSubmit} autoHideDuration={4000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                    Please fill the form before submitting!
                </Alert>
            </Snackbar>}
            </div>
        </div>
    );
};

export default withStyles(styles)(ContactUsSection);