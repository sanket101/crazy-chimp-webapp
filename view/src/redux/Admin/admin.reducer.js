import Immutable from "immutable";
import adminActionTypes from "./admin.types";

const INITIAL_STATE = Immutable.fromJS({
    isAdmin: false
});

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case adminActionTypes.IS_ADMIN:
            return state.set("isAdmin", action.payload);
        default: 
            return state;
    }

};

export default reducer;