import { createStore } from 'redux'
import { rootReducer } from './reducer';
import { login, errorMessageAction } from "./actions";
import { AuthAPI } from '../auth';


export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

