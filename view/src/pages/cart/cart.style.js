import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    cartWrapper: {
        backgroundColor: '#161616',
        minHeight: '100vh',
        padding: '120px 80px',
        color: '#f7f7f7',
        '@media (max-width: 540px)': {
            padding: '120px 15px',
        } 
    },
    cartItemsWrapper: {
        margin: '20px 0'
    },
    borderBottomNone: {
        borderBottom: 'none !important'
    },
    tableWrapper: {
        borderCollapse: 'collapse',
        margin: 'auto',
        width: '100%',
        '& tr' : {
            borderBottom: '1px solid #f7f7f7'
        },
        '& th, & td' : {
            padding: '15px 5px'
        }
    },
    tableDataTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tableDataCenter: {
        textAlign: 'center'
    },
    tableDataRight: {
        textAlign: 'right'
    },
    checkoutButton: {
        margin: '20px 10px',
        padding: '10px 20px',
        minHeight: '50px',
        color: CSSConstants.FONT_PRIMARY,
        backgroundColor: CSSConstants.FONT_SECONDARY,
        '& span' : {
            fontWeight: 700
        },
        '@media (max-width: 540px)': {
            width: '100%',
            margin: '10px 5px',
        }
    },
    clearCartButton: {
        margin: '20px 10px',
        padding: '10px 20px',
        minHeight: '50px',
        color: CSSConstants.FONT_SECONDARY,
        border: `1px solid ${CSSConstants.FONT_SECONDARY}`,
        '& span' : {
            fontWeight: 700
        },
        '@media (max-width: 540px)': {
            width: '100%',
            margin: '10px 0px',
        }
    },
    bottomNavigation: {
        padding: '10px 0',
        textAlign: 'right',

        '@media (max-width: 540px)': {
            textAlign: 'center',
        }
    },
    bottomNavigationLink: {
        color: '#f7f7f7',
        marginRight: '20px'
    },
    secondaryFont: {
        color: CSSConstants.FONT_SECONDARY
    },
    textAlignCenter: { textAlign: "center" },
    horizontalBar : {
        border: `1px solid ${CSSConstants.FONT_SECONDARY}`
    },
    bottomNavigationDesktop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: "20px"
    }
});

export default styles;