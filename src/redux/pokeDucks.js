import axios from 'axios';
// constants
const dataInit = {
    fetching: false,
    array: []
};
const API = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
const GET_POKEMONS = 'GET_POKEMONS';
const GET_POKEMONS_SUCCESS = 'GET_POKEMONS_SUCCESS';
const GET_POKEMONS_FAILURE = 'GET_POKEMONS_FAILURE';

// reducers
export default function pokeReducer(state = dataInit, action) {
    switch (action.type) {
        case GET_POKEMONS:
            return {...state, fetching: true}
        case GET_POKEMONS_SUCCESS:
            return {...state, array: action.payload, fetching: false}
        default:
            return state;
    }
}

// actions
export const getPokemonsAction = () => async (dispatch, getState) => {
    dispatch({
        type: GET_POKEMONS
    });
    try {
        const res = await axios.get(API);
        console.log('res: ',res);
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: res.data.results
        });
    }
    catch (error) {
        console.log(error);
    }
}
