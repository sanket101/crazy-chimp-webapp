import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Card, CardContent, CardMedia, CardActionArea } from '@material-ui/core';
import background from '../../assets/bg.jpg';
import styles from './product-card.style';

const ProductCard = (props) => {
    const  { classes, product } = props;

    return (
        <Card className={classes.cardWrapper}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="250"
                    image={background}
                    alt="product"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <div className={classes.priceContent}>
                        <Typography variant="body1">
                            <del>{`Rs.${product.actualPrice}`}</del>
                        </Typography>
                        <Typography variant="body1">
                            {`Rs.${product.salePrice}`}
                        </Typography> 
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default withStyles(styles)(ProductCard);