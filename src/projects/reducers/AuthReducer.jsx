const initialState = {};

const AuthSetReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_SET': {
            return action.payload;
        }

        default:
            return state;
    }
};

export default AuthSetReducer;
