import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fStorage} from "../firebase";
import {updateUserAction} from "../redux/userDucks";

const IMGDEFAULT = "gs://rafa-pokemon.appspot.com/user.png";

const Perfil = () => {
    const {uid, email, displayName, photoURL} = useSelector(store => store.userPkm.user);
    console.log('uid', uid);
    const [photo, setPhoto] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState(displayName);
    const [activarForm, setActivarForm] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (IMGDEFAULT === photoURL) {
            fStorage.refFromURL(photoURL).getDownloadURL()
                .then((url) => {
                        setPhoto(url);
                    }
                )
                .catch((error) => {
                    console.log('error', error);
                })
        } else {
            setPhoto(photoURL);
        }
    }, [setPhoto, photoURL]);

    const actualizarUsuario = () => {
        dispatch(updateUserAction(nombreUsuario));
    }

    return (
        <div className="col-sm-12 col-md-6 offset-md-3 mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={photo} alt={displayName} className="rounded-circle" width="100px"/>
                    <h5 className="card-title mt-2">Nombre: {displayName}</h5>
                    <p className="card-text">Email: {email}</p>
                    <button className="btn btn-dark"
                            onClick={() => setActivarForm(!activarForm)}>
                        Editar Nombre
                    </button>
                </div>
                {
                    activarForm && (
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="col-md-5">
                                    <div className="input-group mb-3">
                                        <input type="text"
                                               className="form-control"
                                               value={nombreUsuario}
                                               onChange={e => setNombreUsuario(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-dark"
                                                    type="button"
                                                    onClick={() => actualizarUsuario()}
                                            >
                                                Actualizar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Perfil;