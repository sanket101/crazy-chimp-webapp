import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    cardWrapper: {
        height: 'fit-content',
        maxWidth: '250px',
        margin: '20px',
        '@media (max-width: 540px)': {
            margin: '20px 0'
        }
    },
    cardWrapperWithoutMaxWidth: {
        height: 'fit-content',
        margin: '20px',
        '@media (max-width: 540px)': {
            margin: '20px 0'
        }
    },
    cardContent: {
        backgroundColor: CSSConstants.BACKGROUND_PRIMARY,
        color: CSSConstants.FONT_PRIMARY
    },
    priceContent: {
        display: 'flex',
        '& .MuiTypography-body1': {
            marginRight: '10px'
        }
    }
});

export default styles;