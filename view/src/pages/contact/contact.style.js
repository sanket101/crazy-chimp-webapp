import CSSConstants from "../../constants/css-constants";

const styles = (theme) => ({
    pageWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_SECONDARY,
        minHeight: '100vh',
        textAlign: 'center',
        color: CSSConstants.FONT_SECONDARY,
        // padding: '80px 30px',
        // display: 'flex',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        padding: '80px 30px'
    },
    fontPrimary: {
        color: `${CSSConstants.FONT_PRIMARY} !important`,
        '& .Mui-selected': {
            color: `${CSSConstants.FONT_SECONDARY} !important`,
            borderBottom: `2px solid ${CSSConstants.FONT_SECONDARY}`
        }
    }
});

export default styles;