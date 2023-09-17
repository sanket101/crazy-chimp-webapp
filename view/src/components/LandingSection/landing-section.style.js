
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
        alignItems: 'center',
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
        // padding: '130px 16px',
        zIndex: '1',
        position: 'absolute',
        // marginLeft: '5%',
        // width: '450px',

        '@media (max-width: 540px)' : {
            padding: '0px 16px',
            marginLeft: '0',
            marginTop: '60px',
            // width: '250px',
        }
    },
    headingVariationH2: {
        fontWeight: '800',
        fontSize: '5rem',
        color: CSSConstants.FONT_SECONDARY,
        '@media (max-width: 540px)' : {
            fontSize: '2.25rem',
            marginBottom: '10px'
        }
    },
    headingVariationH4: {
        color: CSSConstants.FONT_SECONDARY,
        // margin: '35px 0',
        '@media (max-width: 540px)' : {
            margin: '0',
            fontSize: '1.25rem'
        }
    },

    headingVariationH6: {
        color: CSSConstants.FONT_SECONDARY,
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
    landingPageHighlighter: {
        color: CSSConstants.LANDING_PAGE_HIGHLIGHTER
    },
    discountButtonWrapper: {
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'space-evenly',
        '@media (max-width: 540px)' : {
            marginTop: '0px',
            display: 'block'
        }
    },
    sliderContainer: {
        position: 'relative',
        width: '100%',
        height: '100vh;', /* Adjust the height as needed */
        overflow: 'hidden',
        justifyContent: 'center', /* Center items horizontally */
        alignItems: 'center', /* Center items vertically */

        '& .slide': {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundSize: 'cover', /* This will make the image cover the entire slide element */
            backgroundPosition: 'center', /* Center the image within the slide */
            opacity: '0',
            transition: 'opacity 0.5s ease-in-out',
        },

        '& .slideDesktop': {
            flex: '1 0 25%', /* Display 4 slides in one row */
            height: '100%',
            backgroundSize: 'cover', /* This will make the image cover the entire slide element */
            backgroundPosition: 'center', /* Center the image within the slide */
            opacity: '0',
            transition: 'opacity 0.5s ease-in-out'
        },
          
        '& .slide.active, & .slideDesktop.active': {
            opacity: '1'
        }
    },
    fixedButton: {
        position: 'absolute',
        textAlign: 'center',
        bottom: '20px', /* Adjust the top position as needed */
        zIndex: '1' /* Ensure the button is above the slider */,
    },
    slider: {
        position: 'relative', /* Ensure the slider content is positioned relative to the container */
        width: '100%',
        height: '100%'
    },
    sliderDesktop: {
        position: 'relative', /* Ensure the slider content is positioned relative to the container */
        width: '100%',
        height: '100%',
        display: 'flex'
    },
    fixedButtonsContainer: {
        position: "absolute",
        // top: 50%; /* Center the container vertically */
        left: "0",
        right: "0",
        bottom: "10%",
        // transform: translateY(-50%); /* Center the container vertically */
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    fixedButtonDesktop: {
        zIndex: '1' /* Ensure the button is above the slider */,
        margin: '0 5px', /* Add some spacing between the buttons */
    }
});

export default styles;
 