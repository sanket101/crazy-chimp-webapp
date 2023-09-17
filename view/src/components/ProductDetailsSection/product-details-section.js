import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Carousel from 'react-material-ui-carousel';
import { Typography, InputLabel, Select, MenuItem, Button, Divider, ButtonGroup, FormHelperText, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@material-ui/core';
import styles from './product-details-section.style';
import SizeChart from '../SizeChart/size-chart';
import ROUTES from '../../constants/routes-name';
import LINKS from '../../constants/imp-links';
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase/firebase";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PRODUCT_NAME } from '../../constants/product-constants';

const ProductDetailsSection = (props) => {
    const { classes, productDetails } = props;
    const [qty, setQty] = useState(1);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [addToCartTriggered, setAddToCartTriggered] = useState(false);
    const [outOfStockError, setOutOfStockError] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeAccordion, setActiveAccordion] = useState('');

    let history = useHistory();

    const onAddToCart = () => {
        setAddToCartTriggered(true);
        if (color && size) {
            props.setAddToCart(color, size, qty);
            logEvent(analytics, "add_to_cart", {
                currency: "INR",
                value: productDetails.salePrice,
                items: [
                    {
                        item_id: productDetails.productId,
                        item_name: productDetails.name,
                        item_category: productDetails.productCategory,
                        item_category2: productDetails.genreCategory,
                        item_variant: color,
                        quantity: qty
                    }
                ]
            })
        }
    };

    const checkStockAvailability = (color, size) => {
        if (color && size) {
            const isAvailable = props.checkStockAvailability(color, size);
            if (!isAvailable) {
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
                <div className={classes.focussedImageContainer}>
                    <img
                        src={`${productDetails.images[activeImageIndex]}&w=248&fit=crop&auto=format`}
                        srcSet={`${productDetails.images[activeImageIndex]}&w=248&fit=crop&auto=format&dpr=2 2x`}
                        className={classes.focussedImageAttributes}
                        alt={productDetails.name}
                        // loading="lazy"
                    />
                </div>
                <div className={classes.multiImageContainer}>
                    {
                        productDetails.images.map((item, i) => {
                            return (
                                <div key={i} onClick={() => setActiveImageIndex(i)}>
                                    <img
                                        src={`${item}&w=248&fit=crop&auto=format`}
                                        srcSet={`${item}&w=248&fit=crop&auto=format&dpr=2 2x`}
                                        className={i === activeImageIndex ? classes.highlightedImageAttributes : classes.imageAttributes}
                                        alt={productDetails.name}
                                    // loading="lazy"
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>

            <div className={classes.productContainer}>
                <Typography variant="h4">{productDetails.name}</Typography>
                <div className={classes.priceWrapper}>
                    <Typography variant="h5">₹ <del>{`${productDetails.actualPrice}`}</del>{` ${productDetails.salePrice}`}</Typography>
                    {/* <Typography variant="h4" className={classes.secondaryFont}></Typography> */}
                </div>

                <div className={classes.priceWrapper}>
                    <Typography variant="body1">inclusive of all taxes *</Typography>
                </div>

                <div className={classes.dividerWrapper}>
                    <Divider />
                </div>

                <Typography variant="body1">Shipping charges will be calculated at checkout. It takes around 5-9 days to deliver your order depending on your location.</Typography>
                <br />
                <Typography variant="body1">Please make sure that you have checked the size chart mentioned below. We strongly follow the sizing stated in it!</Typography>

                <div className={classes.productFieldsWrapper}>
                    <div className={classes.dropdownWidgetWrapper}>
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

                <Typography variant="body1">Contact us on <a href={LINKS.CRAZY_CHIMP_INSTAGRAM} target="_blank" className={classes.secondaryFont}>Instagram</a> if you want to order sizes not mentioned above or for custom orders.</Typography>

                <div className={classes.dividerWrapper}>
                    <Divider />
                </div>
                
                <div className={classes.accordionWrapper}>
                    <Accordion expanded={activeAccordion === "panel1"} onChange={() => setActiveAccordion("panel1")}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography>Size Chart</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.sizeChartWrapper}>
                                <SizeChart productType={productDetails.productCategory} />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div className={classes.accordionWrapper}>
                    <Accordion expanded={activeAccordion === "panel2"} onChange={() => setActiveAccordion("panel2")}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography>Product Description</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="High-quality materials for a soft and durable wear" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Vibrant colors and detailed artwork captures the intensity and emotion of the series" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={productDetails.productCategory === "OST" ? 'Fit Type: Oversized Fit' : 'Fit Type: Regular Fit'} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={productDetails.productCategory === "OST" ? 'Oversized fit for a relaxed and casual look' : 'Regular fit for a relaxed and casual look'} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Care Instructions: Hand Wash Only" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Easy to care for - machine wash and tumble dry" />
                                    </ListItem>
                                </List>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>

                {props.discountCodes.length > 0 ? <div className={classes.accordionWrapper}>
                    <Accordion expanded={activeAccordion === "panel3"} onChange={() => setActiveAccordion("panel3")}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography>Discount Offer for you</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <List>
                                    {props.discountCodes.map((item, key) => {
                                        return (
                                            <ListItem>
                                                <ListItemText primary={item.code} secondary={item.description} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>: <></>}
                
                <br />
                
                {/* <div className={classes.productFeature}>
                    <Typography variant="body1">WASH AND CARE Instruction : Always turn your garment INSIDE OUT before washing & drying to prevent fading. Do not iron directly on the print. Hand/Machine wash with similar clothes in COLD water</Typography>
                </div> */}

            </div>
        </>
    )
};

export default withStyles(styles)(ProductDetailsSection);