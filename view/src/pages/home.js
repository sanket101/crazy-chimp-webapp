import React from 'react';
import NavigationBar from '../components/NavigationBar/navigation-bar';
import LandingSection from '../components/LandingSection/landing-section';
import withStyles from '@material-ui/core/styles/withStyles';
import CollabSection from '../components/CollabSection/collab-section';
import AboutUsSection from '../components/AboutUsSection/about-us-section';
import ContactUsSection from '../components/ContactUsSection/contact-us-section';
import Footer from '../components/Footer/footer';

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: '#000000'
	},
	toolBar: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	rightNavbar: {
		display: 'flex',
		alignItems: 'center'
	},
	navigationTypographyH6: {
		margin: '0 10px'
	},
	navigationIconButton: {
		color: '#ffffff'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	avatar: {
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0,
		marginTop: 20
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	toolbar: theme.mixins.toolbar
});

const Home = (props) => {
	const { classes } = props;
    return(
		<div>
			<NavigationBar />
				
			<LandingSection />
			
			<CollabSection />

			<AboutUsSection />

			<ContactUsSection />

			<Footer />
		</div>
	);
};

export default withStyles(styles)(Home);