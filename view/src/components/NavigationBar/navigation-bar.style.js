import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: CSSConstants.BACKGROUND_PRIMARY
	},
	toolBar: {
		display: 'flex',
		justifyContent: 'space-between'
    },
    leftNavbar: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    },
	rightNavbar: {
		display: 'flex',
		alignItems: 'center'
	},
	navigationTypographyH6: {
		margin: '0 10px',
        color: CSSConstants.FONT_PRIMARY,
        cursor: 'pointer'
	},
	navigationIconButton: {
		color: CSSConstants.FONT_PRIMARY,
		'& .MuiButton-root': {
			color: CSSConstants.FONT_PRIMARY,
		},
		'& .MuiButton-outlined': {
			border: `1px solid ${CSSConstants.FONT_PRIMARY}`
		}
	},
	hideForDesktop: {
		'@media (min-width: 540px)' : {
			visibility: 'hidden'
		}
	},
	hideForMobile: {
		'@media (max-width: 540px)' : {
			visibility: 'hidden'
		}
	}
});

export default styles;