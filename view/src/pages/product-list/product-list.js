import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import NavigationBar from '../../components/NavigationBar/navigation-bar';
import withStyles from '@material-ui/core/styles/withStyles';
import Footer from '../../components/Footer/footer';
import { FormControl, Button, FormLabel, RadioGroup, FormControlLabel, Radio, ButtonGroup, Drawer } from '@material-ui/core';
import { Stack, Pagination } from '@mui/material';
import ProductCard from '../../components/ProductCard/product-card';
import styles from './product-list.style';
import ROUTES from '../../constants/routes-name';

const ProductList = (props) => {
    const [productType, setProductType] = useState('AP');
    const [genreType, setGenreType] = useState('AG');
    const [page, setPage] = useState(1);
    const [showFilterDrawer, setFilterDrawer] = useState(false);

    const { classes } = props;
    const productCategories = [ { code: 'AP', displayName: 'All Products' }, { code: 'HST', displayName: 'Half Sleeve Tshirts' } ];
    const genreCategories = [ { code: 'AG', displayName: 'All Genres' }, { code: 'NRT', displayName: 'Naruto' } ];
    let history = useHistory();
    const products = [{
        title: 'Hokage T-shirt',
        description: '100% pure cotton t-shirt',
        salePrice: 449,
        actualPrice: 599,
        colorsAvailable: [ 'Red', 'Maroon', 'Navy Blue']
    },
    {
        title: 'Hokage T-shirt',
        description: '100% pure cotton t-shirt',
        salePrice: 449,
        actualPrice: 599,
        colorsAvailable: [ 'Red', 'Maroon', 'Navy Blue']
    }];

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
                        <Button>Apply</Button>
                        <Button>Clear</Button>
                    </ButtonGroup>
            </div>);
    };

    const getPaginationCount = () => {
        return Math.ceil(products.length / 100);
    };

    const onProductClick = () => {
        history.push(ROUTES.PRODUCT_DETAILS);
    };

    return (
        <>
            <NavigationBar />

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

            <Footer />
        </>
    );
};

export default withStyles(styles)(ProductList);