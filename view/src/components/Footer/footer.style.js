import CSSConstants from '../../constants/css-constants';

const styles = (themes) => ({
    footerWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_SECONDARY,
        color: CSSConstants.FONT_PRIMARY,
        textAlign: 'center',
        height: 'auto',
        padding: '30px 20px'
    },
    footerLinks: {
        paddingTop: '20px'
    },
    footerLink: {
        padding: '10px',
        color: CSSConstants.FONT_SECONDARY
    }
});

export default styles;