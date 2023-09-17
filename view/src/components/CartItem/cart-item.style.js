import CSSConstants from '../../constants/css-constants';

const styles = {
    hideForMobile: {
        '@media (max-width: 540px)' : {
			visibility: 'hidden',
            display: 'none'
		}
    },
    hideForDesktop: {
        '@media (min-width: 540px)' : {
			visibility: 'hidden',
            display: 'none'
		}
    },
    cartItemWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_PRIMARY,
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '20px 0',
        '@media (max-width: 540px)': {
           padding: '0px'
        } 
    },
    secondaryFont: {
        color: CSSConstants.FONT_SECONDARY
    },
    buttonWrapper: {
        '& .MuiButton-outlined': {
            border: `1px solid ${CSSConstants.FONT_PRIMARY}`
        },
        '& .MuiButton-root': {
            color: CSSConstants.FONT_SECONDARY
        }
    },
    removeIconButton: {
        '& .MuiIconButton-root': {
            color: CSSConstants.FONT_PRIMARY
        }
    },
    cartItemAttribute: {
        padding: '12px 0',
        flex: "1",
        '@media (max-width: 540px)': {
            padding: '12px'
         } 
    }
};

export default styles;