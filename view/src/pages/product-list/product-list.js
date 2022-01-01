import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { setProductList, setPaginationNumber, setProductType, setGenreType } from '../../redux/Products/products.actions';
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import withStyles from '@material-ui/core/styles/withStyles';
import Footer from '../../components/Footer/footer';
import { FormControl, Button, FormLabel, RadioGroup, FormControlLabel, Radio, ButtonGroup, Drawer, Box, CircularProgress } from '@material-ui/core';
import { Stack, Pagination } from '@mui/material';
import ProductCard from '../../components/ProductCard/product-card';
import styles from './product-list.style';
import ROUTES from '../../constants/routes-name';
import axios from 'axios';
import apiConfig from '../../api/api-config';

const defaultGenreType = 'AG';
const defaultProductType = 'AP';

const ProductList = (props) => {
    const { classes } = props;

    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState((props.productList && props.productList.length > 0) ? props.productList : []);
    const [productType, setProductType] = useState(defaultProductType);
    const [genreType, setGenreType] = useState(defaultGenreType);
    const [page, setPage] = useState(1);
    const [showFilterDrawer, setFilterDrawer] = useState(false);

    const productCategories = [{ code: 'AP', displayName: 'All Products' }, ...props.productCategories];
    const genreCategories = [{ code: 'AG', displayName: 'All Genres' }, ...props.genreCategories];
    
    let history = useHistory();

    const handleProductChange = (event) => {
        setProductType(event.target.value);
    };

    const handleGenreChange = (event) => {
        setGenreType(event.target.value)
    };

    const handleChange = (event, value) => {
        setPage(value);
    };

    const renderFilteringSection = (deviceType) => {
        return( 
            <div className={classes.productCategory}>
                <FormControl component="fieldset" className={deviceType === 'mobile' ? classes.selectWrapperMobile : classes.selectWrapper}>
                        <FormLabel component="legend">Product Type</FormLabel>
                        <RadioGroup
                            aria-label="product"
                            name="radio-buttons-group"
                            value={productType}
                            onChange={handleProductChange}
                        >
                            {
                                productCategories.map((category, i) => {
                                    return (
                                        <FormControlLabel value={category.code} control={<Radio />} label={category.displayName} />
                                    );
                                })
                            }
                        </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset" className={deviceType === 'mobile' ? classes.selectWrapperMobile : classes.selectWrapper}>
                        <FormLabel component="legend">Genre Type</FormLabel>
                        <RadioGroup
                            aria-label="product"
                            name="radio-buttons-group"
                            value={genreType}
                            onChange={handleGenreChange}
                        >
                            {
                                genreCategories.map((category, i) => {
                                    return (
                                        <FormControlLabel value={category.code} control={<Radio />} label={category.displayName} />
                                    );
                                })
                            }
                        </RadioGroup>
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
    };

    const onClearSelection = () => {
        setGenreType(defaultGenreType);
        props.setGenreType(defaultGenreType);

        setProductType(defaultProductType);
        props.setProductType(defaultProductType);
    };

    const getPaginationCount = () => {
        return Math.ceil(props.productData / 100);
    };

    const onProductClick = () => {
        history.push(ROUTES.PRODUCT_DETAILS);
    };

    const callProductsApi = async (productType = '', genreType = '') => {
        try { 
            const productCategory = (productType === "" || productType === defaultProductType) ? "" : productType;
            const genreCategory = (genreType === "" || genreType === defaultGenreType) ? "" : genreType;

            const response = await axios.get(`${apiConfig.productListApi}/${page}?productCategory=${productCategory}&genreCategory=${genreCategory}`);
    
            if(response && response.data && response.data.length > 0) {
                setProducts(response.data);
                props.setProductList(response.data)
                console.log('PRODUCTS', products);
            }
            setLoading(false);
        }
        catch(err) {
            setLoading(false);
        }
    };

    useEffect(() => {
        callProductsApi();
    }, []);

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
                                    {products.map((product, i) => {
                                        return (
                                            <div key={i} onClick={() => onProductClick()}>
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
        setProductList: (productList) => dispatch(setProductList(productList)),
        setPaginationNumber: (paginationNumber) => dispatch(setPaginationNumber(paginationNumber)),
        setProductType: (productType) => dispatch(setProductType(productType)),
        setGenreType: (genreType) => dispatch(setGenreType(genreType))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductList));