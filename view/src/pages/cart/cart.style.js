import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    cartWrapper: {
        backgroundColor: '#161616',
        minHeight: '100vh',
        padding: '120px 80px',
        color: '#f7f7f7',
        '@media (max-width: 540px)': {
            padding: '120px 30px',
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
        margin: '20px 0',
        padding: '10px 20px',
        minHeight: '50px',
        '& span' : {
            fontWeight: 700
        },
        '@media (max-width: 540px)': {
            width: '100%',
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
    }
});

export default styles;