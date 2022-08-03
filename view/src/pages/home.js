import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { setProductsData, setProductCategories, setGenreCategories, setProductDetails } from '../redux/Products/products.actions';
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

const Home = (props) => {
	let history = useHistory();

	const onClickShopNow = () => {
		history.push(ROUTES.SHOP);
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

	useEffect(() => {
		getProductAndGenreCategories();
	}, []);

    return(
		<div>
			<NavigationBar />
				
			<LandingSection onClickShopNow={onClickShopNow}/>

			<BestSellerSection setProductDetails={props.setProductDetails} />

			<NewArrivalSection setProductDetails={props.setProductDetails} />
			
			<DiscountSection />

			<CollabSection />

			<AboutUsSection />

			<ContactUsSection />

			<Footer />
		</div>
	);
};

const mapStateToProps = (state) => {
	const reduxState = state.productDetails.toJS();
	return {
		productCategories: reduxState.productCategories,
		genreCategories: reduxState.genreCategories
	};
};
  
const mapDispatchToProps = dispatch => {
	return {
		setProductCategories: (productCategories) => dispatch(setProductCategories(productCategories)),
		setGenreCategories: (genreCategories) => dispatch(setGenreCategories(genreCategories)),
		setProductDetails: (productDetails) => dispatch(setProductDetails(productDetails))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);