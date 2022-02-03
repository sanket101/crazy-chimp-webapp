import CSSConstants from "../../constants/css-constants";

const styles = (themes) => ({
    galleryWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_SECONDARY,
        minHeight: '100vh',
        padding: '80px 30px',
        textAlign: 'center',
        '& .adjust-height-desktop': {
            '& .MuiImageList-root': {
                '& li': {
                    height: '450px !important'
                }
            }
        },
        '@media (max-width: 540px)': {
            height: 'auto',
            '& .MuiImageList-root': {
                '& li': {
                    height: '300px !important',
                }
            },
        } 
    },
    hideForDesktop: {
		'@media (min-width: 540px)' : {
			visibility: 'hidden',
            display: 'none'
		}
	},
	hideForMobile: {
		'@media (max-width: 540px)' : {
			visibility: 'hidden',
            display: 'none'
		}
	},
    headerFont: {
        color: CSSConstants.FONT_PRIMARY,
        margin: '15px 0'
    }
});

export default styles;