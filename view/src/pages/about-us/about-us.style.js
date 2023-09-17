import CSSConstants from "../../constants/css-constants";

const styles = (theme) => ({
    pageWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_SECONDARY,
        minHeight: '100vh',
        textAlign: 'center',
        color: CSSConstants.FONT_SECONDARY,
        // padding: '80px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '80px 30px'
    },
    rightWrapper: {
        textAlign: 'left',
        padding: '20px',
        backgroundColor: "#19191A",
        marginLeft: "-100px",
        opacity: "90%",
        '@media (max-width: 540px)': {
            marginLeft: "0px",
        }
    },
    aboutUsText: {
        color: CSSConstants.FONT_PRIMARY
    },
    subHeading: {
        color: CSSConstants.HIGHLIGHTER
    },
    hideForMobile: {
        '@media (max-width: 540px)': {
            display: 'none'
        }
    }
});

export default styles;