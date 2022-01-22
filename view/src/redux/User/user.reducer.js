import Immutable from "immutable";
import userActionTypes from './user.types';

const INITIAL_STATE = Immutable.fromJS({
    userDetails: {},
    userAddresses: [],
    selectedAddressIndex: 0,
    userInvoices: []
});

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case userActionTypes.SET_USER_DETAILS:
            return state.set("userDetails", action.payload);
        case userActionTypes.SET_USER_ADDRESSES:
            return state.set("userAddresses", action.payload);
        case userActionTypes.SET_SELECTED_ADDRESS_INDEX:
            return state.set("selectedAddressIndex", action.payload);
        case userActionTypes.ADD_NEW_ADDRESS:
            const _state = state.toJS();
            let newAddressArray = [..._state.userAddresses];
            newAddressArray.push(action.payload);
            return state.set("userAddresses", newAddressArray);
        case userActionTypes.SET_USER_INVOICES:
            return state.set("userInvoices", action.payload);
        default: 
            return state;
    }

};

export default reducer;