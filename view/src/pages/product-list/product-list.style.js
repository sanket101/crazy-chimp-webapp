import CSSConstants from '../../constants/css-constants';

const styles = (themes) => ({
    productListWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_SECONDARY,
        minHeight: '100vh',
        paddingTop: '80px',
        '@media (max-width: 540px)': {
            height: 'auto'
        } 
    },
    productListContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    productCategory: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1',
        padding: '30px',
        color: CSSConstants.FONT_PRIMARY
    },
    productList: {
        display: 'flex',
        flex: '5 1',
        padding: '30px',
        flexWrap: 'wrap',
        '@media (max-width: 540px)': {
            padding: '30px 20px',
            flexDirection: 'column',
            alignContent: 'center'
        }
    },
    selectWrapper: {
        color: CSSConstants.FONT_SECONDARY,
        '& .MuiFormLabel-root': {
            color: CSSConstants.FONT_PRIMARY,
            padding: '20px 0'
        },
        '& .MuiInputBase-root': {
            color: CSSConstants.FONT_SECONDARY
        },
        '& .MuiSelect-icon': {
            color: CSSConstants.FONT_SECONDARY
        },
        '& .MuiInput-underline:before': {
            borderBottom: `1px solid ${CSSConstants.FONT_SECONDARY}`
        }
    },
    selectWrapperMobile: {
        color: CSSConstants.FONT_SECONDARY,
        '& .MuiFormLabel-root': {
            color: CSSConstants.FONT_BLACK,
            padding: '20px 0'
        }
    },
    buttonWrapper: {
        paddingTop: '20px',
        '& .MuiButton-outlined': {
            border: `1px solid ${CSSConstants.FONT_PRIMARY}`
        },
        '& .MuiButton-root': {
            color: CSSConstants.FONT_PRIMARY
        }
    },
    buttonWrapperMobile: {
        paddingTop: '20px',
        '& .MuiButton-outlined': {
            border: `1px solid ${CSSConstants.FONT_BLACK}`
        },
        '& .MuiButton-root': {
            color: CSSConstants.FONT_BLACK
        }
    },
    hideForDesktop: {
        textAlign: 'center',
        position: 'fixed',
        zIndex: '1',
        marginLeft: '33.33%',
        marginTop: '-40px',
        '& .MuiButton-outlined': {
            border: `1px solid ${CSSConstants.FONT_PRIMARY}`
        },
        '& .MuiButton-root': {
            color: CSSConstants.FONT_PRIMARY
        },
		'@media (min-width: 540px)' : {
			display: 'none'
		}
	},
	hideForMobile: {
        flex: '1 1',
		'@media (max-width: 540px)' : {
			display: 'none'
		}
	},
    fixedPosition: {
        position: 'fixed'
    },
    noProductsFound: {
        color: CSSConstants.FONT_PRIMARY
    }
});

export default styles;