import CSSConstants from '../../constants/css-constants';

const styles = (themes) => ({
    imageContainer: {
        display: 'block',
        padding: '30px'
    },
    imageAttributes: {
        height: '500px',
        '@media (max-width: 540px)': {
            height: '350px'
        }
    },
    productContainer: {
        color: CSSConstants.FONT_PRIMARY,
        padding: '30px'
    },
    inputLabel: {
        color: CSSConstants.FONT_PRIMARY
    },
    dropdownWidget: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '15px 0',
        '& .MuiSelect-icon': {
            color: CSSConstants.FONT_PRIMARY
        },
        '& .MuiFormHelperText-root': {
            color: CSSConstants.ERROR
        }
    },
    selectLabel: {
        color: CSSConstants.FONT_SECONDARY,
        backgroundColor: CSSConstants.BACKGROUND_PRIMARY,
        width: '220px',
        padding: '5px',
        margin: '10px 0'
    },
    selectLabelError: {

    },
    addToCartButton: {
        padding: '10px 20px',
        minHeight: '50px',
        width: '100%',
        '& span' : {
            fontWeight: 700
        }
    },
    addToCartButtonWrapper: {
        '& .MuiButton-contained.Mui-disabled': {
            backgroundColor: CSSConstants.FONT_SECONDARY
        }
    },
    viewCartButtonWrapper: {
        margin: '10px 0',
        '& .MuiButton-outlined': {
            border: `1px solid ${CSSConstants.FONT_PRIMARY}`
        },
        '& .MuiButton-root': {
            color: CSSConstants.FONT_PRIMARY
        }
    },
    secondaryFont: {
        color: CSSConstants.FONT_SECONDARY
    },
    dividerWrapper: {
        padding: '20px 0',
        '& .MuiDivider-root': {
            backgroundColor: CSSConstants.FONT_PRIMARY
        }
    },
    buttonWrapper: {
        '& .MuiButton-outlined': {
            border: `1px solid ${CSSConstants.FONT_PRIMARY}`
        },
        '& .MuiButton-root': {
            color: CSSConstants.FONT_SECONDARY
        }
    },
    qtyWrapper: {
        margin: '20px 0',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    // productFieldsWrapper: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     justifyContent: 'space-between'
    // },
    sizeChartWrapper: {
        padding: '20px 0'
    },
    priceWrapper: {
        display: 'flex'
    },
    errorFont: {
        color: CSSConstants.ERROR
    }
});

export default styles;