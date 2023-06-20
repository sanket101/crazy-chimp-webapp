import CSSConstants from "../../constants/css-constants";

const styles = (theme) => ({
    pageWrapper: {
        // backgroundColor: CSSConstants.BACKGROUND_SECONDARY,
        minHeight: '100vh',
        textAlign: 'center',
        color: CSSConstants.FONT_BLACK,
        padding: '80px 30px',
        // color: '#f7f7f7 !important',
    },
    primaryFont: {
        color: CSSConstants.FONT_BLACK
    },
    contactUsSectionWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_PRIMARY,
        color: CSSConstants.FONT_BLACK,
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
        color: CSSConstants.FONT_BLACK,
        fontWeight: 'bold'
    },
    socialMediaBtn: {
        color: CSSConstants.FONT_BLACK,
    },
    textFieldCss: {
        margin: '20px',
        width: '40%',
        '@media (max-width: 540px)': {
            width: '100%',
            margin: '20px 0px'
        }
    },
});

export default styles;