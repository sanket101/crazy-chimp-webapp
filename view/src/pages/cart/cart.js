import React from 'react';
import { useHistory } from "react-router-dom";
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import withStyles from '@material-ui/core/styles/withStyles';
import Footer from '../../components/Footer/footer';
import { Typography, Link, Button } from '@material-ui/core';
import styles from './cart.style';
import CartItem from '../../components/CartItem/cart-item';
import ROUTES from '../../constants/routes-name';

const Cart = (props) => {
    const cartList = [{
        name: 'Hokage T-shirt',
        color: 'Maroon',
        size: 'M',
        price: 449,
        quantity: 1
    }];

    const getTotal = () => {
        return cartList.reduce((total, item) => { return total + item.price; }, 0);
    };

    const { classes } = props;

    const history = useHistory();
    
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
                            <CartItem key={index} item={item} />
                        );
                    })
                }
                </div>
                <div className={classes.bottomNavigation}>
                    <Typography variant="h6">{`Total : Rs.${getTotal()}`}</Typography>

                    <Typography variant="body1" className={classes.secondaryFont}>Taxes and shipping will be calculated at checkout</Typography>
                    {/* <Link variant="body1" className={classes.bottomNavigationLink}>
                        {"Update Cart"}
                    </Link> */}
                    <Button variant="contained" className={classes.checkoutButton} onClick={() => history.push(ROUTES.CHECKOUT)}>CHECKOUT</Button>
                </div>
                
            </div>
            <Footer />
        </>
    );
};

export default withStyles(styles)(Cart);