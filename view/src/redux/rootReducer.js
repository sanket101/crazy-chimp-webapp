import { combineReducers } from 'redux';

import userReducer from './User/user.reducer';
import productReducer from './Products/products.reducer';
import generalReducer from './General/general.reducer';
import adminReducer from './Admin/admin.reducer';

const rootReducer = combineReducers({
    userDetails: userReducer,
    productDetails: productReducer,
    generalDetails: generalReducer,
    adminDetails: adminReducer
});

export default rootReducer;