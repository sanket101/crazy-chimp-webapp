// Material UI components
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setUserDetails } from '../../redux/User/user.actions';
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

const Login = (props) => {
    const { classes } = props;
    const [localState, setLocalState] = useState({
        email: '',
        password: '',
        errors: [],
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
				props.history.push('/');
			})
			.catch((error) => {
                setLocalState(prevState => {return {...prevState, errors: error.response.data, loading: false }});				
			});
	};

    const handleChange = (event) => {
		setLocalState(prevState => {
			return {...prevState, [event.target.name]: event.target.value};
		});
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
							disabled={localState.loading || !localState.email || !localState.password}
						>
							Sign In
							{localState.loading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
						<Grid container>
							<Grid item>
								<Link href="signup" variant="body2">
									{"Don't have an account? Sign Up"}
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

const mapStateToProps = () => {
	return {};
};
  
const mapDispatchToProps = dispatch => {
	return {
		setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));