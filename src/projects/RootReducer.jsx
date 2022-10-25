import { combineReducers } from 'redux';
import AuthSetReducer from './reducers/AuthReducer';
import InitSetReducer from './reducers/InitSetReducer';
import PopUpReducer from './reducers/PopUpReducer';

const rootReducer = combineReducers({
    initData: InitSetReducer,
    loginId: AuthSetReducer,
    activeSnackbar: PopUpReducer,
});

export default rootReducer;
