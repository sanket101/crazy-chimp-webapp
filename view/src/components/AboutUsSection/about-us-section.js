import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';
import styles from './about-us-section.style';

const AboutUsSection = (props) => {
    const { classes } = props;
    const features = [
        {
            title: 'Professional Customer Service',
            description: 'We support you at each step of the way. If there is an issue, our customer service staff are ready to help you over email or a phone call. We value your time!'
        },
        {
            title: 'Committed to Quality',
            description: 'Quality should never be compromised. No matter what product you choose, you can feel confident that our products are of the highest caliber.'
        },
        {
            title: '100% Satisfaction Guaranteed',
            description: 'You should be completely happy with your experience. If you have any questions about us, our products, or even shipping, get in touch!'
        }
    ]
    return (
        <div className={classes.aboutUsSectionWrapper}>
            <Typography variant="h3">About Us</Typography>
            <div className={classes.aboutUsFeatures}>
                {
                    features.map((feature,i) => {
                        return (
                            <div className={classes.aboutUsFeature}>
                                <Typography variant="h5" className={classes.aboutUsFeatureHeading}>{feature.title}</Typography>
                                <Typography variant="body1" className={classes.aboutUsFeatureParagraph}>{feature.description}</Typography>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default withStyles(styles)(AboutUsSection);
