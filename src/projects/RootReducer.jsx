import { combineReducers } from 'redux';
import AuthSetReducer from './reducers/AuthReducer';
import InitSetReducer from './reducers/InitSetReducer';

const rootReducer = combineReducers({
    initData: InitSetReducer,
    loginId: AuthSetReducer,
});

export default rootReducer;
