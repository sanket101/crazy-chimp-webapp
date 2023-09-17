import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './review-card.style.js';
import { Rating } from '@mui/material';
import reviewImg from "../../assets/review.png";
import { Typography } from '@material-ui/core';

const ReviewCard = (props) => {
    const { classes, review } = props;

    return (
        <div className={classes.reviewCardWrapper}>
            <div className={classes.reviewCardImgWrapper}>
                <img src={review.img} width="80px" />
                <Rating name="read-only" value={review.rating} readOnly />
            </div>
            <div className={classes.reviewCardContentSection}>
                <img src={reviewImg} width="20px" />
                <Typography variant='caption' display='block'>
                    {review.description}
                </Typography>
                <Typography variant='button' display='block'>
                    {review.customerName}
                </Typography>
            </div>
        </div>
    )
};

export default withStyles(styles)(ReviewCard);