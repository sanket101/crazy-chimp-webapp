import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    cardWrapper: {
        height: 'fit-content',
        maxWidth: '350px',
        margin: '20px',
        '@media (max-width: 540px)': {
            margin: '20px 0'
        }
    },
    cardContent: {
        backgroundColor: CSSConstants.BACKGROUND_PRIMARY,
        color: CSSConstants.FONT_PRIMARY
    }
});

export default styles;