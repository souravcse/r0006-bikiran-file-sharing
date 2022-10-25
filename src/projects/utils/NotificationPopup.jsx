import PopUpOpenDispatch from '../dispatches/PopUpOpenDispatch';

// --Handler
const handelPopbarOpen = (dispatch, message) => {
    PopUpOpenDispatch(dispatch, message);
};

export default function NotificationPopup(response, dispatch) {
    if (response.data.error !== null) {
        handelPopbarOpen(dispatch, response.data.message);
    }
}
