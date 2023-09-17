import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    cardWrapper: {
        height: 'fit-content',
        maxWidth: '250px',
        margin: '20px',
        '@media (max-width: 540px)': {
            margin: '5px 0',
            maxWidth: '160px',
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
        color: CSSConstants.FONT_PRIMARY,
        '@media (max-width: 540px)': {
            '& .MuiTypography-h5': {
               fontSize: '1rem'
            },
            '& .MuiTypography-body1': {
                fontSize: '0.8rem'
            }
        }
    },
    priceContent: {
        display: 'flex',
        justifyContent: 'center',
        '& .MuiTypography-body1': {
            marginRight: '10px'
        }
    }
});

export default styles;