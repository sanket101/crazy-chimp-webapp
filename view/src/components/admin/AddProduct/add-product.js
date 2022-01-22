import React, { useState } from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './add-product.style';
import { Container, CssBaseline, Avatar, Typography, Grid, TextField, Button, CircularProgress, FormControl, FormLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, FormHelperText, Snackbar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/Add';
import ValidationError from "../../../constants/validation-errors";
import { authMiddleWare } from "../../../utils/auth";
import { useHistory } from "react-router-dom";
import apiConfig from "../../../api/api-config";
import axios from "axios";
import { handleApiError } from "../../../utils/error-handling";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defaultSizes = [{key: 'XS', selected: false}, {key: 'S', selected: false}, {key: 'M', selected: false}, {key: 'L', selected: false}, {key: 'XL', selected: false}, {key: '2XL', selected: false}, {key: '3XL', selected: false}, {key: '4XL', selected: false}];
const defaultColors = [{key: 'Navy Blue', selected: false}, {key: 'Black', selected: false}, {key: 'White', selected: false}, {key: 'Baby Blue', selected: false}, {key: 'Golden Yellow', selected: false}, {key: 'Iris Lavender', selected: false}, {key: 'Light Pink', selected: false}, {key: 'Maroon', selected: false}, {key: 'Melange Grey', selected: false}, {key: 'Mint Green', selected: false}, {key: 'Olive Green', selected: false}, {key: 'Red', selected: false}];

const AddProduct = (props) => {
    const { classes } = props;
	const [name, setName] = useState('');
	const [weightInGms, setWeightInGms] = useState('');
	const [actualPrice, setActualPrice] = useState('');
	const [salePrice, setSalePrice] = useState('');
	const [productCategory, setProductCategory] = useState('');
	const [genreCategory, setGenreCategory] = useState('');
	const [productCode, setProductCode] = useState('');
	const [sizes, setSizes] = useState(defaultSizes);
    const [colors, setColors] = useState(defaultColors);
	const [loading, setLoading] = useState(false);
	const [showGenericError, setGenericError] = useState(false);
	const [productAdded, setProductAdded] = useState(false);
	const [errorObject, setErrorObject] = useState({
        name: '',
        weightInGms: '',
        actualPrice: '',
        salePrice: '',
        productCode: '',
        productCategory: '',
        genreCategory: ''
    });
	
	let history = useHistory();

	const generateProductCode = () => {
		const productCodeGenerated = `${productCategory.toUpperCase()}_${genreCategory.toUpperCase()}_${name.toUpperCase()}_001`;
		setProductCode(productCodeGenerated);
	};

	const selectSizes = (index, checked) => {
		const newSizesArray = [...sizes];
		newSizesArray[index].selected = checked;
		setSizes(newSizesArray);
	};

	const selectColors = (index, checked) => {
		const newColorsArray = [...colors];
		newColorsArray[index].selected = checked;
		setColors(newColorsArray);
	};

	const addProductHandler = (event) => {
		event.preventDefault();
		setLoading(true);
		const isValid = checkProductDetails();

		if(!isValid) {
			setGenericError(true);
			setLoading(false);
		}
		else {
			setGenericError(false);
			callAddProductsApi();
			setLoading(false);
		}
	};

	const callAddProductsApi = async () => {
		try {
			authMiddleWare(history);
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };
			const requestPayload = {
				name,
				actualPrice,
				salePrice,
				productCode,
				productCategory,
				genreCategory,
				weightInGms,
				productDomain: 'INDIA',
				isAvailable: true,
				sizeAvailable : getSelectedSizes(),
				colorsAvailable: getSelectedColors(),
			};
			const response = await axios.post(apiConfig.addProduct, requestPayload);
			if(response && response.data && response.data.id) {
				// Product added successfully
				setProductAdded(true);
				setName('');
				setWeightInGms('');
				setActualPrice('');
				setSalePrice('');
				setProductCategory('');
				setGenreCategory('');
				setProductCode('');
				setSizes(prevState => {
					const newSizesArray = [...prevState];
					newSizesArray.map((size, i) => size.selected = false);
					return newSizesArray;
				});
				setColors(prevState => {
					const newColorsArray = [...prevState];
					newColorsArray.map((color, i) => color.selected = false);
					return newColorsArray;
				});
			}
		}
		catch (err) {
			handleApiError(history, err);
		}
	};

	const getSelectedSizes = () => {
		let result = [];
		for (let index = 0; index < sizes.length; index++) {
			const element = sizes[index];
			if(element.selected) {
				result.push(element.key);
			}
		}
		return result;
	};

	const getSelectedColors = () => {
		let result = [];
		for (let index = 0; index < colors.length; index++) {
			const element = colors[index];
			if(element.selected) {
				result.push(element.key);
			}
		}
		return result;
	}

    const onBlur = (key) => {
        if(key === "name") {
			if(!name && name.trim() === "") {
				setErrorObject(prevState => {
					return {...prevState, name: ValidationError.FIELD_INVALID}
				});
			}
			setErrorObject(prevState => {
				return {...prevState, name: ''}
			});
		}

		if(key === "weightInGms" || key === "actualPrice" || key === "salePrice") {
			const value = [key];
			if(!value && value.trim() === "") {
				setErrorObject(prevState => {
					return {...prevState, [key]: ValidationError.FIELD_LEFT_BLANK}
				});
			}
			if(isNaN(value)) {
				setErrorObject(prevState => {
					return {...prevState, [key]: ValidationError.FIELD_INVALID}
				});
			}
			setErrorObject(prevState => {
				return {...prevState, [key]: ''}
			});
		}
    }

	const checkProductDetails = () => {
		if(errorObject.name || errorObject.weightInGms || errorObject.actualPrice || errorObject.salePrice || errorObject.productCategory || errorObject.genreCategory) {
			return false;
		}
		if(!name || !weightInGms || !actualPrice || !salePrice || !productCategory || !genreCategory || !productCode) {
			return false;
		}

		//check if atleast one or more color/sizes selected
		let colorsSelected = colors.filter((color, i) => color.selected === true);
		let sizesSelected = sizes.filter((size, i) => size.selected === true);
		
		if(colorsSelected.length === 0 || sizesSelected.length === 0) {
			return false;
		}

		return true;
	};

	const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setProductAdded(false);
    };

    return (
        <Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Add Product
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="productName"
									label="Product Name"
									name="productName"
									autoComplete="productName"
                                    value={name}
									helperText={errorObject.name}
									error={errorObject.name ? true : false}
									onChange={(event) => setName(event.target.value)}
									onBlur={() => onBlur("name")}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="weightInGms"
									label="Weight in GMs"
									name="weightInGms"
									autoComplete="weightInGms"
                                    value={weightInGms}
									helperText={errorObject.weightInGms}
									error={errorObject.weightInGms ? true : false}
									onChange={(event) => setWeightInGms(event.target.value)}
									onBlur={() => onBlur("weightInGms")}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="actualPrice"
									label="Actual Price"
									name="actualPrice"
									autoComplete="actualPrice"
                                    value={actualPrice}
									helperText={errorObject.actualPrice}
									error={errorObject.actualPrice ? true : false}
									onChange={(event) => setActualPrice(event.target.value)}
									onBlur={() => onBlur("actualPrice")}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="salePrice"
									label="Sale Price"
									name="salePrice"
									autoComplete="salePrice"
                                    value={salePrice}
									helperText={errorObject.salePrice}
									error={errorObject.salePrice ? true : false}
									onChange={(event) => setSalePrice(event.target.value)}
									onBlur={() => onBlur("salePrice")}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FormControl component="fieldset" >
									<FormLabel component="legend">Product Category</FormLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={productCategory}
										label="Product Category"
										onChange={(event) => setProductCategory(event.target.value)}
									>
										{
											props.productCategories.map((category, i) => {
												return (
													<MenuItem value={category.code}>{category.displayName}</MenuItem>
												);
											})
										}
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={12} sm={6}>
								<FormControl component="fieldset" >
									<FormLabel component="legend">Genre Category</FormLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={genreCategory}
										label="Genre Category"
										onChange={(event) => setGenreCategory(event.target.value)}
									>
										{
											props.genreCategories.map((category, i) => {
												return (
													<MenuItem value={category.code}>{category.displayName}</MenuItem>
												);
											})
										}
									</Select>
								</FormControl>
							</Grid>

							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={generateProductCode}
								disabled={!name || !productCategory || !genreCategory}
							>
								Generate Code
							</Button>
							{<Typography variant="h6">{productCode}</Typography>}
							
							<Grid item xs={12}>
								<FormControl sx={{ m: 3 }} component="fieldset" variant="standard" className={classes.checkboxWrapper}>
									<FormLabel component="legend">Sizes Available</FormLabel>
									<FormGroup>
										{sizes.map((size, i) => {
											return (
												<FormControlLabel
													key={i}
													control={<Checkbox checked={size.selected} onChange={(event) => selectSizes(i, event.target.checked)} name={size.key} />}
													label={size.key}
												/>
											)
										})}
									</FormGroup>
									<FormHelperText>*Select all checkboxes which are applicable.</FormHelperText>
								</FormControl>
							</Grid>

							<Grid item xs={12}>
								<FormControl sx={{ m: 3 }} component="fieldset" variant="standard" className={classes.checkboxWrapper}>
									<FormLabel component="legend">Colors Available</FormLabel>
									<FormGroup>
										{colors.map((color, i) => {
											return (
												<FormControlLabel
													key={i}
													control={<Checkbox checked={color.selected} onChange={(event) => selectColors(i, event.target.checked)} name={color.key} />}
													label={color.key}
												/>
											)
										})}
									</FormGroup>
									<FormHelperText>*Select all checkboxes which are applicable.</FormHelperText>
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
							onClick={addProductHandler}
                            disabled={!name || !weightInGms || !actualPrice || !salePrice || !productCategory || !genreCategory || !productCode}
						>
							Add Product
							{loading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
					</form>
				</div>
				{productAdded && <Snackbar open={productAdded} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Product Added!
                    </Alert>
                </Snackbar>}
			</Container>
    );
};

export default withStyles(styles)(AddProduct);