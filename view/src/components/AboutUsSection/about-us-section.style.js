import CSSConstants from '../../constants/css-constants';

const styles = (themes) => ({
    aboutUsSectionWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_SECONDARY,
        color: CSSConstants.FONT_PRIMARY,
        textAlign: 'center',
        height: 'auto',
        padding: '30px 20px'
    },
    aboutUsFeatures: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    aboutUsFeature: {
        flex: '1 1',
        padding: '30px',

        '@media (max-width: 540px)': {
            flex: 'auto'
        }
    },
    aboutUsFeatureHeading: {
        margin: '20px 0'
    },
    aboutUsFeatureParagraph: {
        color: CSSConstants.FONT_SECONDARY
    }
});

export default styles;