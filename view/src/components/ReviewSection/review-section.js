import React, { useRef } from "react";
import { Rerousel } from 'rerousel';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../DiscountSection/discount-section.style';
import { Typography } from '@material-ui/core';
import review_placeholder from "../../assets/review_placeholder.png";
import review_one from "../../assets/I91.jpg";
import review_two from "../../assets/I85.jpg";
import review_three from "../../assets/I95.jpg";
import ReviewCard from "../ReviewCard/review-card";

const ReviewSection = (props) => {
    const collabRef = useRef(null);
    const items = [
        {
            img: review_one,
            rating: 5,
            description: "Everything was great, just the delivery time could have been a little faster.",
            customerName: "Hridam Sarkar"
        },
        {
            img: review_two,
            rating: 6,
            description: "Seems perfect to me, you guys are amazing!",
            customerName: "Shyam Singh Negi"
        },
        {
            img: review_three,
            rating: 6,
            description: "You're best , excellent prints and choices. But if delivery could be fast then it will be great. Else everything is excellent.",
            customerName: "Aditya Gupta"
        },
    ];
    const { classes } = props;

    return (
        <div className={classes.collabSectionWrapper}>
            <Typography variant="h4" className={classes.headerMargin}>What our customer says!</Typography>
            <Rerousel itemRef={collabRef}>
                {
                    items.map((item, i) => {
                        return (
                            <div key={i} className={classes.bestSellerItem} ref={collabRef}>
                                <ReviewCard review={item} />
                            </div>
                        );
                    })
                }
            </Rerousel>
        </div>
    );
};

export default (withStyles(styles)(ReviewSection));