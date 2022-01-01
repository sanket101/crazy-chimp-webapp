import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { setProductsData } from '../../redux/Products/products.actions';
import { AppBar, IconButton, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ShopIcon from '@material-ui/icons/Shop';
import LogoutIcon from '@mui/icons-material/Logout';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './navigation-bar.style';
import logo from '../../assets/Logo_Dark.png';
import ROUTES from '../../constants/routes-name';
import axios from 'axios';
import apiConfig from '../../api/api-config';

const NavigationBar = (props) => {
	const [showDrawer, setShowDrawer] = useState(false);
	const listOne = ['Home', 'Shop', 'Cart'];
	const listTwo = ['Account', 'Logout'];
	const { classes } = props;
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
			case 'Shop':
				callProductsDataApi();
				break;
			case 'Cart':
				break;
			case 'Account':
				break;
			case 'Logout': 
				break;
			default:
				break;
		}
	};

	const getIcon = (name) => {
		switch (name) {
			case 'Home':
				return <HomeIcon />;
			case 'Shop':
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
		}
	};

    return (
        <>
			<div className={classes.hideForMobile}>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position="fixed" className={classes.appBar}>
						<Toolbar className={classes.toolBar}>
							<div className={classes.leftNavbar} onClick={() => history.push(ROUTES.HOME)}>
								<img src={logo} alt="Crazy Chimp Logo" width="50px" height="50px" />
								<Typography variant="h6" noWrap>
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
									Shop
								</Typography>

								<IconButton className={classes.navigationIconButton}>
									<ShoppingCartIcon />
								</IconButton>

								{isLoggedIn ? 
									<IconButton className={classes.navigationIconButton}>
										<AccountCircleIcon />
									</IconButton>
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
								<Typography variant="h6" onClick={() => history.push(ROUTES.HOME)} noWrap>
									Crazy Chimp
								</Typography>
							</div>

							<div className={classes.rightNavbar}>
								<IconButton className={classes.navigationIconButton}>
									<ShoppingCartIcon />
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

const mapStateToProps = () => {
	return {};
};
  
const mapDispatchToProps = dispatch => {
	return {
		setProductsData: (productData) => dispatch(setProductsData(productData))
	};
};

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavigationBar));