import userActionTypes from './user.types';

export const setUserDetails = (userDetails) => {
    return {
        type: userActionTypes.SET_USER_DETAILS,
        payload: userDetails
    };
};

export const setUserAddresses = (userAddresses) => {
    return {
        type: userActionTypes.SET_USER_ADDRESSES,
        payload: userAddresses
    }
};

export const setSelectedAddress = (addressIndex) => {
    return {
        type: userActionTypes.SET_SELECTED_ADDRESS_INDEX,
        payload: addressIndex
    };
};

export const addNewAddress = (address) => {
    return {
        type: userActionTypes.ADD_NEW_ADDRESS,
        payload: address
    };
};

export const setUserInvoices = (invoices) => {
    return {
        type: userActionTypes.SET_USER_INVOICES,
        payload: invoices
    }
}