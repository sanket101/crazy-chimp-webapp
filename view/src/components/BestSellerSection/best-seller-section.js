import React, { useEffect, useRef, useState } from "react";
import { Rerousel } from 'rerousel';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../DiscountSection/discount-section.style';
import { Typography, Box, CircularProgress } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import ROUTES from '../../constants/routes-name';
import bestSellerProducts from '../../constants/best-sellers';
import ProductCard from '../ProductCard/product-card';

const BestSellerSection = (props) => {
    const collabRef = useRef(null);
    const items = props.bestSellerProducts;
    const { classes } = props;
    const [isLoading, setLoading] = useState(true);

    let history = useHistory();

    const onProductClick = (product) => {
        props.setProductDetails(product);
        history.push(ROUTES.PRODUCT_DETAILS);
    };

    useEffect(() => {
        if(props.bestSellerProducts.length > 0) {
            setLoading(false);
        }
    }, [props.bestSellerProducts]);

    return (
        <div className={classes.collabSectionWrapper}>
            <Typography variant="h4" className={classes.headerMargin}>Best Sellers</Typography>
                    {isLoading ?
                        <Box>
                            <CircularProgress />
                       </Box>
                        :
                        <Rerousel itemRef={collabRef}>
                            {
                                items.map((item, i) =>  {
                                    return (
                                        <div key={i} className={classes.bestSellerItem} onClick={() => onProductClick(item)} ref={collabRef}>
                                            <ProductCard product={item} stylingWithoutMaxWidth={true} />
                                        </div>
                                    );                
                                })
                            }
                        </Rerousel>}
        </div>
    );
};

export default (withStyles(styles)(BestSellerSection));