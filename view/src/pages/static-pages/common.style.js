import CSSConstants from "../../constants/css-constants";

const styles = (theme) => ({
    pageWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_SECONDARY,
        minHeight: '100vh',
        textAlign: 'center',
        color: CSSConstants.FONT_SECONDARY,
        padding: '80px 30px'
    },
    primaryFont: {
        color: CSSConstants.FONT_PRIMARY
    },
    leftAlignment: {
        textAlign: 'left'
    },
    listWrapper: {
        listStyle: 'disc'
    }
});

export default styles;