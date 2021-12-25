import CSSConstants from '../../constants/css-constants';

const styles = (themes) => ({
    contactUsSectionWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_PRIMARY,
        color: CSSConstants.FONT_PRIMARY,
        textAlign: 'center',
        height: 'auto',
        padding: '30px 20px'
    },
    contactUsDescription: {
        paddingTop: '20px',
        color: CSSConstants.FONT_SECONDARY
    },
    contactUsEmail: {
        margin: '10px 0'
    },
    emailLink: {
        textDecoration: 'none',
        cursor: 'pointer',
        color: CSSConstants.FONT_PRIMARY,
        fontWeight: 'bold'
    },
    socialMediaBtn: {
        color: CSSConstants.FONT_PRIMARY,
    }
});

export default styles;