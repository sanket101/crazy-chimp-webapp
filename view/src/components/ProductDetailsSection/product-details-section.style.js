import CSSConstants from '../../constants/css-constants';

const styles = (themes) => ({
    imageContainer: {
        // display: 'flex',
        padding: '1.5rem',
        // overflowX: "scroll",
        width: "60%",
        '@media (max-width: 540px)': {
            display: 'block',
            padding: '30px 10px',
            width: "100%"
        }
    },
    highlightedImageAttributes: {
        padding: '0.3rem 0.3rem',
        height: '70px',
        '@media (max-width: 540px)': {
            height: '70px'
        }
    },
    imageAttributes: {
        filter: 'brightness(50%)',
        padding: '0.3rem 0.3rem',
        height: '70px',
        '@media (max-width: 540px)': {
            height: '70px'
        }
    },
    focussedImageAttributes: {
        // height: '500px',
        width: "100%",
        '@media (max-width: 540px)': {
            width: '85%'
        }
    },
    multiImageContainer: {
        display: 'flex',
        justifyContent: 'center',
        overflowX: "scroll"
    },
    productContainer: {
        color: CSSConstants.FONT_PRIMARY,
        padding: '20px',
        flex: '2 1',
        width: "40%",
        '@media (max-width: 540px)': {
            width: '90%',
            padding: '0px 20px'
        }
    },
    inputLabel: {
        color: CSSConstants.FONT_PRIMARY
    },
    dropdownWidget: {
        // display: 'flex',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'space-between',
        // alignItems: 'center',
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
        width: '200px',
        padding: '5px',
        margin: '10px 0',
        border: `1px solid ${CSSConstants.FONT_PRIMARY}`,
        '@media (max-width: 540px)': {
            width: '150px'
        }
    },
    selectLabelError: {

    },
    addToCartButton: {
        padding: '10px 20px',
        minHeight: '50px',
        width: '100%',
        color: CSSConstants.FONT_PRIMARY,
        backgroundColor: CSSConstants.FONT_SECONDARY,
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
            color: CSSConstants.FONT_PRIMARY
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
        display: 'flex',
        fontSize: '1rem'
    },
    errorFont: {
        color: CSSConstants.ERROR
    },
    accordionWrapper: {
        '& .MuiAccordion-root': {
            backgroundColor: CSSConstants.BACKGROUND_SECONDARY
        },
        '& .MuiAccordionSummary-root': {
            color: CSSConstants.FONT_PRIMARY,
            borderBottom: `1px solid ${CSSConstants.FONT_SECONDARY}`
        },
        '& .MuiIconButton-label': {
            color: CSSConstants.FONT_PRIMARY
        },
        '& .MuiAccordionDetails-root': {
            color: CSSConstants.FONT_PRIMARY
        },
        '& .MuiListItemText-secondary': {
            color: CSSConstants.FONT_SECONDARY
        }
    },
    dropdownWidgetWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: "row"
    },
    focussedImageContainer: {
        textAlign: "center"
    }
});

export default styles;