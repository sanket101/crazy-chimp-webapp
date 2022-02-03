import productActionTypes from './products.types';

export const setProductsData = (productData) => {
    return {
        type: productActionTypes.SET_PRODUCTS_DATA,
        payload: productData
    };
};

export const setPaginationNumber = (paginationNumber) => {
    return {
        type: productActionTypes.SET_PAGINATION_NUMBER,
        payload: paginationNumber
    }
};

export const setProductList = (productList) => {
    return {
        type: productActionTypes.SET_PRODUCT_LIST,
        payload: productList
    }
};

export const setProductType = (productType) => {
    return {
        type: productActionTypes.SET_PRODUCT_TYPE,
        payload: productType
    }
};

export const setGenreType = (genreType) => {
    return {
        type: productActionTypes.SET_GENRE_TYPE,
        payload: genreType
    }
};

export const setProductCategories = (productCategories) => {
    return {
        type: productActionTypes.SET_PRODUCT_CATEGORIES,
        payload: productCategories
    }
};

export const setGenreCategories = (genreCategories) => {
    return {
        type: productActionTypes.SET_GENRE_CATEGORIES,
        payload: genreCategories
    }
};

export const setProductDetails = (productDetails) => {
    return {
        type: productActionTypes.SET_PRODUCT_DETAILS,
        payload: productDetails
    }
};

export const addToCart = (cartItem) => {
    return {
        type: productActionTypes.ADD_TO_CART,
        payload: cartItem
    }
};

export const updateCart = (newCart) => {
    return {
        type: productActionTypes.UPDATE_CART,
        payload: newCart
    }
};

export const setStockAvailability = (data) => {
    return {
        type: productActionTypes.SET_STOCK_AVAILABILITY,
        payload: data
    }
};