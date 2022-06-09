import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import withStyles from '@material-ui/core/styles/withStyles';
import Footer from '../../components/Footer/footer';
import { Typography, Button } from '@material-ui/core';
import styles from './cart.style';
import CartItem from '../../components/CartItem/cart-item';
import ROUTES from '../../constants/routes-name';
import { updateCart } from '../../redux/Products/products.actions';
import { setLoginError } from '../../redux/General/general.actions';
import ValidationError from '../../constants/validation-errors';

const Cart = (props) => {
    const { classes, cart: cartList } = props;
    const history = useHistory();

    const updateCart = (index, fieldName, value) => {
        const newCartList = [...cartList];
        newCartList[index][fieldName] = value;
        props.updateCart(newCartList);
    };

    const deleteCartItem = (index) => {
        const newCartList = cartList.filter((item, i) => i !== index);
        props.updateCart(newCartList);
    };

    const getTotal = () => {
        return cartList.reduce((total, item) => { return total + item.productDetails.salePrice * item.qty; }, 0);
    };
    
    const checkoutHandler = () => {
        const isLoggedIn = localStorage.getItem('AuthToken');
        if(isLoggedIn) {
            history.push(ROUTES.CHECKOUT);
        }
        else {
            props.setLoginError(ValidationError.LOGIN_BEFORE_CONTINUE);
            history.push(ROUTES.LOGIN);
        }
    };
 
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if(cartList.length === 0) {
        return (
            <>
                <NavigationBar />
                    <div className={classes.cartWrapper}>
                        <Typography variant="body1">No products added!</Typography>
                    </div>
                <Footer />
            </>
        );
    }
    return (
        <>
            <NavigationBar />
                <div className={classes.cartWrapper}>
                    <Typography variant="h3">Your Cart</Typography>
                    <div className={classes.cartItemsWrapper}>
                    {
                        cartList.map((item, index) => {
                            return (
                                <CartItem key={index} itemKey={index} item={item} updateCart={updateCart} deleteCartItem={deleteCartItem} />
                            );
                        })
                    }
                    </div>
                    <div className={classes.bottomNavigation}>
                        <Typography variant="h6">{`Total : ₹ ${getTotal()}`}</Typography>

                        <Typography variant="body1" className={classes.secondaryFont}>Taxes and shipping will be calculated at checkout.</Typography>
                        
                        <Button variant="contained" className={classes.checkoutButton} onClick={checkoutHandler}>CHECKOUT</Button>
                    </div>
                    
                </div>
            <Footer />
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
        updateCart: (newCart) => dispatch(updateCart(newCart)),
        setLoginError: (msg) => dispatch(setLoginError(msg))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart));