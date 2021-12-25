import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    customerInformationSectionWrapper: {
        padding: '30px',
        color: '#f7f7f7 !important',
        '& .MuiInputBase-input': {
            color: CSSConstants.FONT_SECONDARY
        }
    },
    textFieldCss: {
        margin: '20px',
        width: '40%',
        '@media (max-width: 540px)': {
            width: '100%',
            margin: '20px 0px'
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
        color: CSSConstants.FONT_PRIMARY
    },
    dropdownWidget: {
        margin: '20px',
        width: '40%',
        '& .MuiSelect-icon': {
            color: CSSConstants.FONT_PRIMARY
        },
        '@media (max-width: 540px)': {
            width: '100%',
            margin: '20px 0px'
        }
    },
    selectLabel: {
        color: CSSConstants.FONT_SECONDARY,
        backgroundColor: CSSConstants.BACKGROUND_PRIMARY,
        width: '100%',
        padding: '5px',
        margin: '10px 0',
        height: '50px'
    },
});

export default styles;