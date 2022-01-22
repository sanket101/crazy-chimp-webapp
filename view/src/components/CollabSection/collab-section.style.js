import CSSConstants from '../../constants/css-constants';

const styles = (themes) => ({
    collabSectionWrapper : {
        backgroundColor: CSSConstants.BACKGROUND_PRIMARY,
        color: CSSConstants.FONT_PRIMARY,
        textAlign: 'center',
        padding: '30px 20px',
        height: 'auto'
    },
    carouselWrapper: {
        padding: '30px 20px',
        '@media (max-width: 540px)' : {
            padding: '30px 0px',
        }
    },
    headingTypographyH6: {
        color: CSSConstants.FONT_SECONDARY
    },
    hideForDesktop: {
		'@media (min-width: 540px)' : {
			visibility: 'hidden',
            display: 'none'
		}
	},
	hideForMobile: {
		'@media (max-width: 540px)' : {
			visibility: 'hidden',
            display: 'none'
		}
	},
    mainWrapperForDesktopCarousel: {
        display: 'flex'
    },
    collabItem: {
        width: `calc(100%/3)`,

        '@media (max-width: 540px)' : {
            width: '100%'
        }
    },
    headerMargin: {
        marginBottom: '20px'
    }
});

export default styles;