import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { setProductsData } from '../../redux/Products/products.actions';
import { AppBar, IconButton, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button, Badge, Menu, MenuItem } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ShopIcon from '@material-ui/icons/Shop';
import LogoutIcon from '@mui/icons-material/Logout';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './navigation-bar.style';
import logo from '../../assets/logo.png';
import ROUTES from '../../constants/routes-name';
import axios from 'axios';
import apiConfig from '../../api/api-config';
import { authMiddleWare } from '../../utils/auth';
import { handleApiError } from '../../utils/error-handling';

const NavigationBar = (props) => {
	const [showDrawer, setShowDrawer] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const listOne = ['Home', 'Apparel', 'Cart'];
	const listTwo = ['Account', 'Logout'];
	const { classes, cart } = props;
	const isLoggedIn = localStorage.getItem('AuthToken');
	let history = useHistory();

	const closeDrawer = () => {
		setShowDrawer(false);
	};

	const redirectToRoute = (name) => {
		switch (name) {
			case 'Home':
				history.push(ROUTES.HOME);
				break;
			case 'Apparel':
				callProductsDataApi();
				break;
			case 'Cart':
				history.push(ROUTES.CART)
				break;
			case 'Account':
				history.push(ROUTES.ACCOUNT);
				break;
			case 'Logout': 
				callLogoutApi();
				break;
			default:
				break;
		}
	};

	const getIcon = (name) => {
		switch (name) {
			case 'Home':
				return <HomeIcon />;
			case 'Apparel':
				return <ShopIcon />;
			case 'Cart':
				return <ShoppingCartIcon />;
			case 'Account':
				return <AccountCircleIcon />;
			case 'Logout': 
				return <LogoutIcon />
			default:
				return <></>;
		}
	};

	const list = () => (
		<Box
		  sx={{ width: 250 }}
		  role="presentation"
		  onClick={closeDrawer}
		  onKeyDown={closeDrawer}
		>
		  <List>
			{listOne.map((text, index) => (
			  <ListItem button key={text} onClick={() => redirectToRoute(text)}>
				<ListItemIcon>
				  {getIcon(text)}
				</ListItemIcon>
				<ListItemText primary={text} />
			  </ListItem>
			))}
		  </List>
		  {isLoggedIn ?
		  	<>
		  	  <Divider />
			  <List>
				{listTwo.map((text, index) => (
				  <ListItem button key={text} onClick={() => redirectToRoute(text)}>
					<ListItemIcon>
					  {getIcon(text)}
					</ListItemIcon>
					<ListItemText primary={text} />
				  </ListItem>
				))}
			  </List>
			</>
			:
			<></>
		  }
		</Box>
	);

	const callProductsDataApi = async () => {
		try {
			const response = await axios.get(apiConfig.productData);
			if(response && response.data && response.data.numberOfProducts) {
				props.setProductsData(response.data.numberOfProducts);
			}
			history.push(ROUTES.SHOP);
		}
		catch(err) {
			// redirect to error page
			handleApiError(history, err);
		}
	};
	
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	
	const handleClose = () => {
		setAnchorEl(null);
	};

	const callLogoutApi = async() => {
		try {
			authMiddleWare(history);
            const authToken = localStorage.getItem('AuthToken');
		    axios.defaults.headers.common = { Authorization: `${authToken}` };
			const response = await axios.get(apiConfig.logoutApi);
			if(response && response.data) {
				localStorage.removeItem('AuthToken');
				setAnchorEl(null);
			}
		}
		catch(err) {
			// redirect to error page
			setAnchorEl(null);
			handleApiError(history, err);
		}
	}

    return (
        <>
			<div className={classes.hideForMobile}>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position="fixed" className={classes.appBar}>
						<Toolbar className={classes.toolBar}>
							<div className={classes.leftNavbar} onClick={() => history.push(ROUTES.HOME)}>
								<img src={logo} alt="Crazy Chimp Logo" height="50px" />
								<Typography variant="h6" className={classes.crazyChimpWrapper}>
									Crazy Chimp
								</Typography>
							</div>

							<div className={classes.rightNavbar}>
								<Typography variant="h6" className={classes.navigationTypographyH6} onClick={() => history.push(ROUTES.HOME)}>
									Home
								</Typography>

								<Typography variant="h6" className={classes.navigationTypographyH6} onClick={() => {
									callProductsDataApi();
								}}>
									Apparel
								</Typography>

								<IconButton className={classes.navigationIconButton} onClick={() => history.push(ROUTES.CART)}>
									<Badge color="primary" badgeContent={cart.length}>
										<ShoppingCartIcon />
									</Badge>
								</IconButton>

								{isLoggedIn ? 
									<>
										<IconButton className={classes.navigationIconButton} onClick={handleMenu}>
											<AccountCircleIcon />
										</IconButton>
										<Menu
											id="menu-appbar"
											anchorEl={anchorEl}
											anchorOrigin={{
											vertical: 'top',
											horizontal: 'right',
											}}
											keepMounted
											transformOrigin={{
											vertical: 'top',
											horizontal: 'right',
											}}
											open={Boolean(anchorEl)}
											onClose={handleClose}
										>
											<MenuItem onClick={() => history.push(ROUTES.ACCOUNT)}>My account</MenuItem>
											<MenuItem onClick={() => callLogoutApi()}>Logout</MenuItem>
										</Menu>
									</>
									:
									<div className={classes.navigationIconButton}><Button variant="outlined" onClick={() => history.push(ROUTES.LOGIN)}>LOGIN</Button></div>
								}
							</div>
						</Toolbar>
					</AppBar>
				</Box>
			</div>

			<div className={classes.hideForDesktop}>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position="fixed" className={classes.appBar}>
						<Toolbar className={classes.toolBar}>
							<div className={classes.leftNavbar}>
								<IconButton
									size="large"
									edge="start"
									color="inherit"
									aria-label="menu"
									onClick={() => {
										setShowDrawer(true);
									}}
									sx={{ mr: 2 }}
								>
									<MenuIcon />
								</IconButton>
								<Typography variant="h6" onClick={() => history.push(ROUTES.HOME)} className={classes.crazyChimpWrapper}>
									Crazy Chimp
								</Typography>
							</div>

							<div className={classes.rightNavbar}>
								<IconButton className={classes.navigationIconButton} onClick={() => history.push(ROUTES.CART)}>
									<Badge color="primary" badgeContent={cart.length}>
										<ShoppingCartIcon />
									</Badge>
								</IconButton>

								{isLoggedIn ? 
									<IconButton className={classes.navigationIconButton}>
										<AccountCircleIcon />
									</IconButton>
									:
									<div className={classes.navigationIconButton}><Button variant="outlined" className={classes.navigationIconButton} onClick={() => history.push(ROUTES.LOGIN)}>LOGIN</Button></div>
								}
							</div>
						</Toolbar>
					</AppBar>
				</Box>

				<Drawer
					anchor={'left'}
					open={showDrawer}
					onClose={closeDrawer}
				>
					{list()}
				</Drawer>
			</div>
		</>
    );
};

const mapStateToProps = (state) => {
	const reduxState = state.productDetails.toJS();
	return {
		cart: reduxState.cart
	};
};
  
const mapDispatchToProps = dispatch => {
	return {
		setProductsData: (productData) => dispatch(setProductsData(productData))
	};
};

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavigationBar));