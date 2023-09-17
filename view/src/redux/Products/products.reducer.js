import Immutable from "immutable";
import productActionTypes from './products.types';

const INITIAL_STATE = Immutable.fromJS({
    productData: 0,
    paginationNumber: 1,
    productList: [],
    productType: '',
    genreType: '',
    productCategories: [],
    genreCategories: [],
    productDetails: {},
    cart: [],
    stockAvailability: {},
    bestSellerProducts: [],
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
        case productActionTypes.SET_PRODUCT_DETAILS:
            return state.set("productDetails", action.payload);
        case productActionTypes.ADD_TO_CART:
            const _state = state.toJS();
            let newCartArray = [..._state.cart];
            newCartArray.push(action.payload);
            return state.set("cart", newCartArray);
        case productActionTypes.UPDATE_CART:
            return state.set("cart", action.payload);
        case productActionTypes.SET_STOCK_AVAILABILITY:
            return state.set("stockAvailability", action.payload);
        case productActionTypes.SET_BEST_SELLERS:
            return state.set("bestSellerProducts", action.payload);
        case productActionTypes.SET_WEEKLY_DROP:
            return state.set("weeklyDropProduct", action.payload);
        default: 
            return state;
    }

};

export default reducer;