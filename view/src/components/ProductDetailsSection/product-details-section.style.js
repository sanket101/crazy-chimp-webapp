import CSSConstants from '../../constants/css-constants';

const styles = (themes) => ({
    imageContainer: {
        padding: '30px'
    },
    productContainer: {
        color: CSSConstants.FONT_PRIMARY,
        padding: '30px'
    },
    inputLabel: {
        color: CSSConstants.FONT_PRIMARY
    },
    dropdownWidget: {
        margin: '15px 0',
        '& .MuiSelect-icon': {
            color: CSSConstants.FONT_PRIMARY
        }
    },
    selectLabel: {
        color: CSSConstants.FONT_SECONDARY,
        backgroundColor: CSSConstants.BACKGROUND_PRIMARY,
        width: '90px',
        padding: '5px',
        margin: '10px 0'
    },
    addToCartButton: {
        padding: '10px 20px',
        minHeight: '50px',
        width: '100%',
        '& span' : {
            fontWeight: 700
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
        paddingTop: '15px',
        '& .MuiButton-outlined': {
            border: `1px solid ${CSSConstants.FONT_PRIMARY}`
        },
        '& .MuiButton-root': {
            color: CSSConstants.FONT_SECONDARY
        }
    },
    qtyWrapper: {
        margin: '10px 0'
    },
    productFieldsWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    sizeChartWrapper: {
        padding: '20px 0'
    }
});

export default styles;