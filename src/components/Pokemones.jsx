import React from 'react';
// hooks react redux
import {useDispatch, useSelector} from 'react-redux';
// importamos la acción
import {getPokemonsAction} from '../redux/pokeDucks'

const Pokemones = () => {
    // declaramos dispatch para llamar a la acción o las acciones
    const dispatch = useDispatch();
    // crearmos el state utilizando nuestra tienda
    // store.pokemones lo sacamos de la tienda
    const pokemones = useSelector(store => store.pokemones);
    const {array, fetching} = pokemones;

    return (
        fetching
            ? <div>cargando...</div>
            : <div>
                <h1>Pokemones!</h1>
                <button onClick={() => dispatch(getPokemonsAction())}>Obtener</button>
                <ul>
                    {
                        array.map(item => (
                            <li key={item.name}>{item.name}</li>
                        ))
                    }
                </ul>
            </div>

    )
}

export default Pokemones
