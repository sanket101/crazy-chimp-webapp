import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { ImageListItem, ImageListItemBar, IconButton, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './collab-section.style';

const CollabSection = (props) => {
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

    const { classes } = props;

    return (
       <div className={classes.collabSectionWrapper}>
           <Typography variant="h3">Our Collaborations</Typography>
            <Carousel 
                autoPlay={true}
                stopAutoPlayOnHover={true}
                interval={4000}
                animation={'fade'}
                duration={500}
                cycleNavigation={true}
                className={classes.carouselWrapper}
            >
                {
                    items.map((item, i) =>  {
                        return (
                            <div key={i}>
                                <img
                                    src={`${item.img}?w=248&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    height="500px"
                                    width="600px"
                                    alt={item.title}
                                    loading="lazy"
                                />
                                <Typography variant="h6" className={classes.headingTypographyH6}>{item.title}</Typography>
                                <Typography variant="h6" className={classes.headingTypographyH6}>{item.author}</Typography>
                            </div>
                        );                
                    })
                }
            </Carousel>
       </div>
    );
};

export default withStyles(styles)(CollabSection);