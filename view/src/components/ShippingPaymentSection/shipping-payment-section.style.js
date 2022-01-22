import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    boxWrapper: {
        border: `1px solid ${CSSConstants.FONT_SECONDARY}`,
        borderRadius: '20px',
        margin: '20px',
        padding: '20px'
    },
    dividerWrapper: {
        padding: '20px 0',
        '& .MuiDivider-root': {
            backgroundColor: CSSConstants.FONT_PRIMARY
        }
    },
    secondaryFont: {
        color: CSSConstants.FONT_SECONDARY
    },
    primaryFont: {
        color: CSSConstants.FONT_PRIMARY
    },
    highlightFont: {
        color: CSSConstants.FONT_HIGHLIGHT
    },
    customerInfoWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',

        '& .MuiRadio-root': {
            color: CSSConstants.FONT_PRIMARY
        },
        '& .MuiRadio-colorPrimary.Mui-checked': {
            color: CSSConstants.FONT_HIGHLIGHT
        },
        '& .MuiTypography-root.MuiFormControlLabel-label.MuiTypography-body1': {
            color: CSSConstants.FONT_PRIMARY
        }
    },
    paymentWrapper: {
        margin: '20px'
    },
    paymentDescription: {
        padding: '0 15px',
        '& .MuiTypography-colorPrimary': {
            color: CSSConstants.FONT_HIGHLIGHT
        }
    }
});

export default styles;