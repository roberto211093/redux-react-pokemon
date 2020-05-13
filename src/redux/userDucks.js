import {firebase, auth} from "../firebase";
// Data Init
const dataInit = {
    fetching: false,
    loggedIn: false
}

// Constants
const LOGIN_GOOGLE = 'LOGIN_GOOGLE';
const LOGIN_GOOGLE_SUCCESS = 'LOGIN_GOOGLE_SUCCESS';
const LOGIN_GOOGLE_FAILURE = 'LOGIN_GOOGLE_FAILURE';
const CLOSE_SESSION = 'CLOSE_SESSION';
const CLOSE_SESSION_SUCCESS = 'CLOSE_SESSION_SUCCESS';
const CLOSE_SESSION_FAILURE = 'CLOSE_SESSION_FAILURE';

// Reducers
export default function userReducer(state= dataInit, action) {
    switch (action.type) {
        case LOGIN_GOOGLE:
            return {...state, fetching: true}
        case LOGIN_GOOGLE_SUCCESS:
            return {...state, fetching: false, loggedIn: true, user: action.payload}
        case LOGIN_GOOGLE_FAILURE:
            return {...dataInit}
        case CLOSE_SESSION:
            return {...state, fetching: true}
        case CLOSE_SESSION_SUCCESS:
            return {...dataInit}
        case CLOSE_SESSION_FAILURE:
            return {...state, fetching: false}
        default:
            return {...state}
    }
}

// Actions
export const loginGoogleAction = () => async (dispatch) => {
    dispatch({
        type: LOGIN_GOOGLE
    })
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider);
        console.log('res: ', res);
        dispatch({
            type: LOGIN_GOOGLE_SUCCESS,
            payload: {
                uid: res.user.uid,
                email: res.user.email
            }
        })
        localStorage.setItem('usuario', JSON.stringify({
            uid: res.user.uid,
            email: res.user.email
        }))
    }
    catch (e) {
        console.error(e);
        dispatch({
            type: LOGIN_GOOGLE_FAILURE
        })
    }
}

export const userLoggedInAction = () => (dispatch) => {
    if (localStorage.getItem('usuario')) {
        dispatch({
            type: LOGIN_GOOGLE_SUCCESS,
            payload: JSON.parse(localStorage.getItem('usuario'))
        })
    }
}

export const closeSessionAction = () => (dispatch) => {
    dispatch({
        type: CLOSE_SESSION,
    })
    auth.signOut()
        .then(() => {
                localStorage.removeItem('usuario');
                dispatch({
                    type: CLOSE_SESSION_SUCCESS,
                })
            }
        )
        .catch((error) => {
            console.log(error);
            dispatch({
                type: CLOSE_SESSION_FAILURE,
            })
        })
}