import React, { useState } from 'react';
import { Typography, ButtonGroup, Button, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './cart-item.style';

const CartItem = (props) => {
    const { itemKey, item, classes } = props;
    const [qty, setQty] = useState(item.qty);

    const updateCartItemQty = (type) => {
        if(type === "INCREMENT") {
            setQty(prevQty => { 
                return prevQty + 1;
            }, props.updateCart(itemKey, 'qty', qty + 1));
        }
        else {
            setQty(prevQty => { 
                return prevQty - 1;
            }, props.updateCart(itemKey, 'qty', qty - 1));
        }
    };

    return (
        <div className={classes.cartItemWrapper}>
            <div className={classes.cartItemAttribute}>
                <img src={item.productDetails.images[0]} alt={item.productDetails.name} width="100px" loading="lazy" />
            </div>

            <div className={classes.cartItemAttribute}>
                <Typography variant="h6">{item.productDetails.name}</Typography>

                <Typography variant="body1" className={classes.secondaryFont}>{`${item.color} / ${item.size}`}</Typography>
            </div>

            <div className={classes.cartItemAttribute}>
                <ButtonGroup variant="outlined" aria-label="outlined button group" className={classes.buttonWrapper}>
                    <Button onClick={() => updateCartItemQty('INCREMENT')}>+</Button>
                    <Button disabled>{qty}</Button>
                    {qty === 1 ? <Button disabled>-</Button> : <Button onClick={() => updateCartItemQty('DECREMENT')}>-</Button>}
                </ButtonGroup>
            </div>

            <div className={classes.cartItemAttribute}>
                <Typography variant="h6">{`₹ ${item.productDetails.salePrice}`}</Typography>
            </div>

            <div className={classes.removeIconButton}>
                <IconButton onClick={() => props.deleteCartItem(itemKey)}>
					<ClearIcon />
				</IconButton>
            </div>
        </div>
    );
};

export default withStyles(styles)(CartItem);