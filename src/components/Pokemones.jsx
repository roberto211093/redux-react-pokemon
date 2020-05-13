import React, {useEffect} from 'react';
// hooks react redux
import {useDispatch, useSelector} from 'react-redux';
// importamos las acciones
import {getPokemonsAction, getNextPokemonsAction, getPreviousPokemonsAction, getDetailAction} from '../redux/pokeDucks'
import Detail from "./Detail";

const Pokemones = () => {
    // declaramos dispatch para llamar a la acción o las acciones
    const dispatch = useDispatch();
    // crearmos el state utilizando nuestra tienda
    // store.pokemones lo sacamos de la tienda
    const pokemones = useSelector(store => store.pokemones);
    const {fetching, next, previous, results} = pokemones;

    useEffect(() => {
        const fetchData = () => {
            dispatch(getPokemonsAction())
            dispatch(getDetailAction())
        };
        fetchData();
    }, [dispatch]);

    return (
        fetching
            ? <div>cargando...</div>
            : <>
                <div className='col-sm-12 col-md-6'>
                    <div className='m-4'>
                        <h3>Pokemones!</h3>
                        {
                            results.length === 0 && (
                                <button className='btn btn-dark'
                                        onClick={() => dispatch(getPokemonsAction())}>Obtener</button>
                            )
                        }
                        <ul className='list-group mt3'>
                            {
                                results.map(item => (
                                    <li className='list-group-item' key={item.name}>{item.name}
                                    <button className='btn btn-dark btn-sm float-right'
                                            onClick={() => dispatch(getDetailAction(item.url))}>Info</button>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className='d-flex justify-content-between mt-3'>
                            {
                                previous !== null && (
                                    <button className='btn btn-dark'
                                            onClick={() => dispatch(getPreviousPokemonsAction())}>Anterior</button>
                                )
                            }
                            {
                                next !== null && (
                                    <button className='btn btn-dark'
                                            onClick={() => dispatch(getNextPokemonsAction())}>Siguiente</button>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='col-sm-12 col-md-6'>
                    <div className='m-4'>
                        <h3>Detalle Pokemon</h3>
                        <Detail />
                    </div>
                </div>
            </>

    )
}

export default Pokemones;
