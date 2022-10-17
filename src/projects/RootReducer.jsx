import { combineReducers } from 'redux';
import InitSetReducer from './reducers/InitSetReducer';

const rootReducer = combineReducers({
    initData: InitSetReducer,
});

export default rootReducer;
