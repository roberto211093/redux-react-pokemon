import React from 'react';
import {useSelector} from 'react-redux';

const Detail = () => {
    const {detail} = useSelector(store => store.pokemones);
    return (
        detail ?
            <div className='card mt-2 text-center'>
                <div className='card-body'>
                    <img src={detail.picture} alt="/" className='img-fluid'/>
                    <div className='card-title'>
                        {detail.name}
                    </div>
                    <p className='card-text'>
                        Ancho: {detail.weight} | Alto {detail.height}
                    </p>
                </div>
            </div>
            : null
    )
}


export default Detail;
