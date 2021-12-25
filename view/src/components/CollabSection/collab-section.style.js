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
        padding: '30px 20px'
    },
    headingTypographyH6: {
        color: CSSConstants.FONT_SECONDARY
    }
});

export default styles;