import Immutable from "immutable";
import userActionTypes from './user.types';

const INITIAL_STATE = Immutable.fromJS({
    userDetails: {}
});

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case userActionTypes.SET_USER_DETAILS:
            return state.set("userDetails", action.payload);

        default: 
            return state;
    }

};

export default reducer;