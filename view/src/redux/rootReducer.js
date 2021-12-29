import { combineReducers } from 'redux';

import userReducer from './User/user.reducer';

const rootReducer = combineReducers({
    userDetails: userReducer,
});

export default rootReducer;