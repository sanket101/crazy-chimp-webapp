import CSSConstants from '../../constants/css-constants';

const styles = (theme) => ({
    tableWrapper: {
        '& .MuiPaper-root': {
            color: CSSConstants.FONT_SECONDARY,
            backgroundColor: 'transparent'
        },
        '& .MuiTableCell-head': {
            color: CSSConstants.FONT_SECONDARY
        },
        '& .MuiTableCell-body': {
            color: CSSConstants.FONT_SECONDARY
        }
    }
});

export default styles;