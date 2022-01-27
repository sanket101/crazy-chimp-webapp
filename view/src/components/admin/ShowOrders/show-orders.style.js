const styles = (theme) => ({
    paper: {
		marginTop: theme.spacing(10),
	},
    avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
    submit: {
		margin: theme.spacing(3, 0, 2)
	},
    invoiceList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: '10px'
    },
    dateWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline'
    },
    modalContentWrapper : {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        padding: '30px',
    },
    flexContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10px',
        margin: '10px 0'
    }
});

export default styles;