function PopUpOpen(message) {
    return {
        type: 'SET_OPEN_POPUP',
        payload: {
            message,
        },
    };
}

export default function PopUpOpenDispatch(dispatch, message) {
    dispatch(PopUpOpen(message));
}
