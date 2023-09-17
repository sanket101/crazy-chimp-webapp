import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    customerInformationSectionWrapper: {
        // padding: '30px',
        color: '#f7f7f7 !important',
        '& .MuiInputBase-input': {
            color: CSSConstants.FONT_BLACK,
            backgroundColor: "white"
        },
        '& .MuiPaper-root': {
            backgroundColor: `${CSSConstants.BACKGROUND_PRIMARY} !important`
        },
        '& .MuiCardContent-root': {
            color: CSSConstants.FONT_PRIMARY,
            width: '400px',
            '@media (max-width: 540px)': {
                width: 'auto'            }
        },
        '& .MuiButton-outlined': {
            border: `1px solid ${CSSConstants.FONT_SECONDARY}`
        }
    },
    addressWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '20px 0px'
    },
    textFieldCss: {
        margin: '20px',
        width: '40%',
        '@media (max-width: 540px)': {
            width: '100%',
            margin: '5px 0px'
        }
    },
    subHeading:{
        padding: '10px 0px'
    },
    dropdownWidgetWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    inputLabel: {
        color: `${CSSConstants.FONT_PRIMARY} !important`
    },
    dropdownWidget: {
        margin: '20px',
        width: '40%',
        '& .MuiSelect-icon': {
            color: CSSConstants.FONT_BLACK
        },
        '@media (max-width: 540px)': {
            width: '100%',
            margin: '5px 0px'
        }
    },
    selectLabel: {
        color: CSSConstants.FONT_PRIMARY,
        backgroundColor: CSSConstants.BACKGROUND_PRIMARY,
        width: '100%',
        padding: '5px',
        margin: '10px 0',
        height: '50px'
    },
    addNewButtonWrapper: {
        textAlign: 'right',
        margin: '20px 0'
    },
    addressButtonContainer : {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        margin: '20px 0'
    },
    addressCardWrapper: {
        width: '100%',
        margin: '10px 0',
        backgroundColor: CSSConstants.BACKGROUND_SECONDARY,
        // border: `1px solid ${CSSConstants.FONT_SECONDARY}`,
        '& .card-action-section': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    }
});

export default styles;