import CSSConstants from '../../constants/css-constants';

const styles = (themes) => ({
    sectionWrapper: {
        width: "50%",
        backgroundColor: CSSConstants.BACKGROUND_HIGHLIGHT,
        padding: '10px',
        '& .MuiTypography-h6': {
            color: CSSConstants.FONT_PRIMARY
        },
        '& .MuiTypography-subtitle1': {
            color: CSSConstants.FONT_SECONDARY
        },
        '@media (max-width: 540px)' : {
            width: '100%',
            flexDirection: "column",
            padding: '0px'
        }
    },
    shopNowButton: {
        padding: '10px 20px',
        minHeight: '50px',
        backgroundColor: CSSConstants.FONT_SECONDARY,
        color: CSSConstants.FONT_PRIMARY,
        '& span' : {
            fontWeight: 700
        },
        '@media (max-width: 540px)' : {
            // marginTop: '310px',
            marginBottom: '20px'
        }
    },
    successSection: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        '@media (max-width: 540px)' : {
            flexDirection: 'column',
            marginBottom: "20px"
        }
    },
    giftCardWrapper: {
        textAlign: 'center'
    },
    hideForMobile: {
        '@media (max-width: 540px)' : {
			visibility: 'hidden',
            display: 'none'
		}
    },
    hideForDesktop: {
        '@media (min-width: 540px)' : {
			visibility: 'hidden',
            display: 'none'
		}
    },
    mobileGiftCardWrapper: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    subsection: {
        margin: '0 5px'
    },
    notoSerifFont: {
        fontFamily: "Noto Serif",
        fontWeight: "700"
    },
    unauthorizedBg: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default styles;