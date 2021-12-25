import CSSConstants from '../../constants/css-constants';

const styles = (themes) => ({
    productDetailsWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_SECONDARY,
        // height: '100vh',
        paddingTop: '80px',
        
        '@media (max-width: 540px)': {
            height: 'auto'
        }
    },
    productDetailsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    secondaryFont: {
        color: CSSConstants.FONT_SECONDARY
    },
    primaryFont: {
        color: CSSConstants.FONT_PRIMARY
    },
    productDescriptionWrapper: {
        padding: '20px',
        display: 'flex',
        '@media (max-width: 540px)': {
            flexWrap: 'wrap'
        }
    },
    productFeature: {
        padding: '20px',
    }
});

export default styles;