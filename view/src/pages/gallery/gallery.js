import React, { useEffect, useState } from 'react';
import { Box, ImageList, ImageListItem, Typography, CircularProgress } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './gallery.style';
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import Footer from '../../components/Footer/footer';
import { handleApiError } from '../../utils/error-handling';
import { useHistory } from 'react-router-dom';
import { setCustomerGallery } from '../../redux/General/general.actions';
import axios from 'axios';
import apiConfig from '../../api/api-config';
import { connect } from 'react-redux';

const Gallery = (props) => {
    const { classes } = props;
    const [isLoading, setLoading] = useState(true);
    let history = useHistory();

    const callCustomerGalleryApi = async () => {
        try {
            if(props.customerGallery.length <= 0) {
                const response = await axios.get(`${apiConfig.getCustomerGallery}`);
                if(response && response.data) {
                    props.setCustomerGallery(response.data.length > 0 ? response.data : []);
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
        callCustomerGalleryApi();
    }, []);

    return (
        <>

        <NavigationBar />
        
        <div className={classes.galleryWrapper}>
            <Typography variant="h3" className={classes.headerFont}>Our Customer Gallery</Typography>
            {isLoading ?
                <Box sx={{textAlign: 'center'}}>
                    <CircularProgress />
                </Box>
                :
                <>
                <Box className={classes.hideForMobile}>
                    <div className='adjust-height-desktop'>
                        <ImageList variant="masonry" cols={3} gap={8}>
                            {props.customerGallery.map((item, index) => (
                                <ImageListItem key={index}>
                                    <img
                                        src={`${item.img}&w=248&fit=crop&auto=format`}
                                        srcSet={`${item.img}&w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={'Customer Image'}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </Box>
                <Box className={classes.hideForDesktop}>
                    <ImageList variant="masonry" cols={2} gap={8}>
                        {props.customerGallery.map((item, index) => (
                            <ImageListItem key={index}>
                                <img
                                    src={`${item.img}&w=248&fit=crop&auto=format`}
                                    srcSet={`${item.img}&w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={'Customer Image'}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
                </>
            }
        </div>

        <Footer />
        
        </>
    );
};

const mapStateToProps = (state) => {
	const reduxState = state.generalDetails.toJS();
	return {
		customerGallery: reduxState.customerGallery
	};
};
  
const mapDispatchToProps = dispatch => {
	return {
		setCustomerGallery: (data) => dispatch(setCustomerGallery(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Gallery));