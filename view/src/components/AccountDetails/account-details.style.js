import CSSConstants from '../../constants/css-constants';

const styles = (themes) => ({
    accountDetailsWrapper: {
        color: '#f7f7f7 !important',
        '& .MuiInputBase-input': {
            color: CSSConstants.FONT_BLACK,
            backgroundColor: "white"
        },
        '& .MuiPaper-root': {
            backgroundColor: `${CSSConstants.BACKGROUND_PRIMARY} !important`
        },
        '& .MuiCardContent-root': {
            color: CSSConstants.FONT_PRIMARY
        },
        '& .MuiButton-outlined': {
            border: `1px solid ${CSSConstants.FONT_SECONDARY}`
        }
    },
    textFieldCss: {
        margin: '20px',
        width: '40%',
        '@media (max-width: 540px)': {
            width: '100%',
            margin: '5px 0px'
        }
    },
    shopNowButton: {
        padding: '10px 20px',
        minHeight: '50px',
        backgroundColor: CSSConstants.FONT_SECONDARY,
        color: CSSConstants.FONT_PRIMARY,
        '& span' : {
            fontWeight: 700
        },
        '@media (max-width: 540px)' : {
            // marginTop: '310px',
            marginBottom: '20px'
        }
    },
    buttonWrapper: {
        textAlign: "right",
        '@media (max-width: 540px)' : {
            textAlign: "center"
        }
    }
});

export default styles;