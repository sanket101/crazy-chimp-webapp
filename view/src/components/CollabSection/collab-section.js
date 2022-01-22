import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { setCollaborationData } from '../../redux/General/general.actions';
import { Typography, Box, CircularProgress } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './collab-section.style';
import { Rerousel } from 'rerousel';

const CollabSection = (props) => {
    const collabRef = useRef(null);

    const items = props.collaborationData;

    const { classes } = props;

    return (
       <div className={classes.collabSectionWrapper}>
           <Typography variant="h3" className={classes.headerMargin}>Our Collaborations</Typography>
           {
               items.length <= 0 ?

               <Box sx={{textAlign: 'center'}}>
                    <CircularProgress />
                </Box>
                :
                <Rerousel itemRef={collabRef}>
                    {
                       items.map((item, i) =>  {
                            return (
                                <div key={i} className={classes.collabItem} ref={collabRef}>
                                    <img
                                        src={`${item.imgURL}&w=248&fit=crop&auto=format`}
                                        srcSet={`${item.imgURL}&w=248&fit=crop&auto=format&dpr=2 2x`}
                                        height="600px"
                                        // width="500px"
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                    <Typography variant="h6" className={classes.headingTypographyH6}>{item.title}</Typography>
                                    <Typography variant="h6" className={classes.headingTypographyH6}>{`Insta Id : ${item.author}`}</Typography>
                                </div>
                            );                
                        })
                    }
                </Rerousel>
            }    
       </div>
    );
};

const mapStateToProps = (state) => {
	const reduxState = state.generalDetails.toJS();
	return {
		collaborationData: reduxState.collaborationData
	};
};
  
const mapDispatchToProps = dispatch => {
	return {
		setCollaborationData: (collaborationData) => dispatch(setCollaborationData(collaborationData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CollabSection));