import userActionTypes from './user.types';

export const setUserDetails = (userDetails) => {
    return {
        type: userActionTypes.SET_USER_DETAILS,
        payload: userDetails
    };
};