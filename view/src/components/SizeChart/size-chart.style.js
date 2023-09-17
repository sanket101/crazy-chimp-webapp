import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    tableWrapper: {
        '& .MuiPaper-root': {
            color: CSSConstants.FONT_PRIMARY,
            backgroundColor: 'transparent'
        },
        '& .MuiTableCell-head': {
            color: CSSConstants.FONT_PRIMARY
        },
        '& .MuiTableCell-body': {
            color: CSSConstants.FONT_PRIMARY
        }
    }
});

export default styles;