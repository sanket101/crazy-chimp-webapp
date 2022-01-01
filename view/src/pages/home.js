import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { setProductsData, setProductCategories, setGenreCategories } from '../redux/Products/products.actions';
import NavigationBar from '../components/NavigationBar/navigation-bar';
import LandingSection from '../components/LandingSection/landing-section';
import CollabSection from '../components/CollabSection/collab-section';
import AboutUsSection from '../components/AboutUsSection/about-us-section';
import ContactUsSection from '../components/ContactUsSection/contact-us-section';
import Footer from '../components/Footer/footer';
import axios from 'axios';
import apiConfig from '../api/api-config';
import ROUTES from '../constants/routes-name';

const Home = (props) => {
	let history = useHistory();

	const onClickShopNow = async () => {
		try {
			const response = await axios.get(apiConfig.productData);
			if(response && response.data && response.data.numberOfProducts) {
				props.setProductsData(response.data.numberOfProducts);
			}
			history.push(ROUTES.SHOP);
		}
		catch(err) {
			// redirect to error page
		}
	};

	const getProductAndGenreCategories = async () => {
		try {
			if(props.productCategories.length <= 0 || props.genreCategories.length <= 0) {
				const responseProductCategories = await axios.get(apiConfig.getProductCategories);

				const responseGenreCategories = await axios.get(apiConfig.getGenreCategories);

				if((responseProductCategories && responseProductCategories.data && responseProductCategories.data.length > 0) &&
				(responseGenreCategories && responseGenreCategories.data && responseGenreCategories.data.length > 0)) {
					
					setProductCategories(responseProductCategories.data);
					setGenreCategories(responseGenreCategories.data);

				}
			}
		}
		catch(err) {
			// redirect to error page
		}
	};

	useEffect(() => {
		getProductAndGenreCategories();
	}, []);

    return(
		<div>
			<NavigationBar />
				
			<LandingSection onClickShopNow={onClickShopNow}/>
			
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
		setProductsData: (productData) => dispatch(setProductsData(productData)),
		setProductCategories: (productCategories) => dispatch(setProductCategories(productCategories)),
		setGenreCategories: (genreCategories) => dispatch(setGenreCategories(genreCategories))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);