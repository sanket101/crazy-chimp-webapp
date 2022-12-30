import React, { useState } from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './add-discount.style';
import { Container, CssBaseline, Avatar, Typography, Grid, TextField, Button, CircularProgress, FormControl, FormLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, FormHelperText, Snackbar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/Add';
import ValidationError from "../../../constants/validation-errors";
import { authMiddleWare } from "../../../utils/auth";
import { useHistory } from "react-router-dom";
import apiConfig from "../../../api/api-config";
import axios from "axios";
import { handleApiError } from "../../../utils/error-handling";
import MuiAlert from '@mui/material/Alert';
import PRODUCT_TYPE from "../../../constants/product-constants";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DISCOUNT_TYPES = ['FLAT', 'PERCENT', 'PERPRODUCT'];

const AddDiscount = (props) => {
    const { classes } = props;
    const [code, setCode] = useState('');
    const [description , setDescription] = useState('');
    const [discount, setDiscount] = useState('');
    const [discountType, setDiscountType] = useState('');
	const [productType, setProductType] = useState('');
    const [validFrom, setValidFrom] = useState('');
    const [validUntil, setValidUntil] = useState('');
    const [frequencyPerUser, setFrequencyPerUser] = useState('');
    const [cartMinValue, setCartMinValue] = useState('');
    const [cartMaxValue, setCartMaxValue] = useState('');
    const [cartMinItems, setCartMinItems] = useState('');
    const [cartMaxItems, setCartMaxItems] = useState('');
    const [loading, setLoading] = useState(false);
	const [showGenericError, setGenericError] = useState(false);
    const [discountAdded, setDiscountAdded] = useState(false);

    let history = useHistory();

    const addDiscountHandler = (event) => {
        event.preventDefault();
		setLoading(true);

        const isValid = checkDiscountDetails();

		if(!isValid) {
			setGenericError(true);
			setLoading(false);
		}
		else {
			setGenericError(false);
			callAddDiscountsApi();
			setLoading(false);
		}
    };

    const checkDiscountDetails = () => {
        if(!code || !description || !discount || !discountType || !validUntil || !validFrom) {
            return false;
        }

        if((discount && isNaN(discount)) || (frequencyPerUser && isNaN(frequencyPerUser)) || (cartMinValue && isNaN(cartMinValue)) || (cartMaxValue && isNaN(cartMaxValue)) || (cartMinItems && isNaN(cartMinItems)) || (cartMaxItems && isNaN(cartMaxItems))) {
            return false;
        }

		if(discountType && !productType) {
			return false;
		}

        return true;
    };

    const callAddDiscountsApi = async () => {
        try {
			authMiddleWare(history);
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };
			const requestPayload = {
				code : code.toUpperCase(),
                description,
                discount: +discount,
                discountType,
                isEnabled : true,
                validFrom,
                validUntil,
                frequencyPerUser : !frequencyPerUser ? 'NA' : +frequencyPerUser,
                cartMinValue: !cartMinValue ? 'NA' : +cartMinValue,
                cartMaxValue: !cartMaxValue ? 'NA' : +cartMaxValue,
                cartMinItems: !cartMinItems ? 'NA' : +cartMinItems,
                cartMaxItems: !cartMaxItems ? 'NA' : +cartMaxItems,
				productType
			};
			const response = await axios.post(apiConfig.addDiscount, requestPayload);
			if(response && response.data && response.data.id) {
				// Product added successfully
				setDiscountAdded(true);
				setCode('');
                setDescription('');
                setDiscount('');
                setDiscountType('');
				setProductType('');
                setValidFrom('');
                setValidUntil('');
                setFrequencyPerUser('');
                setCartMinValue('');
                setCartMaxValue('');
                setCartMinItems('');
                setCartMaxItems('');
			}
		}
		catch (err) {
			handleApiError(history, err);
		}
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setDiscountAdded(false);
    };

    return (
        <Container component="main" maxWidth="xs">
				<CssBaseline />
                <div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Add Discount
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>

							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="code"
									label="Discount Code"
									name="code"
									autoComplete="code"
                                    value={code}
									onChange={(event) => setCode(event.target.value)}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="description"
									label="Description"
									name="description"
									autoComplete="description"
                                    value={description}
									onChange={(event) => setDescription(event.target.value)}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="discount"
									label="Discount Amount"
									name="discount"
									autoComplete="discount"
                                    value={discount}
									onChange={(event) => setDiscount(event.target.value)}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FormControl component="fieldset" >
									<FormLabel component="legend">Discount Type</FormLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={discountType}
										label="Discount Type"
										onChange={(event) => setDiscountType(event.target.value)}
									>
										{
											DISCOUNT_TYPES.map((category, i) => {
												return (
													<MenuItem value={category}>{category}</MenuItem>
												);
											})
										}
									</Select>
								</FormControl>
							</Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    type="date" 
                                    label="Valid From" 
                                    variant="outlined" 
                                    value={validFrom} 
                                    onChange={(event) => setValidFrom(new Date(event.target.value).toISOString().split('T')[0])}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    type="date" 
                                    label="Valid Until" 
                                    variant="outlined" 
                                    value={validUntil} 
                                    onChange={(event) => setValidUntil(new Date(event.target.value).toISOString().split('T')[0])}
                                />
                            </Grid>

							<Grid item xs={12} sm={6}>
                                <TextField
									variant="outlined"
									required
									fullWidth
									id="cartMinValue"
									label="Minimum Cart Value"
									name="cartMinValue"
									autoComplete="cartMinValue"
                                    value={cartMinValue}
									onChange={(event) => setCartMinValue(event.target.value)}
								/>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
									variant="outlined"
									required
									fullWidth
									id="cartMaxValue"
									label="Maximum Cart Value"
									name="cartMaxValue"
									autoComplete="cartMaxValue"
                                    value={cartMaxValue}
									onChange={(event) => setCartMaxValue(event.target.value)}
								/>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
									variant="outlined"
									required
									fullWidth
									id="cartMinItems"
									label="Minimum Cart Items"
									name="cartMinItems"
									autoComplete="cartMinItems"
                                    value={cartMinItems}
									onChange={(event) => setCartMinItems(event.target.value)}
								/>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
									variant="outlined"
									required
									fullWidth
									id="cartMaxItems"
									label="Maximum Cart Items"
									name="cartMaxItems"
									autoComplete="cartMaxItems"
                                    value={cartMaxItems}
									onChange={(event) => setCartMaxItems(event.target.value)}
								/>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
									variant="outlined"
									required
									fullWidth
									id="frequencyPerUser"
									label="Frequency per user"
									name="frequencyPerUser"
									autoComplete="frequencyPerUser"
                                    value={frequencyPerUser}
									onChange={(event) => setFrequencyPerUser(event.target.value)}
								/>
                            </Grid>

							<Grid item xs={12} sm={6}>
								<FormControl component="fieldset" >
									<FormLabel component="legend">Product Type</FormLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={productType}
										label="Product Type"
										onChange={(event) => setProductType(event.target.value)}
									>
										{
											Object.keys(PRODUCT_TYPE).map((category, i) => {
												return (
													<MenuItem value={category}>{category}</MenuItem>
												);
											})
										}
									</Select>
								</FormControl>
                            </Grid>
						</Grid>
						{showGenericError && <Typography variant="body1">Please check again!</Typography>}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={addDiscountHandler}
                            disabled={!code || !description || !discountType || !discount || !validFrom || !validUntil}
						>
							Add Discount
							{loading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
					</form>
				</div>
                {discountAdded && <Snackbar open={discountAdded} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Discount Added!
                    </Alert>
                </Snackbar>}
        </Container>
    );
};

export default withStyles(styles)(AddDiscount);