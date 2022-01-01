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