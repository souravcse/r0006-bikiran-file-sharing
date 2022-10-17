const initialState = {};

const InitSetReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_SET': {
            return action.payload;
        }

        default:
            return state;
    }
};

export default InitSetReducer;
