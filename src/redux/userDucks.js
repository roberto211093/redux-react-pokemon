import {firebase, auth, db} from "../firebase";
// Data Init
const dataInit = {
    fetching: false,
    loggedIn: false
}

// Constants
const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const CLOSE_SESSION = 'CLOSE_SESSION';
const CLOSE_SESSION_SUCCESS = 'CLOSE_SESSION_SUCCESS';
const CLOSE_SESSION_FAILURE = 'CLOSE_SESSION_FAILURE';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

// Reducers
export default function userReducer(state = dataInit, action) {
    switch (action.type) {
        case LOGIN:
            return {...state, fetching: true}
        case LOGIN_SUCCESS:
            return {...state, fetching: false, loggedIn: true, user: action.payload}
        case LOGIN_FAILURE:
            return {...dataInit}
        case CLOSE_SESSION:
            return {...state, fetching: true}
        case CLOSE_SESSION_SUCCESS:
            return {...dataInit}
        case CLOSE_SESSION_FAILURE:
            return {...state, fetching: false}
        case UPDATE_USER:
            return {...state, fetching: true}
        case UPDATE_USER_SUCCESS:
            return {...state, fetching: false, loggedIn: true, user: action.payload}
        case UPDATE_USER_FAILURE:
            return {...state, fetching: false}
        default:
            return {...state}
    }
}

// Actions
export const loginEmailPassAction = (email, password) => async (dispatch) => {
    dispatch({
        type: LOGIN
    });
    try {
        const res = await auth.signInWithEmailAndPassword(email, password);
        const usuarioDB = await db.collection('usuarios').doc(res.user.email).get();
        dispatch({
            type: LOGIN_SUCCESS,
            payload: usuarioDB.data()
        });
        localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()));
    } catch (e) {
        console.error(e);
        dispatch({
            type: LOGIN_FAILURE
        });
    }
}

export const createUserEmailPassAction = (email, password) => async (dispatch) => {
    dispatch({
        type: LOGIN
    });
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const usuario = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: 'Anonimo',
            photoURL: 'gs://rafa-pokemon.appspot.com/user.png',
        };
        await db.collection('usuarios').doc(res.user.email).set(usuario);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: usuario
        });
        localStorage.setItem('usuario', JSON.stringify(usuario));
    } catch (e) {
        console.error(e);
        dispatch({
            type: LOGIN_FAILURE
        });
    }
}

export const loginGoogleAction = () => async (dispatch) => {
    dispatch({
        type: LOGIN
    });
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider);
        const usuario = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL,
        };
        const usuarioDB = await db.collection('usuarios').doc(res.user.email).get();
        if (usuarioDB.exists) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: usuarioDB.data()
            });
            localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()));
        } else {
            //Sino existe se realiza el registro de usuario
            await db.collection('usuarios').doc(res.user.email).set(usuario);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: usuario
            });
            localStorage.setItem('usuario', JSON.stringify(usuario));
        }
    } catch (e) {
        console.error(e);
        dispatch({
            type: LOGIN_FAILURE
        });
    }
}

export const userLoggedInAction = () => (dispatch) => {
    if (localStorage.getItem('usuario')) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: JSON.parse(localStorage.getItem('usuario'))
        });
    }
}

export const closeSessionAction = () => (dispatch) => {
    dispatch({
        type: CLOSE_SESSION,
    });
    auth.signOut()
        .then(() => {
                localStorage.removeItem('usuario');
                dispatch({
                    type: CLOSE_SESSION_SUCCESS,
                });
            }
        )
        .catch((error) => {
            console.log(error);
            dispatch({
                type: CLOSE_SESSION_FAILURE,
            });
        })
}

export const updateUserAction = (name) => async (dispatch, getState) => {
    dispatch({
        type: UPDATE_USER
    });
    try {
        const {user} = getState().userPkm;
        console.log(user);
        console.log(name);
        await db.collection('usuarios').doc(user.email).update({
            displayName: name
        });
        const usuario = {
            ...user,
            displayName: name
        };
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: usuario
        });
        localStorage.setItem('usuario', JSON.stringify(usuario));
    } catch (e) {
        console.error(e);
        dispatch({
            type: UPDATE_USER_FAILURE
        });
    }
}