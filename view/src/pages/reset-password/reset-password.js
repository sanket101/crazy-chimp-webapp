import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../login/login.style';
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockResetIcon from '@mui/icons-material/LockReset';
import VALIDATION_ERROR from '../../constants/validation-errors';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Footer from '../../components/Footer/footer';
import apiConfig from '../../api/api-config';
import { handleApiError } from '../../utils/error-handling';
import { useHistory } from "react-router-dom";

const ResetPassword = (props) => {
	const { classes } = props;
    const [localState, setLocalState] = useState({
        email: '',
        errors: {
			email: '',
			general: ''
		},
        loading: false,
		emailSent: false
    });

	const history = useHistory();

    const handleChange = (event) => {
		setLocalState(prevState => {
			return {...prevState, [event.target.name]: event.target.value};
		});
	};

    const onEmailFieldBlur = (value) => {

		let exactError = { email: '' };
		const pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
		let newErrors = {};

		if(!value || value.trim() === "") {
			exactError.email = VALIDATION_ERROR.FIELD_LEFT_BLANK;
			newErrors = {...localState.errors, ...exactError};
			setLocalState(prevState => {return {...prevState, errors: newErrors }});
		}
		else if(!pattern.test(value)) {
			exactError.email = VALIDATION_ERROR.FIELD_INVALID;
			newErrors = {...localState.errors, ...exactError};
			setLocalState(prevState => {return {...prevState, errors: newErrors }});
		}
		else {
			newErrors = {...localState.errors, ...exactError};
			setLocalState(prevState => {return {...prevState, errors: newErrors }});
		}
	};

    const handleSubmit = (event) => {
		event.preventDefault();
		setLocalState(prevState => {return {...prevState, loading: true }});
		const userData = {
			email: localState.email
		};
		axios
			.post(apiConfig.resetPasswordApi, userData)
			.then(() => {
				setLocalState(prevState => {return {...prevState, loading: false, emailSent: true }});
			})
			.catch((error) => {
				const exactError = error.response.data;
				const newErrors = {...localState.errors, ...exactError};
                setLocalState(prevState => {return {...prevState, errors: newErrors, loading: false }});
				handleApiError(history, error);			
			});
	};

    return(
		<>
			<NavigationBar />
        	<Container component="main" maxWidth="xs" className={classes.loginWrapper}>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockResetIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Reset Password
					</Typography>
					{!localState.emailSent
						?
						<form className={classes.form} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								helperText={localState.errors.email}
								error={localState.errors.email ? true : false}
								onChange={handleChange}
								onBlur={(event) => onEmailFieldBlur(event.target.value)}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={handleSubmit}
								disabled={localState.loading || (!localState.email || localState.errors.email)}
							>
								Send Reset Password Email
								{localState.loading && <CircularProgress size={30} className={classes.progess} />}
							</Button>
							{/* {localState.errors.general && (
								<Typography variant="body2" className={classes.customError}>
									{localState.errors.general}
								</Typography>
							)} */}
						</form>
						:
						<Typography component="h6" variant="h6" className={classes.textAlignCenter}>
							Password reset email will be sent to the registered email id. Please check the spam section in case you are not able to find the mail.
						</Typography>
					}
				</div>
			</Container>
			
			<Footer />
		</>
    );
};

export default (withStyles(styles)(ResetPassword))