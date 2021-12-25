import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
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

const NavigationBar = (props) => {
	const [showDrawer, setShowDrawer] = useState(false);
	const listOne = ['Home', 'Shop', 'Cart'];
	const listTwo = ['Account', 'Logout'];
	const { classes } = props;
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
				history.push(ROUTES.SHOP);
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
		</Box>
	);

    return (
        <>
			<div className={classes.hideForMobile}>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position="fixed" className={classes.appBar}>
						<Toolbar className={classes.toolBar}>
							<div className={classes.leftNavbar} onClick={() => history.push(ROUTES.HOME)}>
								<img src={logo} width="50px" height="50px" />
								<Typography variant="h6" noWrap>
									Crazy Chimp
								</Typography>
							</div>

							<div className={classes.rightNavbar}>
								<Typography variant="h6" className={classes.navigationTypographyH6} onClick={() => history.push(ROUTES.HOME)}>
									Home
								</Typography>

								<Typography variant="h6" className={classes.navigationTypographyH6} onClick={() => history.push(ROUTES.SHOP)}>
									Shop
								</Typography>

								<IconButton className={classes.navigationIconButton}>
									<ShoppingCartIcon />
								</IconButton>

								<IconButton className={classes.navigationIconButton}>
									<AccountCircleIcon />
								</IconButton>
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

								<IconButton className={classes.navigationIconButton}>
									<AccountCircleIcon />
								</IconButton>
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

export default withStyles(styles)(NavigationBar);