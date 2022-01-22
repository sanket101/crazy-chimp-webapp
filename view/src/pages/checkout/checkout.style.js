import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    checkoutWrapper: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#161616',
        minHeight: '100vh',
        padding: '120px 80px',
        '@media (max-width: 540px)': {
            padding: '80px 20px',
            flexWrap: 'wrap'
        }
    },
    multiStep: {
        padding: '30px',
        flex: '4 1',
        '& .MuiPaper-root': {
            backgroundColor: CSSConstants.BACKGROUND_SECONDARY
        },
        '& .MuiStepIcon-text': {
            fill: CSSConstants.FONT_BLACK 
        },
        '& .MuiStepIcon-root': {
            color: CSSConstants.FONT_SECONDARY
        },
        '& .MuiStepLabel-label': {
            color: CSSConstants.FONT_SECONDARY
        },
        '& .MuiStepIcon-root.MuiStepIcon-active': {
            color: CSSConstants.FONT_PRIMARY
        },
        '& .MuiStepLabel-label.MuiStepLabel-active': {
            color: CSSConstants.FONT_PRIMARY
        },
        '& .MuiFormLabel-root': {
            color: CSSConstants.FONT_SECONDARY
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: CSSConstants.FONT_SECONDARY
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: CSSConstants.FONT_PRIMARY
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: CSSConstants.FONT_HIGHLIGHT
        },
        '& .MuiButton-root': {
            color: CSSConstants.FONT_PRIMARY
        }
    },
    dividerWrapper: {
        padding: '20px 0',
        '& .MuiDivider-root': {
            backgroundColor: CSSConstants.FONT_PRIMARY
        }
    },
    shoppingCart: {
        padding: '30px',
        flex: '2 1',
        borderLeft: `1px solid ${CSSConstants.FONT_SECONDARY}`,
        color: CSSConstants.FONT_PRIMARY,
        '@media (max-width: 540px)': {
            borderLeft: 'none'
        }
    },
    shoppingCartHeading: {
        padding: '15px 0', 
    },
    shoppingCartItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: CSSConstants.FONT_SECONDARY
    },
    shoppingCartItemLeft: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    shoppingCartItemProductInfo: {
        marginLeft: '20px'
    },
    discountWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        '& .MuiFormLabel-root': {
            color: CSSConstants.FONT_SECONDARY
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: CSSConstants.FONT_SECONDARY
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: CSSConstants.FONT_PRIMARY
        },
        '& .MuiInputBase-input': {
            color: CSSConstants.FONT_SECONDARY
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#8fcaf9'
        },
    },
    textFieldCss: {
        marginRight: '20px',
        width: '60%',
        '@media (max-width: 540px)': {
            width: '100%',
            margin: '20px 0px'
        }
    },
});

export default styles;