import CSSConstants from '../../constants/css-constants';
const drawerWidth = 240;
const styles = (theme) => ({
    accountWrapper: {
        backgroundColor: CSSConstants.BACKGROUND_SECONDARY,
        minHeight: '100vh',
        padding: '80px 120px',
        '@media (max-width: 540px)': {
            height: 'auto',
            padding: '80px 30px',
        }
    },
    primaryFont: {
        color: CSSConstants.FONT_PRIMARY
    },
    drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
    toolbar: theme.mixins.toolbar,
    avatar: {
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0,
		marginTop: 20
	},
});

export default styles;