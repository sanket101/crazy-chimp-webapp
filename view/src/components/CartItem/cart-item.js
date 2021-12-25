import React, { useState } from 'react';
import { Typography, ButtonGroup, Button, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './cart-item.style';

const CartItem = (props) => {
    const { item, classes } = props;
    const [qty, setQty] = useState(item.quantity);

    return (
        <div className={classes.cartItemWrapper}>
            <div className={classes.cartItemAttribute}>
                <img src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d" width="100px" />
            </div>

            <div className={classes.cartItemAttribute}>
                <Typography variant="h6">{item.name}</Typography>

                <Typography variant="body1" className={classes.secondaryFont}>{`${item.color} / ${item.size}`}</Typography>
            </div>

            <div className={classes.cartItemAttribute}>
                <ButtonGroup variant="outlined" aria-label="outlined button group" className={classes.buttonWrapper}>
                    <Button onClick={() => setQty(qty + 1)}>+</Button>
                    <Button disabled>{qty}</Button>
                    {qty === 1 ? <Button disabled>-</Button> : <Button onClick={() => setQty(qty - 1)}>-</Button>}
                </ButtonGroup>
            </div>

            <div className={classes.cartItemAttribute}>
                <Typography variant="h6">{`Rs.${item.price}`}</Typography>
            </div>

            <div className={classes.removeIconButton}>
                <IconButton>
					<ClearIcon />
				</IconButton>
            </div>
        </div>
    );
};

export default withStyles(styles)(CartItem);