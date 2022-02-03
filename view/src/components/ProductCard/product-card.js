import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Card, CardContent, CardMedia, CardActionArea } from '@material-ui/core';
import styles from './product-card.style';

const ProductCard = (props) => {
    const  { classes, product } = props;

    if(!product.isAvailable) {
        return <></>;
    }
    return (
        <Card className={classes.cardWrapper}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    image={product.images[0]}
                    alt={product.name}
                    loading='lazy'
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <div className={classes.priceContent}>
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