import generalActionTypes from './general.types';

export const setCollaborationData = (data) => {
    return {
        type: generalActionTypes.SET_COLLABORATION_DATA,
        payload: data
    };
};

export const setLoginError = (msg) => {
    return {
        type: generalActionTypes.SET_LOGIN_ERROR,
        payload: msg
    };
};

export const setDiscountData = (data) => {
    return {
        type: generalActionTypes.SET_DISCOUNT_DATA,
        payload: data
    };
};