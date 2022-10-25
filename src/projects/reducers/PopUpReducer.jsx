const initialState = {
    isOpen: false,
    message: null,
};

const PopUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_OPEN_POPUP': {
            return {
                isOpen: true,
                message: action.payload.message,
            };
        }
        case 'SET_CLOSE_SNACKBAR': {
            return {
                isOpen: false,
                message: null,
            };
        }
        default:
            return state;
    }
};

export default PopUpReducer;
