import CSSConstants from '../../constants/css-constants';

const styles = (themes) => ({
    productListWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_PRIMARY,
        minHeight: '100vh',
        paddingTop: '110px',
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
            // flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'space-between'
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
        },
        '& .MuiSelect-selectMenu': {
            backgroundColor: CSSConstants.FONT_PRIMARY,
            color: CSSConstants.FONT_BLACK,
            padding: '5px'
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
            color: CSSConstants.FONT_PRIMARY,
            backgroundColor: CSSConstants.FONT_SECONDARY
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
    scrollToTop: {
        textAlign: 'center',
        position: 'fixed',
        zIndex: '1',
        left: '10px',
        top: '75%',
        '& .MuiFab-extended': {
            padding: '0px'
        },
        '& .MuiFab-label': {
            fontSize: '0.6rem'
        },
    },
    hideForDesktop: {
        textAlign: 'center',
        position: 'fixed',
        zIndex: '1',
        left: '10px',
        top: '85%',
        '& .MuiButton-outlined': {
            border: `1px solid ${CSSConstants.FONT_PRIMARY}`
        },
        '& .MuiButton-root': {
            color: CSSConstants.FONT_PRIMARY
        },
        '& .MuiFab-extended': {
            padding: '0px'
        },
        '& .MuiFab-label': {
            fontSize: '0.6rem'
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
    },
    marketingWrapper: {
        margin: '0px 0.5rem',
        padding: "5px 10px",
        border: `1px solid ${CSSConstants.FONT_SECONDARY}`,
        display: "flex",
        '@media (max-width: 540px)' : {
			flexDirection: 'column'
		}
    }
});

export default styles;