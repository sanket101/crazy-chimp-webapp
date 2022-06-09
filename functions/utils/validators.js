const isEmpty = (string) => {
	if (!string || (string && string.trim() === '')) return true;
	else return false;
};

exports.validateLoginData = (data) => {
   let errors = {};
   if (isEmpty(data.email)) errors.email = 'Must not be empty';
   if (isEmpty(data.password)) errors.password = 'Must not be  empty';
   return {
       errors,
       valid: Object.keys(errors).length === 0 ? true : false
    };
};

const isEmail = (email) => {
	const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(emailRegEx)) return true;
	else return false;
};

exports.validateSignUpData = (data) => {
	let errors = {};

	if (isEmpty(data.email)) {
		errors.email = 'Must not be empty';
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be valid email address';
	}

	if (isEmpty(data.firstName)) errors.firstName = 'Must not be empty';
	if (isEmpty(data.lastName)) errors.lastName = 'Must not be empty';
	if (isEmpty(data.phoneNumber)) errors.phoneNumber = 'Must not be empty';
	if (isEmpty(data.country)) errors.country = 'Must not be empty';

	if (isEmpty(data.password)) errors.password = 'Must not be empty';
	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passowrds must be the same';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

const isLengthValid = (field, expectedLength) => {
	if(field.length === expectedLength) return true;
	return false;
};

exports.validateAddressData = (data) => {
	let errors = {};

	if(isEmpty(data.city)) errors.city = "Must not be empty";
	if(isEmpty(data.state)) errors.state = "Must not be empty";
	if(isEmpty(data.country)) errors.country = "Must not be empty";
	if(isEmpty(data.pincode)) errors.pincode = "Must not be empty";
	else if(!isLengthValid(data.pincode, 6)) errors.pincode = "Must have 6 digits";
	if(isEmpty(data.address)) errors.address = "Must not be empty";
	if(isEmpty(data.phone)) errors.phone = "Must not be empty";
	else if(!isLengthValid(data.phone, 10)) errors.phone = "Must have 10 digits";
	if(isEmpty(data.name)) errors.name = "Must not be empty";

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

exports.validateGenreCategoryData = (data) => {
	let errors = {};
	if(isEmpty(data.code)) errors.code = "Must not be empty";
	if(isEmpty(data.displayName)) errors.code = "Must not be empty";
	
	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

exports.validateProductCategoryData = (data) => {
	let errors = {};
	if(isEmpty(data.code)) errors.code = "Must not be empty";
	if(isEmpty(data.displayName)) errors.code = "Must not be empty";
	
	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

exports.validateOrderData = (data) => {
	let errors = {};
	if(isEmpty(data.productId)) errors.productId = "Must not be empty";
	if(!data.quantity) errors.quantity = "Must not be empty";
	else if(isNaN(data.quantity)) errors.quantity = "Must be a number";
	if(isEmpty(data.size)) errors.size = "Must not be empty";
	if(isEmpty(data.color)) errors.color = "Must not be empty";
	if(isEmpty(data.productName)) errors.productName = "Must not be empty";
	if(isEmpty(data.productImage)) errors.productImage = "Must not be empty";
	
	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

exports.validateProductData = (data) => {
	let errors = {};

	if(isEmpty(data.name)) errors.name = "Must not be empty";
	// if(isEmpty(data.description)) errors.description = "Must not be empty";
	if(!data.actualPrice) errors.actualPrice = "Must not be empty";
	else if(isNaN(data.actualPrice)) errors.actualPrice = "Must be a number";
	if(isEmpty(data.productCode)) errors.productCode = "Must not be empty";
	if(isEmpty(data.productCategory)) errors.productCategory = "Must not be empty";
	if(isEmpty(data.genreCategory)) errors.genreCategory = "Must not be empty";
	if(isEmpty(data.productDomain)) errors.productDomain = "Must not be empty";
	if(!data.weightInGms) errors.weightInGms = "Must not be empty";
	else if(isNaN(data.weightInGms)) errors.weightInGms = "Must be number";
	if(!data.colorsAvailable) errors.colorsAvailable = "Must not be empty";	
	else if (data.colorsAvailable.length <= 0) errors.colorsAvailable = "Must not be empty";
	if(!data.sizeAvailable) errors.sizeAvailable = "Must not be empty";	
	else if (data.sizeAvailable.length <= 0) errors.sizeAvailable = "Must not be empty";

	//TODO: checks for sizeAvailable, colorsAvailable, images
	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

exports.validateInvoiceData = (data) => {

	let errors = {};

	if(!data.hasOwnProperty("productTotalAmount")) errors.productTotalAmount = "Must not be empty";
	else if(isNaN(data.productTotalAmount)) errors.productTotalAmount = "Must be number";

	if(!data.hasOwnProperty("shippingAmount")) errors.shippingAmount = "Must not be empty";
	else if(isNaN(data.shippingAmount)) errors.shippingAmount = "Must be number";
	
	if(!data.orders || (data.orders && data.orders.length <= 0)) errors.orders = "Must have atleast one order";

	if(!data.paymentMethod) errors.paymentMethod = "Must not be empty";

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
}

exports.validateDiscountData = (data) => {
	let errors = {};

	if(isEmpty(data.code)) errors.code = "Must not be empty";
	if(isEmpty(data.description)) errors.description = "Must not be empty";
	if(isEmpty(data.discountType)) errors.discountType = "Must not be empty";

	if(!data.hasOwnProperty("discount")) errors.discount = "Must not be empty";
	else if(isNaN(data.discount)) errors.discount = "Must be number";

	if(!data.hasOwnProperty("isEnabled")) errors.isEnabled = "Must not be empty";

	if(isEmpty(data.validFrom)) errors.validFrom = "Must not be empty";
	if(isEmpty(data.validUntil)) errors.validUntil = "Must not be empty";

	if(!data.hasOwnProperty("frequencyPerUser")) errors.frequencyPerUser = "Must not be empty";

	if(!data.hasOwnProperty("cartMinValue")) errors.cartMinValue = "Must not be empty";

	if(!data.hasOwnProperty("cartMaxValue")) errors.cartMaxValue = "Must not be empty";

	if(!data.hasOwnProperty("cartMinItems")) errors.cartMinItems = "Must not be empty";

	if(!data.hasOwnProperty("cartMaxItems")) errors.cartMaxItems = "Must not be empty";

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};