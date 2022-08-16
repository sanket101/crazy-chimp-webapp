import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Carousel from 'react-material-ui-carousel';
import { Typography, InputLabel, Select, MenuItem, Button, Divider, ButtonGroup, FormHelperText } from '@material-ui/core';
import styles from './product-details-section.style';
import SizeChart from '../SizeChart/size-chart';
import ROUTES from '../../constants/routes-name';
import LINKS from '../../constants/imp-links';

const ProductDetailsSection = (props) => {
    const { classes, productDetails } = props;
    const [qty, setQty] = useState(1);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [addToCartTriggered, setAddToCartTriggered] = useState(false);
    const [outOfStockError, setOutOfStockError] = useState(false);

    let history = useHistory();

    const onAddToCart = () => {
        setAddToCartTriggered(true);
        if(color && size) {
            props.setAddToCart(color, size, qty);
        }
    };

    const checkStockAvailability = (color, size) => {
        if(color && size) {
            const isAvailable = props.checkStockAvailability(color, size);
            if(!isAvailable) {
                setOutOfStockError(true);
            }
            else {
                setOutOfStockError(false);
            }
        }
    };

    const onSizeChange = (event) => {
        setSize(event.target.value);
        checkStockAvailability(color, event.target.value);
    };

    const onColorChange = (event) => {
        setColor(event.target.value);
        checkStockAvailability(event.target.value, size);
    };

    return (
        <>
            <div className={classes.imageContainer}>
                <Carousel 
                    autoPlay={false}
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
                                        className={classes.imageAttributes}
                                        alt={productDetails.name}
                                        // loading="lazy"
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
                
                <Typography variant="body1" className={classes.secondaryFont}>Shipping charges will be calculated at checkout. It takes around 5-9 days to deliver your order depending on your location.</Typography>
                
                <div className={classes.productFieldsWrapper}>
                    <div className={classes.dropdownWidget}>
                        <InputLabel id="demo-simple-select-label" className={classes.inputLabel}>Color</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={color}
                            label="Color"
                            className={classes.selectLabel}
                            onChange={onColorChange}
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
                            onChange={onSizeChange}
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
                
                {outOfStockError && <Typography variant="body1" className={classes.errorFont}>Selected product is OUT OF STOCK.</Typography>}
                <div className={classes.addToCartButtonWrapper}>
                    <Button variant="contained" className={classes.addToCartButton} onClick={onAddToCart} disabled={!color || !size || outOfStockError}>ADD TO CART</Button>
                </div>
                
                {(props.cart && props.cart.length > 0) && <div className={classes.viewCartButtonWrapper}>
                    <Button variant="outlined" className={classes.addToCartButton} onClick={() => history.push(ROUTES.CART)}>View Cart</Button>
                </div>}

                <br />

                <Typography variant="body1" className={classes.secondaryFont}>CONTACT US ON <a href={LINKS.CRAZY_CHIMP_INSTAGRAM} target="_blank">INSTAGRAM</a> IF YOU WANT TO ORDER SIZES NOT MENTIONED ABOVE.</Typography>

                <div className={classes.dividerWrapper}>
                    <Divider />
                </div>
                
                <div className={classes.sizeChartWrapper}>
                    <SizeChart productType="T-shirts" />
                </div>

                <div className={classes.productFeature}>
                    <Typography variant="body1" className={classes.secondaryFont}>WASH AND CARE Instruction : Always turn your garment INSIDE OUT before washing & drying to prevent fading. Do not iron directly on the print. Hand/Machine wash with similar clothes in COLD water</Typography>
                </div>

            </div>
        </>
    )
};

export default withStyles(styles)(ProductDetailsSection);