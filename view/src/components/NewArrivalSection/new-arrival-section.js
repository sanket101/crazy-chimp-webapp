import React, { useRef } from "react";
import { Rerousel } from 'rerousel';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../DiscountSection/discount-section.style';
import { Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import ROUTES from '../../constants/routes-name';
import newArrivalProducts from '../../constants/new-arrival';
import ProductCard from '../ProductCard/product-card';

const NewArrivalSection = (props) => {
    const collabRef = useRef(null);
    const items = newArrivalProducts;
    const { classes } = props;

    let history = useHistory();

    const onProductClick = (product) => {
        props.setProductDetails(product);
        history.push(ROUTES.PRODUCT_DETAILS);
    };

    return (
        <div className={classes.collabSectionWrapper}>
            <Typography variant="h3" className={classes.headerMargin}>New Arrivals</Typography>
                    <Rerousel itemRef={collabRef}>
                        {
                            items.map((item, i) =>  {
                                return (
                                    <div key={i}  className={classes.bestSellerItem} onClick={() => onProductClick(item)} ref={collabRef}>
                                        <ProductCard stylingWithoutMaxWidth={true} product={item}/>
                                    </div>
                                );                
                            })
                        }
                    </Rerousel>
        </div>
    );
};

export default (withStyles(styles)(NewArrivalSection));