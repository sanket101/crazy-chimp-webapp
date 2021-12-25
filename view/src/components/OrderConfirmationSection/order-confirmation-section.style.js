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
            fill: CSSConstants.FONT_PRIMARY,
            fontSize: '50px'
        }
    },
    confirmationWrapper: {
        padding: '20px',
    },
    primaryFont: {
        color: CSSConstants.FONT_PRIMARY,
        margin: '20px 0'
    },
    secondaryFont: {
        color: CSSConstants.FONT_SECONDARY
    }
});

export default styles;