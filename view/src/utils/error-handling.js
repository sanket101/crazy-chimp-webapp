import ROUTES from "../constants/routes-name";

export const handleApiError = (history, error) => {
    if(error.request.status === 403) {
        history.push(ROUTES.LOGIN);
    }
    else{
        history.push(ROUTES.ERROR);
    }
};