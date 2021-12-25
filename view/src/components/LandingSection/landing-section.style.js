import background from '../../assets/bg.jpg';
import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    background: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        '@media (max-width: 540px)' : {
            height: '150vh',
        }
    },
    titleSection : {
        textAlign: 'center',
        padding: '0 16px'
    },
    headingVariationH2: {
        fontWeight: '600',
        color: CSSConstants.FONT_PRIMARY
    },
    headingVariationH4: {
        color: CSSConstants.FONT_PRIMARY,
        margin: '15px 0'
    },
    shopNowButton: {
        padding: '10px 20px',
        minHeight: '50px',
        '& span' : {
            fontWeight: 700
        }
    }
});

export default styles;
