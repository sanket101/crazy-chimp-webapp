import CSSConstants from "../../constants/css-constants";

const styles = (theme) => ({
    invoiceCardWrapper: {
        margin: '20px',
        '& .MuiPaper-root': {
            color: CSSConstants.FONT_SECONDARY,
            backgroundColor: CSSConstants.BACKGROUND_PRIMARY
        },
        '& .MuiDivider-root': {
            backgroundColor: CSSConstants.FONT_SECONDARY
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
    }
});

export default styles;