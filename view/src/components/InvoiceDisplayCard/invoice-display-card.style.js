import CSSConstants from "../../constants/css-constants";

const styles = (theme) => ({
    invoiceCardWrapper: {
        margin: '1.5rem 0',
        '& .MuiPaper-root': {
            color: CSSConstants.FONT_SECONDARY,
            backgroundColor: CSSConstants.BACKGROUND_PRIMARY
        },
        '& .MuiDivider-root': {
            backgroundColor: CSSConstants.FONT_SECONDARY
        },
        '& .MuiCardContent-root': {
            padding: '0px'
        },
        '& .MuiCardActions-root': {
            '& .MuiIconButton-label': {
                color: CSSConstants.BACKGROUND_PRIMARY,
                backgroundColor: CSSConstants.FONT_PRIMARY
            }
        }
    },
    primaryFont: {
        color: CSSConstants.FONT_PRIMARY
    },
    secondaryFont: {
        color: CSSConstants.FONT_SECONDARY
    },
    invoiceDetails: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        margin: '10px'
    },
    shippingDetails: {
        margin: '10px',
        padding: '0px 10px'
    },
    sidePadding: {
        padding: '0px 10px'
    },
    dividerWrapper: {
        padding: '20px 0'
    },
    ordersWrapper: {
        margin: '10px 0'
    },
    orderWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        padding: '10px'
    },
    issueWrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    shopNowButton: {
        margin: '0 10px',
        padding: '10px 20px',
        minHeight: '50px',
        backgroundColor: CSSConstants.FONT_SECONDARY,
        color: CSSConstants.FONT_PRIMARY,        
        '& span' : {
            fontWeight: 700
        },
        '@media (max-width: 540px)' : {
            width: '40%',
            marginBottom: '20px'
        }
    },
    buttonWrapper: {
        textAlign: 'right',
        '@media (max-width: 540px)' : {
            textAlign: 'center'
        }
    },
    modalBoxWrapper: {
        margin: 'auto',
        padding: '1rem',
        position: 'absolute',
        top: '40%',
        left: '0',
        right: '0',
        // transform: 'translate(-50%, -50%)',
        width: '400px',
        backgroundColor: CSSConstants.FONT_PRIMARY,
        border: `2px solid ${CSSConstants.FONT_SECONDARY}`,
        textAlign: 'center',
        '@media (max-width: 540px)' : {
           top: '20%',
           margin: '0 1.5rem',
           width: 'auto'
        }
    },
    ratingWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    reviewSection: {
        margin: '0.5rem 0',
        padding: '1rem 0',
        border: `1px solid ${CSSConstants.FONT_SECONDARY}`,
    }
});

export default styles;