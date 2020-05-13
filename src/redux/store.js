import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import pokeReducer from './pokeDucks';
import userReducer, {userLoggedInAction} from "./userDucks";

const rootReducer = combineReducers({
    pokemones: pokeReducer,
    userPkm: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
    userLoggedInAction()(store.dispatch);
    return store;
}
