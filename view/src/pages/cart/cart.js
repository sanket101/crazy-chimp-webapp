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
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase/firebase';
import useCheckMobileScreen from '../../utils/isMobile';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = (props) => {
    const { classes, cart: cartList } = props;
    const history = useHistory();
    const isMobile = useCheckMobileScreen();
    const updateCart = (index, fieldName, value) => {
        const newCartList = [...cartList];
        newCartList[index][fieldName] = value;
        props.updateCart(newCartList);
    };

    const deleteCartItem = (index) => {
        const newCartList = cartList.filter((item, i) => i !== index);
        props.updateCart(newCartList);
        logEvent(analytics, "remove_from_cart", {
            currency: "INR",
            value: getTotal(),
            items: getCartItems()
        });
    };

    const getTotal = () => {
        return cartList.reduce((total, item) => { return total + item.productDetails.salePrice * item.qty; }, 0);
    };

    const getCartItems = () => {
        let analyticsItems = [];

        for (let index = 0; index < cartList.length; index++) {
            const item = cartList[index];
            const newItem = {
                item_id: item.productDetails.productId,
                item_name: item.productDetails.name,
                item_category: item.productDetails.productCategory,
                item_category2: item.productDetails.genreCategory,
                item_variant: item.color,
                quantity: item.qty,
                price: item.productDetails.salePrice,
                currency: "INR"
            };

            analyticsItems.push(newItem);
        }

        return analyticsItems;
    };

    const checkoutHandler = () => {
        const isLoggedIn = localStorage.getItem('AuthToken');
        if (isLoggedIn) {
            logEvent(analytics, "begin_checkout", {
                currency: "INR",
                value: getTotal(),
                items: getCartItems()
            })
            history.push(ROUTES.CHECKOUT);
        }
        else {
            props.setLoginError(ValidationError.LOGIN_BEFORE_CONTINUE);
            history.push(ROUTES.LOGIN);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        logEvent(analytics, "screen_view", {
            firebase_screen: "Cart Page",
            firebase_screen_class: "Cart"
        });

    }, []);

    if (cartList.length === 0) {
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
                <Typography variant="h3" className={classes.textAlignCenter}>Your Cart</Typography>
                <div className={classes.cartItemsWrapper}>
                    {
                        cartList.map((item, index) => {
                            return (
                                <CartItem key={index} itemKey={index} item={item} updateCart={updateCart} deleteCartItem={deleteCartItem} />
                            );
                        })
                    }
                </div>

                <div>
                    <hr className={classes.horizontalBar} />
                </div>

                {isMobile ? <div className={classes.bottomNavigation}>
                    <Typography variant="h6">{`Total : ₹ ${getTotal()}`}</Typography>

                    <Typography variant="body1" className={classes.secondaryFont}>Taxes and shipping will be calculated at checkout.</Typography>

                    <Button variant="contained" className={classes.checkoutButton} onClick={checkoutHandler}>CHECKOUT</Button>
                    <Button variant="outlined" className={classes.clearCartButton} onClick={() => {props.updateCart([])}}>Clear Cart</Button>
                </div>
                    : 
                    <div>
                        <div className={classes.bottomNavigationDesktop} >
                        <div style={{flex: 1}}>
                            <Typography variant="h5">{`Total`}</Typography>
                        </div>
                        <div style={{flex: 1}}>
                            <Typography variant="h6">{" "}</Typography>
                        </div>
                        <div style={{flex: 3}}>
                            <Typography variant="h6">{" "}</Typography>
                        </div>
                        <div style={{flex: 1}}>
                            <Typography variant="h6">{`₹ ${getTotal()}`}</Typography>
                        </div>
                        <div style={{flex: 1}}>
                        </div>
                    </div>
                        <div style={{textAlign: "right"}}>
                            <Typography variant="body1" className={classes.secondaryFont}>* Taxes and shipping will be calculated at checkout.</Typography> 
                        </div>
                        <div style={{textAlign: "right"}}>
                            <Button variant="contained" className={classes.checkoutButton} onClick={checkoutHandler}>CHECKOUT</Button>
                            <Button variant="outlined" className={classes.clearCartButton} onClick={() => {props.updateCart([])}}>Clear Cart</Button>
                        </div>
                    </div>}

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