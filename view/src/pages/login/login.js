// Material UI components
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './login.style';
import axios from 'axios';
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import Footer from '../../components/Footer/footer';
import apiConfig from '../../api/api-config';
import VALIDATION_ERROR from '../../constants/validation-errors';
import { setLoginError } from '../../redux/General/general.actions';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { handleApiError } from '../../utils/error-handling';
import ROUTES from '../../constants/routes-name';
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase/firebase";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = (props) => {
    const { classes } = props;
    const [localState, setLocalState] = useState({
        email: '',
        password: '',
        errors: {
			email: '',
			password: '',
			general: ''
		},
        loading: false
    });

    const handleSubmit = (event) => {
		event.preventDefault();
		setLocalState(prevState => {return {...prevState, loading: true }});
		const userData = {
			email: localState.email,
			password: localState.password
		};
		axios
			.post(apiConfig.loginApi, userData)
			.then((response) => {
				localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
				setLocalState(prevState => {return {...prevState, loading: false }});
				logEvent(analytics, 'login', { method: 'manual'});
				props.history.push('/');
			})
			.catch((error) => {
				const exactError = error.response.data;
				const newErrors = {...localState.errors, ...exactError};
                setLocalState(prevState => {return {...prevState, errors: newErrors, loading: false }});			
			});
	};

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

	const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        props.setLoginError('');
    };

    return(
		<>
			<NavigationBar />
        	<Container component="main" maxWidth="xs" className={classes.loginWrapper}>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Login
					</Typography>
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
						<TextField
							variant="outlined"
							margin="normal"
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
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleSubmit}
							disabled={localState.loading || (!localState.email || localState.errors.email) || !localState.password}
						>
							Sign In
							{localState.loading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
						<Grid container>
							<Grid item>
								<Link variant="body2" onClick={() => props.history.push(ROUTES.SIGNUP)}>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item>
								<Link variant="body2" onClick={() => props.history.push(ROUTES.RESET_PASSWORD)}>
									{"Forgot password?"}
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
				{props.loginError && <Snackbar open={props.loginError ? true : false} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {props.loginError}
                    </Alert>
                </Snackbar>}
			</Container>
			
			<Footer />
		</>
    );
};

const mapStateToProps = (state) => {
	const reduxStateGeneral = state.generalDetails.toJS();
	return {
		loginError: reduxStateGeneral.loginError
	};
};
  
const mapDispatchToProps = dispatch => {
	return {
		setLoginError: (msg) => dispatch(setLoginError(msg))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));