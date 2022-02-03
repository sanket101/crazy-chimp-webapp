import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './admin-panel.style';
import apiConfig from "../../api/api-config";
import axios from "axios";
import { authMiddleWare } from "../../utils/auth";
import { useHistory } from "react-router-dom";
import { handleApiError } from "../../utils/error-handling";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotesIcon from '@material-ui/icons/Notes';
import Avatar from '@material-ui/core/avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from "react-redux";
import { setAdminAuthentication  } from "../../redux/Admin/admin.actions";
import { setGenreCategories, setProductCategories } from "../../redux/Products/products.actions";
import AddProduct from "../../components/admin/AddProduct/add-product";
import ShowOrders from "../../components/admin/ShowOrders/show-orders";
import AddDiscount from "../../components/admin/AddDiscount/add-discount";

const AdminPanel = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [activeItem, setActiveItem] = useState('check-orders');

    let history = useHistory();
    const { classes } = props;

    const listItems = [
        {
            key: 'check-orders',
            title: 'Check Orders'
        },
        {
            key: 'add-product',
            title: 'Add Product'
        },
        {
            key: 'add-discount',
            title: 'Add Discount'
        },
        {
            key: 'account',
            title: 'Account'
        },
        {
            key: 'logout',
            title: 'Logout'
        }
    ];

    const getIcon = (key) => {
        switch (key) {
            case 'check-orders':
                return <NotesIcon />
            case 'add-product':
                return <NotesIcon />;
            case 'add-discount':
                return <NotesIcon />;
            case 'account':
                return <AccountBoxIcon />;
            case 'logout':
                return <ExitToAppIcon />;
            default:
                break;
        }
    };

    const onClickHandler = (key) => {
        setActiveItem(key);
    };

    const renderListItem = () => {
        switch (activeItem) {
            case 'add-discount':
                return <AddDiscount />
            case 'check-orders':
                return <ShowOrders />;
            case 'add-product':
                return <AddProduct  productCategories={props.productCategories} genreCategories={props.genreCategories} />;
            default:
                break;
        }
    };

    const checkIfAdmin = async () => {
        try {
            if(!props.isAdmin) {
                authMiddleWare(history);
                const authToken = localStorage.getItem('AuthToken');
                axios.defaults.headers.common = { Authorization: `${authToken}` };
                const response = await axios.get(apiConfig.adminAuthentication);
                if(response && response.data && response.data.message) {
                    // Success
                    props.setAdminAuthentication(true);

                    if(props.productCategories.length <= 0 || props.genreCategories.length <= 0) {
                        const responseProductCategories = await axios.get(apiConfig.getProductCategories);
        
                        const responseGenreCategories = await axios.get(apiConfig.getGenreCategories);
        
                        if((responseProductCategories && responseProductCategories.data && responseProductCategories.data.length > 0) &&
                        (responseGenreCategories && responseGenreCategories.data && responseGenreCategories.data.length > 0)) {
                            
                            props.setProductCategories(responseProductCategories.data);
                            props.setGenreCategories(responseGenreCategories.data);
        
                        }
                    }
                }
            }
            setLoading(false);
        }
        catch(err) {
            setLoading(false);
            handleApiError(history, err);
        }
    };

    useEffect(() => {
        checkIfAdmin();
    }, []);

    return (
        isLoading ?

        <Box sx={{textAlign: 'center'}}>
            <CircularProgress />
        </Box>
        :

        <>
		    <CssBaseline />
		    <AppBar position="fixed" className={classes.appBar}>
			    <Toolbar>
				    <Typography variant="h6" noWrap>
					    Admin Panel
				    </Typography>
			    </Toolbar>
		    </AppBar>
            <div className={classes.root}>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <center>
                        <Avatar src='' className={classes.avatar} />
                        <p>
                            {' '}
                            {'Welcome'} {'Admin'}
                        </p>
                    </center>
                    <Divider />
                    <List>
                        {listItems.map((item, i) => {
                            return (
                                <ListItem button key={item.key} onClick={() => onClickHandler(item.key)}>
                                    <ListItemIcon>
                                        {' '}{getIcon(item.key)}{' '}
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} />
                                </ListItem>
                            )
                        })}
                    </List>
                </Drawer>
                <div className={classes.listItemWrapper}>{renderListItem()}</div>
            </div>
	    </>
    );
};

const mapStateToProps = (state) => {
	const reduxState = state.productDetails.toJS();
    const reduxStateAdmin = state.adminDetails.toJS();
	return {
		productCategories: reduxState.productCategories,
		genreCategories: reduxState.genreCategories,
        isAdmin: reduxStateAdmin.isAdmin
	};
};
  
const mapDispatchToProps = dispatch => {
	return {
		setProductCategories: (productCategories) => dispatch(setProductCategories(productCategories)),
		setGenreCategories: (genreCategories) => dispatch(setGenreCategories(genreCategories)),
        setAdminAuthentication: (isAdmin) => dispatch(setAdminAuthentication(isAdmin))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminPanel));