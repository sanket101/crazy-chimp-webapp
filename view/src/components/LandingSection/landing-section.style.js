
import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    '@global': {
    '@keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
      '@-moz-keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
      '@-webkit-keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
      
      '@-o-keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
      
      '@-ms-keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    },
    background: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
        justifyContent: 'center',
        backgroundColor: CSSConstants.BACKGROUND_SECONDARY,
        animation: `fadeIn 5s`,
        '-webkit-animation': `fadeIn 5s`,
        '-moz-animation': `fadeIn 5s`,
        '-o-animation': `fadeIn 5s`,
        '-ms-animation': `fadeIn 5s`,
        '& img': {
            width: 'inherit',
            minHeight: '100vh'
        },
        '@media (max-width: 540px)' : {
            alignItems: 'center',

            '& img': {
                minHeight: 'auto'
            }
        }
    },
    titleSection : {
        textAlign: 'center',
        padding: '130px 16px',
        zIndex: '1',
        position: 'absolute',
        marginLeft: '5%',
        width: '450px',

        '@media (max-width: 540px)' : {
            padding: '0px 16px',
            marginLeft: '0',
            marginTop: '60px',
            width: '250px',
        }
    },
    headingVariationH2: {
        fontWeight: '800',
        fontSize: '5rem',
        color: CSSConstants.FONT_PRIMARY,
        '@media (max-width: 540px)' : {
            fontSize: '2.25rem',
            marginBottom: '10px'
        }
    },
    headingVariationH4: {
        color: CSSConstants.FONT_PRIMARY,
        margin: '35px 0',
        '@media (max-width: 540px)' : {
            margin: '0',
            fontSize: '1.25rem'
        }
    },
    shopNowButton: {
        padding: '10px 20px',
        minHeight: '50px',
        backgroundColor: CSSConstants.LANDING_PAGE_HIGHLIGHTER,
        '& span' : {
            fontWeight: 700
        },
        '@media (max-width: 540px)' : {
            marginTop: '310px',
            marginBottom: '20px'
        }
    },
    landingPageHighlighter: {
        color: CSSConstants.LANDING_PAGE_HIGHLIGHTER
    }
});

export default styles;
 