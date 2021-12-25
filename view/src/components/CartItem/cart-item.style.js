import CSSConstants from '../../constants/css-constants';

const styles = {
    cartItemWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_PRIMARY,
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: '20px 0',
        '@media (max-width: 540px)': {
            flexDirection: 'column'
        } 
    },
    secondaryFont: {
        color: CSSConstants.FONT_SECONDARY
    },
    buttonWrapper: {
        '& .MuiButton-outlined': {
            border: `1px solid ${CSSConstants.FONT_PRIMARY}`
        },
        '& .MuiButton-root': {
            color: CSSConstants.FONT_SECONDARY
        }
    },
    removeIconButton: {
        '& .MuiIconButton-root': {
            color: CSSConstants.FONT_PRIMARY
        }
    },
    cartItemAttribute: {
        padding: '12px 0'
    }
};

export default styles;