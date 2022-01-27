import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { setProductList, setPaginationNumber, setProductType, setGenreType, setProductsData, setProductDetails } from '../../redux/Products/products.actions';
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import withStyles from '@material-ui/core/styles/withStyles';
import Footer from '../../components/Footer/footer';
import { FormControl, Button, FormLabel, RadioGroup, FormControlLabel, Radio, ButtonGroup, Drawer, Box, CircularProgress, Typography, Select, MenuItem } from '@material-ui/core';
import { Stack, Pagination } from '@mui/material';
import ProductCard from '../../components/ProductCard/product-card';
import styles from './product-list.style';
import ROUTES from '../../constants/routes-name';
import axios from 'axios';
import apiConfig from '../../api/api-config';
import { handleApiError } from '../../utils/error-handling';

const defaultGenreType = 'AG';
const defaultProductType = 'AP';

const ProductList = (props) => {
    const { classes } = props;

    const [isLoading, setLoading] = useState(true);
    const [productType, setProductType] = useState(defaultProductType);
    const [genreType, setGenreType] = useState(defaultGenreType);
    const [showFilterDrawer, setFilterDrawer] = useState(false);

    const products = [...props.productList];
    const productCategories = [{ code: 'AP', displayName: 'All Products' }, ...props.productCategories];
    const genreCategories = [{ code: 'AG', displayName: 'All Genres' }, ...props.genreCategories];
    const page = props.paginationNumber;

    let history = useHistory();

    const handleProductChange = (event) => {
        setProductType(event.target.value);
    };

    const handleGenreChange = (event) => {
        setGenreType(event.target.value)
    };

    const handleChange = (event, value) => {
        if(value && !isNaN(value) && value !== props.paginationNumber){
            props.setPaginationNumber(value);
        }
    };

    const renderFilteringSection = (deviceType) => {
        return( 
            <div className={classes.productCategory}>
                <FormControl component="fieldset" className={deviceType === 'mobile' ? classes.selectWrapperMobile : classes.selectWrapper}>
                        <FormLabel component="legend">Product Type</FormLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={productType}
                            label="Product Type"
                            onChange={handleProductChange}
                        >
                            {
                                productCategories.map((category, i) => {
                                    return (
                                        <MenuItem value={category.code}>{category.displayName}</MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>

                    <FormControl component="fieldset" className={deviceType === 'mobile' ? classes.selectWrapperMobile : classes.selectWrapper}>
                        <FormLabel component="legend">Genre Type</FormLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={genreType}
                            label="Genre Type"
                            onChange={handleGenreChange}
                        >
                            {
                                genreCategories.map((category, i) => {
                                    return (
                                        <MenuItem value={category.code}>{category.displayName}</MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                    
                    <ButtonGroup variant="outlined" aria-label="outlined button group" className={deviceType === 'mobile' ? classes.buttonWrapperMobile : classes.buttonWrapper}>
                        <Button onClick={onApplyFilter}>Apply</Button>
                        <Button onClick={onClearSelection}>Clear</Button>
                    </ButtonGroup>
            </div>);
    };

    const onApplyFilter = () => {
        setLoading(true);

        if(productType !== props.productType || genreType !== props.genreType) {
            props.setProductType(productType);
            props.setGenreType(genreType);
            callProductsApi(productType, genreType);
        }
        else {
            setLoading(false);
        }

        setFilterDrawer(false);
    };

    const onClearSelection = () => {
        setLoading(true);

        setGenreType(defaultGenreType);
        props.setGenreType(defaultGenreType);

        setProductType(defaultProductType);
        props.setProductType(defaultProductType);

        callProductsApi();
    };

    const getPaginationCount = () => {
        return Math.ceil(props.productData / 100);
    };

    const onProductClick = (product) => {
        props.setProductDetails(product);
        history.push(ROUTES.PRODUCT_DETAILS);
    };

    const callProductsApi = async (productType = '', genreType = '') => {
        try {
            const productCategory = (productType === "" || productType === defaultProductType) ? "" : productType;
            const genreCategory = (genreType === "" || genreType === defaultGenreType) ? "" : genreType;

            const responseProductData = await axios.get(`${apiConfig.productData}?productCategory=${productCategory}&genreCategory=${genreCategory}`);
            const response = await axios.get(`${apiConfig.productListApi}/${page}?productCategory=${productCategory}&genreCategory=${genreCategory}`);
    
            if((response && response.data && response.data.length > 0) && (responseProductData && responseProductData.data && responseProductData.data.numberOfProducts)) {
                props.setProductList(response.data);
                props.setProductsData(responseProductData.data.numberOfProducts);
                // Image Loading logic
                cacheImages(response.data);
            }
            setLoading(false);
        }
        catch(err) {
            setLoading(false);
            handleApiError(history, err);
        }
    };

    const cacheImages = async (srcArray) => {
        const promises = await srcArray.map((src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();

                img.src = src.images[0];
                img.onload = resolve();
                img.onerror = reject();
            });
        });

        await Promise.all(promises);
    };

    useEffect(() => {
        if(props.productList.length === 0) {
            callProductsApi();
        }
        else {
            setLoading(false);
        }
    }, []);

    if(props.productCategories.length === 0 || props.genreCategories.length === 0) {
        history.push(ROUTES.HOME);
        return <></>;
    }

    return (
        <>
            <NavigationBar />

            {
                isLoading ?
                    <Box className={classes.productListWrapper} sx={{textAlign: 'center'}}>
                        <CircularProgress />
                    </Box>
                    :
                    <>
                        <div className={classes.productListWrapper}>
                            <div className={classes.hideForDesktop}>
                                <Button variant="outlined" onClick={() => setFilterDrawer(true)}>Categories</Button>
                            </div>

                            <div className={classes.productListContainer}>
                                <div className={classes.hideForMobile}>
                                    {renderFilteringSection('desktop')}
                                </div>

                                <div className={classes.productList}>
                                    {products.length === 0 && <div>
                                            <Typography variant='h6'>No Products Found!</Typography>
                                        </div>
                                    }
                                    {products.length > 0 && products.map((product, i) => {
                                        return (
                                            <div key={i} onClick={() => onProductClick(product)}>
                                                <ProductCard product={product}/>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
            
                        <Drawer
                            anchor={'right'}
                            open={showFilterDrawer}
                            onClose={() => setFilterDrawer(false)}
                        >
                            {renderFilteringSection('mobile')}
                        </Drawer>

                        <Stack spacing={2} sx={{alignItems: 'center'}}>
                            <Pagination count={getPaginationCount()} page={page} onChange={handleChange} />
                        </Stack>
                    </>
            }
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => {
    const reduxState = state.productDetails.toJS();
	return {
        productData: reduxState.productData,
        paginationNumber: reduxState.paginationNumber,
        productList: reduxState.productList,
        productType: reduxState.productType,
        genreType: reduxState.genreType,
        productCategories: reduxState.productCategories,
		genreCategories: reduxState.genreCategories
    };
};
  
const mapDispatchToProps = dispatch => {
	return {
        setProductsData: (productData) => dispatch(setProductsData(productData)),
        setProductList: (productList) => dispatch(setProductList(productList)),
        setPaginationNumber: (paginationNumber) => dispatch(setPaginationNumber(paginationNumber)),
        setProductType: (productType) => dispatch(setProductType(productType)),
        setGenreType: (genreType) => dispatch(setGenreType(genreType)),
        setProductDetails: (productDetails) => dispatch(setProductDetails(productDetails))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductList));