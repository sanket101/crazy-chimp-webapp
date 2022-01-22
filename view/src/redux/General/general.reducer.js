import Immutable from "immutable";
import generalActionTypes from "./general.types";

const INITIAL_STATE = Immutable.fromJS({
    collaborationData: [],
    discountData: [],
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
        default: 
            return state;
    }

};

export default reducer;