import React, { useState, useEffect, useRef } from "react";
import { Rerousel } from 'rerousel';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './discount-section.style';
import { Typography, Box, CircularProgress } from '@material-ui/core';
import { handleApiError } from "../../utils/error-handling";
import apiConfig from "../../api/api-config";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setCollaborationData, setDiscountData } from "../../redux/General/general.actions";

const DiscountSection = (props) => {
    const [isLoading, setLoading] = useState(true);
    const collabRef = useRef(null);

    const items = props.discountData;

    const { classes } = props;

    let history = useHistory();

    const callGetCollaborationApi = async () => {
        try {
            if(props.collaborationData.length <= 0 && props.discountData.length <=0) {
                const response = await axios.get(`${apiConfig.getCollaborationData}`);
                if(response && response.data) {
                    props.setCollaborationData(response.data.collaborations ? response.data.collaborations : []);
                    props.setDiscountData(response.data.discounts ? response.data.discounts : []);
                }
            }
            setLoading(false);
        }
        catch(err) {
            // Redirect to error
            setLoading(false);
            handleApiError(history, err);
        }
    };

    useEffect(() => {
        callGetCollaborationApi();
    }, []);

    return (
        // <div className={classes.collabSectionWrapper}>
        //     <Typography variant="h3" className={classes.headerMargin}>Discount Offers</Typography>
        //     {
        //         isLoading ?

        //             <Box sx={{textAlign: 'center'}}>
        //                 <CircularProgress />
        //             </Box>
        //             :
        //             <Rerousel itemRef={collabRef}>
        //                 {
        //                     items.map((item, i) =>  {
        //                         return (
        //                             <div key={i} className={classes.collabItem} ref={collabRef}>
        //                                 <img
        //                                     src={`${item.imgURL}&w=248&fit=crop&auto=format`}
        //                                     srcSet={`${item.imgURL}&w=248&fit=crop&auto=format&dpr=2 2x`}
        //                                     height="300px"
        //                                     // width="500px"
        //                                     alt={item.title}
        //                                     loading="lazy"
        //                                 />
        //                             </div>
        //                         );                
        //                     })
        //                 }
        //             </Rerousel>
        //     }    
        // </div>
        <></>
    );
};

const mapStateToProps = (state) => {
	const reduxState = state.generalDetails.toJS();
	return {
		discountData: reduxState.discountData,
        collaborationData: reduxState.collaborationData
	};
};
  
const mapDispatchToProps = dispatch => {
	return {
		setCollaborationData: (collaborationData) => dispatch(setCollaborationData(collaborationData)),
        setDiscountData: (discountData) => dispatch(setDiscountData(discountData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DiscountSection));