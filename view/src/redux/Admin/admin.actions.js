import adminActionTypes from "./admin.types";

export const setAdminAuthentication = (isAdmin) => {
    return {
        type: adminActionTypes.IS_ADMIN,
        payload: isAdmin
    };
};