import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Carousel from 'react-material-ui-carousel';
import { Typography, InputLabel, Select, MenuItem, Button, Divider, ButtonGroup, FormHelperText } from '@material-ui/core';
import styles from './product-details-section.style';
import SizeChart from '../SizeChart/size-chart';
import ROUTES from '../../constants/routes-name';

const ProductDetailsSection = (props) => {
    const { classes, productDetails } = props;
    const [qty, setQty] = useState(1);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [addToCartTriggered, setAddToCartTriggered] = useState(false);
    let history = useHistory();

    const onAddToCart = () => {
        setAddToCartTriggered(true);
        if(color && size) {
            props.setAddToCart(color, size, qty);
        }
    };

    return (
        <>
            <div className={classes.imageContainer}>
                <Carousel 
                    autoPlay={true}
                    stopAutoPlayOnHover={true}
                    interval={4000}
                    animation={'fade'}
                    duration={500}
                    cycleNavigation={true}
                >
                    {
                        productDetails.images.map((item, i) =>  {
                            return (
                                <div key={i}>
                                    <img
                                        src={`${item}&w=248&fit=crop&auto=format`}
                                        srcSet={`${item}&w=248&fit=crop&auto=format&dpr=2 2x`}
                                        height="500px"
                                        // width="400px"
                                        alt={productDetails.name}
                                        loading="lazy"
                                    />
                                </div>
                            );                
                        })
                    }
                </Carousel>
            </div>

            <div className={classes.productContainer}>
                <Typography variant="h3">{productDetails.name}</Typography>
                
                <div className={classes.priceWrapper}>
                    <Typography variant="h4" className={classes.secondaryFont}>₹ <del>{`${productDetails.actualPrice}`}</del>{` ${productDetails.salePrice}`}</Typography>
                    {/* <Typography variant="h4" className={classes.secondaryFont}></Typography> */}
                </div>
                
                <div className={classes.dividerWrapper}>
                    <Divider />
                </div>
                
                <Typography variant="body1" className={classes.secondaryFont}>Shipping charges will be calculated at checkout.</Typography>
                
                <div className={classes.productFieldsWrapper}>
                    <div className={classes.dropdownWidget}>
                        <InputLabel id="demo-simple-select-label" className={classes.inputLabel}>Color</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={color}
                            label="Color"
                            className={classes.selectLabel}
                            onChange={(event) => { setColor(event.target.value); }}
							error={addToCartTriggered && !color ? true : false}
                        >
                            {
                                productDetails.colorsAvailable.map((color, index) => {
                                    return (<MenuItem key={index} value={color}>{color}</MenuItem>)
                                })
                            }
                        </Select>
                        {addToCartTriggered && !color ? <FormHelperText>*Required</FormHelperText> : <></>}
                    </div>

                    <div className={classes.dropdownWidget}>
                        <InputLabel id="demo-simple-select-label" className={classes.inputLabel}>Size</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={size}
                            label="Size"
                            className={classes.selectLabel}
                            onChange={(event) => { setSize(event.target.value); }}
                            error={addToCartTriggered && !size ? true : false}
                        >
                            {
                                productDetails.sizeAvailable.map((size, index) => {
                                    return (<MenuItem key={index} value={size}>{size}</MenuItem>)
                                })
                            }
                        </Select>
                        {addToCartTriggered && !size ? <FormHelperText>*Required</FormHelperText> : <></>}
                    </div>

                    <div className={classes.qtyWrapper}>
                        <InputLabel id="demo-simple-select-label" className={classes.inputLabel}>Quantity</InputLabel>
                        <ButtonGroup variant="outlined" aria-label="outlined button group" className={classes.buttonWrapper}>
                            {qty === 1 ? <Button disabled>-</Button> : <Button onClick={() => setQty(qty - 1)}>-</Button>}
                            <Button disabled>{qty}</Button>
                            <Button onClick={() => setQty(qty + 1)}>+</Button>
                        </ButtonGroup>
                    </div>
                </div>

                <Button variant="contained" className={classes.addToCartButton} onClick={onAddToCart}>ADD TO CART</Button>
                
                {(props.cart && props.cart.length > 0) && <div className={classes.addToCartButtonWrapper}>
                    <Button variant="outlined" className={classes.addToCartButton} onClick={() => history.push(ROUTES.CART)}>View Cart</Button>
                </div>}

                <div className={classes.dividerWrapper}>
                    <Divider />
                </div>
                
                <div className={classes.sizeChartWrapper}>
                    <SizeChart productType="T-shirts" />
                </div>

            </div>
        </>
    )
};

export default withStyles(styles)(ProductDetailsSection);