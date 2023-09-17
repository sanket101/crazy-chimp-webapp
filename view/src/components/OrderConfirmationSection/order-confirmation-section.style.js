import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    boxWrapper: {
        border: `1px solid ${CSSConstants.FONT_SECONDARY}`,
        borderRadius: '20px',
        margin: '20px',
        padding: '20px',
        textAlign: 'center'
    },
    infoIconWrapper: {
        padding: '20px',
        '& .MuiSvgIcon-root': {
            fill: CSSConstants.FONT_BLACK,
            fontSize: '50px'
        }
    },
    confirmationWrapper: {
        padding: '20px',
    },
    primaryFont: {
        color: CSSConstants.FONT_BLACK,
        margin: '20px 0'
    },
    secondaryFont: {
        color: CSSConstants.FONT_SECONDARY
    },
    placeOrderButton: {
        padding: '10px 20px',
        minHeight: '50px',
        backgroundColor: CSSConstants.FONT_SECONDARY,
        color: CSSConstants.FONT_PRIMARY,
        '& span' : {
            fontWeight: 700
        }
    },
});

export default styles;