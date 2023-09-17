import CSSConstants from '../../constants/css-constants';

const styles = (themes) => ({
    footerWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_SECONDARY,
        color: CSSConstants.FONT_PRIMARY,
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'center',
        height: 'auto',
        padding: '30px 20px',
        '@media (max-width: 540px)': {
            flexDirection: 'column',
            alignItems: 'center'
        }
    },
    socialMediaIconWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        '@media (max-width: 540px)': {
            flexDirection: 'row',
            width: '100%'
        }
    },
    multiSectionWrapper: {
        '& div': {
            marginRight: "8px" 
        },
        '& .MuiTypography-caption' : {
            cursor: "pointer"
        },
        '@media (max-width: 540px)': {
            display: 'flex',
            // justifyContent: 'space-around'
        }
    },
    footerLinks: {
        paddingTop: '20px'
    },
    footerLinkSection: {
        display: 'flex',
        justifyContent: 'space-between',
        '@media (max-width: 540px)': {
            flexDirection: 'column',
            alignItems: 'center'
        }
    },
    footerLink: {
        padding: '10px',
        color: CSSConstants.FONT_SECONDARY
    },
    logoWrapper: {
        width: '15%',
        display: 'flex',
        alignItems: 'center',
        '@media (max-width: 540px)': {
            width: '100%',
            justifyContent: 'center'
        }
    },
    footerLinkSectionWrapper: {
        width: '70%',
        '@media (max-width: 540px)': {
            width: '100%'
        }
    },
    emailWrapper: {
        color: CSSConstants.FONT_SECONDARY,
        '@media (max-width: 540px)': {
            fontSize: '1.25rem'
        }
    },
    footerSubsection: {
        textAlign: 'left',
        '@media (max-width: 540px)': {
            textAlign: 'left',
            width: '100%',
            margin: '0.5rem 0'
        }
    },
    secondaryFont: {
        color: CSSConstants.FONT_SECONDARY
    },
    hrHighlight: {
        '& hr': {
            borderColor: CSSConstants.HIGHLIGHTER
        }
    }
});

export default styles;