import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    weeklyDropWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: CSSConstants.BACKGROUND_HIGHLIGHT,
        '@media (max-width: 540px)': {
            flexDirection: "column",
            alignItems: "center"
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
    weeklyDropContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "16px 20px"
    },
    primaryFont: {
        color: CSSConstants.FONT_PRIMARY
    },
    secondaryFont: {
        color: CSSConstants.FONT_SECONDARY,
        fontFamily: "Noto Serif",
        fontSize: "1.5rem"
    },
    hideForMobile: {
		'@media (max-width: 540px)' : {
			display: 'none'
		}
	},
    hideForDesktop: {
		'@media (min-width: 540px)' : {
			display: 'none'
		}
	},
});

export default styles;