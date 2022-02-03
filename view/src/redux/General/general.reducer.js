import Immutable from "immutable";
import generalActionTypes from "./general.types";

const INITIAL_STATE = Immutable.fromJS({
    collaborationData: [],
    discountData: [],
    customerGallery: [],
    discountCodes: [],
    loginError: ''
});

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case generalActionTypes.SET_COLLABORATION_DATA:
            return state.set("collaborationData", action.payload);
        case generalActionTypes.SET_LOGIN_ERROR:
            return state.set("loginError", action.payload);
        case generalActionTypes.SET_DISCOUNT_DATA:
            return state.set("discountData", action.payload);
        case generalActionTypes.SET_CUSTOMER_GALLERY:
            return state.set("customerGallery", action.payload);
        case generalActionTypes.SET_DISCOUNT_CODES:
            return state.set("discountCodes", action.payload);
        default: 
            return state;
    }

};

export default reducer;