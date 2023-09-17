import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Card, CardContent, CardMedia, CardActionArea } from '@material-ui/core';
import styles from './product-card.style';

const ProductCard = (props) => {
    const  { classes, product, stylingWithoutMaxWidth } = props;

    return (
        <Card className={!stylingWithoutMaxWidth ? classes.cardWrapper : classes.cardWrapperWithoutMaxWidth}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    // height="160"
                    image={product.images[0]}
                    alt={product.name}
                    loading='lazy'
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="div" style={{textAlign: "center"}}>
                        {product.name}
                    </Typography>
                    <hr /> 
                    <div className={classes.priceContent}>
                        {/* <Typography variant="body1">
                            {product.productCategory}
                        </Typography> */}
                        <Typography variant="body1">
                            ₹{' '}<del>{`${product.actualPrice}`}</del>{` ${product.salePrice}`}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default withStyles(styles)(ProductCard);