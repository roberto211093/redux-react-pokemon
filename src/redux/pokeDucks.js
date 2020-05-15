import axios from 'axios';
// constants
const dataInit = {
    fetching: false,
    count: 0,
    next: null,
    previous: null,
    results: []
};
const API = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10';
const GET_POKEMONS = 'GET_POKEMONS';
const GET_POKEMONS_SUCCESS = 'GET_POKEMONS_SUCCESS';
const GET_POKEMONS_FAILURE = 'GET_POKEMONS_FAILURE';
const GET_POKEMONS_DETAIL = 'GET_POKEMONS_DETAIL';
const GET_POKEMONS_DETAIL_SUCCESS = 'GET_POKEMONS_DETAIL_SUCCESS';
const GET_POKEMONS_DETAIL_FAILURE = 'GET_POKEMONS_DETAIL_FAILURE';

// reducers
export default function pokeReducer(state = dataInit, action) {
    switch (action.type) {
        case GET_POKEMONS:
            return {...state, fetching: true}
        case GET_POKEMONS_SUCCESS:
            return {...state, ...action.payload, fetching: false}
        case GET_POKEMONS_FAILURE:
            return {...state, fetching: false, error: action.payload}
        case GET_POKEMONS_DETAIL:
            return {...state, fetching: true}
        case GET_POKEMONS_DETAIL_SUCCESS:
            return {...state, detail: action.payload, fetching: false}
        case GET_POKEMONS_DETAIL_FAILURE:
            return {...state, fetching: false, error: action.payload}
        default:
            return state;
    }
}

// actions
export const getDetailAction = (url) => async (dispatch, getState) => {
    if(url === undefined){
        url = 'https://pokeapi.co/api/v2/pokemon/1/'
    }
    dispatch({
        type: GET_POKEMONS_DETAIL
    });
    if(localStorage.getItem(url)){
        dispatch({
            type: GET_POKEMONS_DETAIL_SUCCESS,
            payload: JSON.parse(localStorage.getItem(url))
        })
        return
    }
    try {
        const res = await axios.get(`${url}`);
        dispatch({
            type: GET_POKEMONS_DETAIL_SUCCESS,
            payload: {
                name: res.data.name,
                weight: res.data.weight,
                height: res.data.height,
                picture: res.data.sprites.front_default
            }
        });
        localStorage.setItem(url, JSON.stringify({
            name: res.data.name,
            weight: res.data.weight,
            height: res.data.height,
            picture: res.data.sprites.front_default
        }));
    }
    catch (error) {
        dispatch({
            type: GET_POKEMONS_DETAIL_FAILURE,
            payload: error.message
        });
    }
}
export const getPokemonsAction = () => async (dispatch, getState) => {
    dispatch({
        type: GET_POKEMONS
    });
    if (localStorage.getItem('offset=0')) {
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        });
        const res = JSON.parse(localStorage.getItem('offset=0'));
        getDetailAction(res.results[0].url);
        return;
    }
    try {
        const res = await axios.get(`${API}`);
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: res.data
        });
        localStorage.setItem('offset=0', JSON.stringify(res.data));
    }
    catch (error) {
        dispatch({
            type: GET_POKEMONS_FAILURE,
            payload: error.message
        });
    }
}
export const getNextPokemonsAction = () => async (dispatch, getState) => {
    const state = getState();
    const {next} = state.pokemones;
    dispatch({
        type: GET_POKEMONS
    });
    if (localStorage.getItem(next)) {
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: JSON.parse(localStorage.getItem(next))
        });
        return;
    }
    try {
        const res = await axios.get(`${next}`);
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: res.data
        });
        localStorage.setItem(next, JSON.stringify(res.data));
    }
    catch (error) {
        dispatch({
            type: GET_POKEMONS_FAILURE,
            payload: error.message
        });
    }
}

export const getPreviousPokemonsAction = () => async (dispatch, getState) => {
    const state = getState();
    const {previous} = state.pokemones;
    dispatch({
        type: GET_POKEMONS
    });
    if (localStorage.getItem(previous)) {
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: JSON.parse(localStorage.getItem(previous))
        });
        return;
    }
    try {
        const res = await axios.get(`${previous}`);
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: res.data
        });
        localStorage.setItem(previous, JSON.stringify(res.data));
    }
    catch (error) {
        dispatch({
            type: GET_POKEMONS_FAILURE,
            payload: error.message
        });
    }
}
