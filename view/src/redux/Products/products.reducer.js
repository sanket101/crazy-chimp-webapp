import Immutable from "immutable";
import productActionTypes from './products.types';

const INITIAL_STATE = Immutable.fromJS({
    productData: 0,
    paginationNumber: 1,
    productList: [],
    productType: '',
    genreType: '',
    productCategories: [],
    genreCategories: []
});

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case productActionTypes.SET_PRODUCTS_DATA:
            return state.set("productData", action.payload);
        case productActionTypes.SET_PAGINATION_NUMBER:
            return state.set("paginationNumber", action.payload);
        case productActionTypes.SET_PRODUCT_LIST:
            return state.set("productList", action.payload);
        case productActionTypes.SET_PRODUCT_TYPE:
            return state.set("productType", action.payload);
        case productActionTypes.SET_GENRE_TYPE:
            return state.set("genreType", action.payload);
        case productActionTypes.SET_PRODUCT_CATEGORIES:
            return state.set("productCategories", action.payload);
        case productActionTypes.SET_GENRE_CATEGORIES:
            return state.set("genreCategories", action.payload);
        default: 
            return state;
    }

};

export default reducer;