import { combineReducers } from 'redux';

import userReducer from './User/user.reducer';
import productReducer from './Products/products.reducer';

const rootReducer = combineReducers({
    userDetails: userReducer,
    productDetails: productReducer
});

export default rootReducer;