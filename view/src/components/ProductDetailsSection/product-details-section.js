import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Carousel from 'react-material-ui-carousel';
import { Typography, InputLabel, Select, MenuItem, Button, Divider, ButtonGroup } from '@material-ui/core';
import styles from './product-details-section.style';
import SizeChart from '../SizeChart/size-chart';

const ProductDetailsSection = (props) => {
    const { classes } = props;
    const [qty, setQty] = useState(1);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const items = [
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
            author: '@rollelflex_graphy726',
          },
          {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
            author: '@helloimnik',
          }
    ];

    const onAddToCart = () => {
        if(color && size) {
            props.setAddToCart(true);
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
                        items.map((item, i) =>  {
                            return (
                                <div key={i}>
                                    <img
                                        src={`${item.img}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        height="400px"
                                        width="500px"
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </div>
                            );                
                        })
                    }
                </Carousel>
            </div>

            <div className={classes.productContainer}>
                <Typography variant="h3">Hokage T-shirt</Typography>

                <Typography variant="h4" className={classes.secondaryFont}>Rs.449</Typography>
                
                <div className={classes.dividerWrapper}>
                    <Divider />
                </div>
                
                <Typography variant="body1" className={classes.secondaryFont}>Shipping Charges will be calculated at checkout</Typography>
                
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
                        >
                            <MenuItem value={'red'}>Red</MenuItem>
                            <MenuItem value={'navyblue'}>Navy Blue</MenuItem>
                            <MenuItem value={'maroon'}>Maroon</MenuItem>
                        </Select>
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
                        >
                            <MenuItem value={'XS'}>XS</MenuItem>
                            <MenuItem value={'S'}>S</MenuItem>
                            <MenuItem value={'M'}>M</MenuItem>
                            <MenuItem value={'L'}>L</MenuItem>
                            <MenuItem value={'XL'}>XL</MenuItem>
                            <MenuItem value={'XXL'}>XXL</MenuItem>
                        </Select>
                    </div>

                    <div className={classes.qtyWrapper}>
                        <InputLabel id="demo-simple-select-label" className={classes.inputLabel}>Quantity</InputLabel>
                        <ButtonGroup variant="outlined" aria-label="outlined button group" className={classes.buttonWrapper}>
                            <Button onClick={() => setQty(qty + 1)}>+</Button>
                            <Button disabled>{qty}</Button>
                            {qty === 1 ? <Button disabled>-</Button> : <Button onClick={() => setQty(qty - 1)}>-</Button>}
                        </ButtonGroup>
                    </div>
                </div>

                <Button variant="contained" className={classes.addToCartButton} onClick={onAddToCart}>ADD TO CART</Button>
                {/* <Button variant="outlined" className={classes.addToCartButton} >View Cart</Button> */}

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