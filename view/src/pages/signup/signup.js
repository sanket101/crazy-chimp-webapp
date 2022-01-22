import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './signup.style';
import axios from 'axios';
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import Footer from '../../components/Footer/footer';
import apiConfig from '../../api/api-config';
import VALIDATION_ERROR from '../../constants/validation-errors';

const Signup = (props) => {
	const { classes } = props;
    const [localState, setLocalState] = useState({
		firstName: '',
		lastName: '',
		phoneNumber: '',
		country: '',
		email: '',
		password: '',
		confirmPassword: '',
		errors: {
			firstName: '',
			lastName: '',
			phoneNumber: '',
			country: '',
			email: '',
			password: '',
			confirmPassword: '',
			general: ''
		},
		loading: false
	});
	const [isFormValid, setFormValid] = useState(false);

	const handleChange = (event) => {
		setLocalState(prevState => {
			return {...prevState, [event.target.name]: event.target.value};
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setLocalState(prevState => {
			return {...prevState, loading: true};
		});
		const newUserData = {
			firstName: localState.firstName,
			lastName: localState.lastName,
			phoneNumber: localState.phoneNumber,
			country: localState.country,
			email: localState.email,
			password: localState.password,
			confirmPassword: localState.confirmPassword
		};
		axios
			.post(apiConfig.signUpApi, newUserData)
			.then((response) => {
				localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
				setLocalState(prevState => {
					return {...prevState, loading: false};
				});	
				props.history.push('/');
			})
			.catch((error) => {
				const exactError = error.response.data;
				const newErrors = {...localState.errors, ...exactError};
				setLocalState(prevState => {
					return {...prevState, errors: newErrors, loading: false};
				});
			});
	};

	const checkFieldValidation = (fieldName, value) => {

		let exactError = { [fieldName]: '' };

		let newErrors = {};

        if(fieldName === "email") {
            if(!value || value.trim() === "") {
				exactError[fieldName] = VALIDATION_ERROR.FIELD_LEFT_BLANK;
				newErrors = {...localState.errors, ...exactError};
				setLocalState(prevState => {
					return {...prevState, errors: newErrors};
				});
                return false;
            }
            const pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
            if(!pattern.test(value)) {
				exactError[fieldName] = VALIDATION_ERROR.FIELD_INVALID;
				newErrors = {...localState.errors, ...exactError};
				setLocalState(prevState => {
					return {...prevState, errors: newErrors};
				});
                return false;
            }
            exactError[fieldName] = '';
			newErrors = {...localState.errors, ...exactError};
			setLocalState(prevState => {
				return {...prevState, errors: newErrors};
			});
            return true;
		}
		
        if(fieldName === "phoneNumber") {
            if(!value || value.trim() === "") {
                exactError[fieldName] = VALIDATION_ERROR.FIELD_LEFT_BLANK;
				newErrors = {...localState.errors, ...exactError};
				setLocalState(prevState => {
					return {...prevState, errors: newErrors};
				});
                return false;
            }
            const pattern = new RegExp("^[6-9][0-9]{9}$");
            if(value.length !== 10 || !pattern.test(value)) {
                exactError[fieldName] = VALIDATION_ERROR.FIELD_INVALID;
				newErrors = {...localState.errors, ...exactError};
				setLocalState(prevState => {
					return {...prevState, errors: newErrors};
				});
                return false;
            }
            exactError[fieldName] = '';
			newErrors = {...localState.errors, ...exactError};
			setLocalState(prevState => {
				return {...prevState, errors: newErrors};
			});
            return true;
        }
        
        if(fieldName === "firstName" || fieldName === "lastName" || fieldName === "country") {
            if(!value || value.trim() === "") {
				exactError[fieldName] = VALIDATION_ERROR.FIELD_LEFT_BLANK;
				newErrors = {...localState.errors, ...exactError};
				setLocalState(prevState => {
					return {...prevState, errors: newErrors};
				});
                return false;
            }
            const pattern = new RegExp('^[a-zA-Z ]{2,30}$');
            if(!pattern.test(value)) {
                exactError[fieldName] = VALIDATION_ERROR.FIELD_INVALID;
				newErrors = {...localState.errors, ...exactError};
				setLocalState(prevState => {
					return {...prevState, errors: newErrors};
				});
                return false;
            }
            exactError[fieldName] = '';
			newErrors = {...localState.errors, ...exactError};
			setLocalState(prevState => {
				return {...prevState, errors: newErrors};
			});
            return true;
        }

        if(fieldName === "password" || fieldName === "confirmPassword") {
            if(!value || value.trim() === "") {
                exactError[fieldName] = VALIDATION_ERROR.FIELD_LEFT_BLANK;
				newErrors = {...localState.errors, ...exactError};
				setLocalState(prevState => {
					return {...prevState, errors: newErrors};
				});
                return false;
			}
			if(fieldName === "confirmPassword" && localState.password !== localState.confirmPassword) {
				exactError[fieldName] = VALIDATION_ERROR.PASSWORD_DO_NOT_MATCH;
				newErrors = {...localState.errors, ...exactError};
				setLocalState(prevState => {
					return {...prevState, errors: newErrors};
				});
                return false;
			}
            exactError[fieldName] = '';
			newErrors = {...localState.errors, ...exactError};
			setLocalState(prevState => {
				return {...prevState, errors: newErrors};
			});
            return true;
        }
	};

	const checkFormValidity = () => {
		if(!localState.firstName || !localState.lastName || !localState.phoneNumber || !localState.country || !localState.email || !localState.password || !localState.confirmPassword) {
			return false;
		}
		const formError = localState.errors;
		if(formError.firstName || formError.lastName || formError.phoneNumber || formError.country || formError.email || formError.password || formError.confirmPassword){
			return false;
		}
		return true;
	};

	const onBlur = (fieldName, value) => {
        const isValid = checkFieldValidation(fieldName, value);
        if(isValid && checkFormValidity()) {
            setFormValid(true);
        }
        else {
            setFormValid(false);
        }
    };
	
    return (
		<>
			<NavigationBar />
			<Container component="main" maxWidth="xs" className={classes.signUpWrapper}>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="firstName"
									label="First Name"
									name="firstName"
									autoComplete="firstName"
									helperText={localState.errors.firstName}
									error={localState.errors.firstName ? true : false}
									onChange={handleChange}
									onBlur={(event) => onBlur("firstName", event.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lastName"
									helperText={localState.errors.lastName}
									error={localState.errors.lastName ? true : false}
									onChange={handleChange}
									onBlur={(event) => onBlur("lastName", event.target.value)}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="phoneNumber"
									label="Phone Number"
									name="phoneNumber"
									autoComplete="phoneNumber"
									helperText={localState.errors.phoneNumber}
									error={localState.errors.phoneNumber ? true : false}
									onChange={handleChange}
									onBlur={(event) => onBlur("phoneNumber", event.target.value)}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									helperText={localState.errors.email}
									error={localState.errors.email ? true : false}
									onChange={handleChange}
									onBlur={(event) => onBlur("email", event.target.value)}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="country"
									label="Country"
									name="country"
									autoComplete="country"
									helperText={localState.errors.country}
									error={localState.errors.country ? true : false}
									onChange={handleChange}
									onBlur={(event) => onBlur("country", event.target.value)}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									helperText={localState.errors.password}
									error={localState.errors.password ? true : false}
									onChange={handleChange}
									onBlur={(event) => onBlur("password", event.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="confirmPassword"
									label="Confirm Password"
									type="password"
									id="confirmPassword"
									autoComplete="current-password"
									helperText={localState.errors.confirmPassword}
									error={localState.errors.confirmPassword ? true : false}
									onChange={handleChange}
									onBlur={(event) => onBlur("confirmPassword", event.target.value)}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleSubmit}
                            disabled={localState.loading || !isFormValid}
						>
							Sign Up
							{localState.loading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
						{localState.errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{localState.errors.general}
							</Typography>
						)}
					</form>
				</div>
			</Container>
			<Footer />
		</>
    );
};

export default withStyles(styles)(Signup);