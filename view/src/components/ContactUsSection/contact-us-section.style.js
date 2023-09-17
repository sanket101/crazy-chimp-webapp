import CSSConstants from '../../constants/css-constants';

const styles = (themes) => ({
    contactUsSectionWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_PRIMARY,
        color: CSSConstants.FONT_PRIMARY,
        textAlign: 'center',
        height: 'auto',
        padding: '30px 20px',
        '& .MuiInputBase-input': {
            background: 'white'
        },
        '@media (max-width: 540px)' : {
            flexDirection: 'column'
        }
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
    },
    textFieldCss: {
        margin: '10px'
    },
    textFieldCssWithFullWidth: {
        margin: '10px',
        '@media (min-width: 540px)': {
            width: '390px'
        }
    },
    textAreaCss: {
        margin: '10px',
        '& .MuiInputBase-input': {
            height: '5rem'
        },
        '@media (min-width: 540px)': {
            width: '390px'
        }
    },
    submitBtn: {
        padding: '10px 20px',
        minHeight: '50px',
        backgroundColor: CSSConstants.FONT_SECONDARY,
        color: CSSConstants.FONT_PRIMARY,
        '& span' : {
            fontWeight: 700
        },
        '@media (max-width: 540px)' : {
            marginTop: '20px',
            marginBottom: '20px'
        }
    },
});

export default styles;