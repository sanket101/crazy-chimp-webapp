import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { setProductsData, setProductCategories, setGenreCategories, setProductDetails, setBestSellers } from '../redux/Products/products.actions';
import NavigationBar from '../components/NavigationBar/navigation-bar';
import LandingSection from '../components/LandingSection/landing-section';
import CollabSection from '../components/CollabSection/collab-section';
import AboutUsSection from '../components/AboutUsSection/about-us-section';
import ContactUsSection from '../components/ContactUsSection/contact-us-section';
import Footer from '../components/Footer/footer';
import axios from 'axios';
import apiConfig from '../api/api-config';
import ROUTES from '../constants/routes-name';
import { handleApiError } from '../utils/error-handling';
import DiscountSection from '../components/DiscountSection/discount-section';
import BestSellerSection from '../components/BestSellerSection/best-seller-section';
import NewArrivalSection from '../components/NewArrivalSection/new-arrival-section';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase/firebase';
import ProductCategorySection from '../components/ProductCategorySection/product-category-section';
import ReviewSection from '../components/ReviewSection/review-section';
import { setDiscountCodes } from '../redux/General/general.actions';

const Home = (props) => {
	let history = useHistory();

	const onClickShopNow = (productCategory) => {
		if(!productCategory) {
			history.push(ROUTES.SHOP);
		}
		else {
			history.push(`${ROUTES.SHOP}?productCategory=${productCategory}`);
		}
	};

	const getProductAndGenreCategories = async () => {
		try {
			if(props.productCategories.length <= 0 || props.genreCategories.length <= 0) {
				const responseProductCategories = await axios.get(apiConfig.getProductCategories);

				const responseGenreCategories = await axios.get(apiConfig.getGenreCategories);

				if((responseProductCategories && responseProductCategories.data && responseProductCategories.data.length > 0) &&
				(responseGenreCategories && responseGenreCategories.data && responseGenreCategories.data.length > 0)) {
					
					props.setProductCategories(responseProductCategories.data);
					props.setGenreCategories(responseGenreCategories.data);

				}
			}
		}
		catch(err) {
			// redirect to error page
			handleApiError(history, err);
		}
	};

	const getBestSellerProducts = async () => {
		try {
			if(props.bestSellerProducts.length <=0) {
				const response = await axios.get(apiConfig.getBestSellers);
				if(response && response.data && response.data.length > 0) {
					props.setBestSellers(response.data);
				}
			}
		}
		catch(err) {

		}
	};

	const getDiscountCodesApi = async () => {
		const discountVouchers = await axios.get(apiConfig.getDiscountCodes);

		if (discountVouchers && discountVouchers.data && discountVouchers.data.length > 0) {
			props.setDiscountCodes(discountVouchers.data);
		}
	};

	useEffect(() => {
		getProductAndGenreCategories();
		getBestSellerProducts();
		getDiscountCodesApi();
		logEvent(analytics, "screen_view", {
			firebase_screen: "Home Page",
			firebase_screen_class: "Home"
		});
	}, []);

    return(
		<div>
			<NavigationBar />
				
			<LandingSection onClickShopNow={(productCategory) => onClickShopNow(productCategory)}/>

			<ProductCategorySection onClickShopNow={(productCategory) => onClickShopNow(productCategory)}/>

			<BestSellerSection setProductDetails={props.setProductDetails} bestSellerProducts={props.bestSellerProducts} />

			<ReviewSection />
			{/* <NewArrivalSection setProductDetails={props.setProductDetails} /> */}
{/* 			
			<DiscountSection />

			<CollabSection />

			<AboutUsSection />

			<ContactUsSection /> */}

			<Footer />
		</div>
	);
};

const mapStateToProps = (state) => {
	const reduxState = state.productDetails.toJS();
	return {
		productCategories: reduxState.productCategories,
		genreCategories: reduxState.genreCategories,
		bestSellerProducts: reduxState.bestSellerProducts
	};
};
  
const mapDispatchToProps = dispatch => {
	return {
		setProductCategories: (productCategories) => dispatch(setProductCategories(productCategories)),
		setGenreCategories: (genreCategories) => dispatch(setGenreCategories(genreCategories)),
		setProductDetails: (productDetails) => dispatch(setProductDetails(productDetails)),
		setBestSellers: (productDetails) => dispatch(setBestSellers(productDetails)),
		setDiscountCodes: (discountCodes) => dispatch(setDiscountCodes(discountCodes)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);