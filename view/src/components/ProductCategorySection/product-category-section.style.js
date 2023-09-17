import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    productCategorySectionWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_PRIMARY,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 40px',
        textAlign: 'center',
        '@media (max-width: 540px)': {
            flexDirection: 'column',
            padding: '16px 20px',
        }
    },
    buttonSectionWrapper: {
        width: '15%'
    },
    textContentWrapper: {
        width: '25%',
        color: CSSConstants.FONT_PRIMARY,
    },
    imageSectionWrapper: {
        display: "flex"
    },
    shopNowButton: {
        margin: '12px 0',
        padding: '10px 20px',
        minHeight: '50px',
        backgroundColor: CSSConstants.HIGHLIGHTER,
        color: CSSConstants.FONT_PRIMARY,
        '& span' : {
            fontWeight: 700
        },
        '@media (max-width: 540px)' : {
            // marginTop: '310px',
            marginBottom: '20px'
        }
    },
    productCategoriesButton: {
        margin: '12px 0',
        padding: '10px 20px',
        minHeight: '50px',
        backgroundColor: CSSConstants.FONT_SECONDARY,
        color: CSSConstants.FONT_PRIMARY,
        width: '100%',
        '& span' : {
            fontWeight: 700
        },
        '@media (max-width: 540px)' : {
            //marginTop: '310px',
            marginBottom: '20px'
        }
    },
    productCategoriesButtonActive: {
        margin: '12px 0',
        padding: '10px 20px',
        minHeight: '50px',
        backgroundColor: CSSConstants.HIGHLIGHTER,
        color: CSSConstants.FONT_PRIMARY,
        width: '100%',
        '& span' : {
            fontWeight: 700
        },
        '@media (max-width: 540px)' : {
            // marginTop: '310px',
            marginBottom: '20px'
        }
    },
    hideForMobile: {
        '@media (max-width: 540px)': {
            display: 'none'
        }
    },
    hideForDesktop: {
        '@media (min-width: 540px)': {
            display: 'none'
        }
    },
    productCategorySectionWrapperForMobile :{
        backgroundColor: CSSConstants.BACKGROUND_PRIMARY,
        padding: '16px 20px',
        textAlign: 'center',
        '& .MuiInputBase-root': {
            width: '100%',
            color: CSSConstants.FONT_PRIMARY,
            border:`1px solid ${CSSConstants.HIGHLIGHTER}`,
            padding: '5px',
            backgroundColor: CSSConstants.HIGHLIGHTER
        }
    },
    headerMargin: {
        marginBottom: '20px',
        color: CSSConstants.FONT_SECONDARY,
    },
    influencerImgWrapper: {
        marginTop: '1rem'
    }
});

export default styles;