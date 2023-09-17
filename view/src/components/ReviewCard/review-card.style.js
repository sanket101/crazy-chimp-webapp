import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    reviewCardWrapper: {
        minHeight: "170px",
        padding: "1rem",
        background: CSSConstants.BACKGROUND_SECONDARY,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderBottom: `1px solid ${CSSConstants.FONT_SECONDARY}`,
        margin: "0.5rem",
        '& .MuiRating-readyOnly': {
            color: `${CSSConstants.FONT_PRIMARY} !important`,
            fontSize: '1.2rem !important'
        },
        '& .MuiRating-iconEmpty': {
            color: `${CSSConstants.FONT_PRIMARY} !important`
        }
    },
    reviewCardImgWrapper: {
        padding: "0.5rem"
    },
    reviewCardContentSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    }
});

export default styles;