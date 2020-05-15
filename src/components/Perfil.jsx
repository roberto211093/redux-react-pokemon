import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fStorage} from "../firebase";
import {updateImgAction, updateUserAction} from "../redux/userDucks";

const IMGDEFAULT = "gs://rafa-pokemon.appspot.com/user.png";

const Perfil = () => {
    const dispatch = useDispatch();
    const {fetching, user} = useSelector(store => store.userPkm);
    const {email, displayName, photoURL} = user;
    const [photo, setPhoto] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState(displayName);
    const [activarForm, setActivarForm] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (IMGDEFAULT === photoURL) {
                const imgRef = await fStorage.refFromURL(photoURL);
                const imgUrl = await imgRef.getDownloadURL();
                setPhoto(imgUrl);
            } else {
                setPhoto(photoURL);
            }
        }
        fetchData();
    }, [setPhoto, photoURL]);

    const actualizarUsuario = () => {
        if (!nombreUsuario.trim()) {
            return
        }
        dispatch(updateUserAction(nombreUsuario));
        setActivarForm(false);
    }

    const seleccionarArchivo = (imgNew) => {
        const img = imgNew.target.files[0];
        if (img === undefined) {
            console.log('No se selecciono imagen');
            return;
        }
        if (img.type === "image/png" || img.type === "image/jpg") {
            dispatch(updateImgAction(img));
            setError(false);
        } else {
            setError(true);
        }

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

                {
                    error && (
                        <div className="alert alert-warning mb-4">
                            Img debe ser en formato png o jpg
                        </div>
                    )
                }
                <div className="custom-file mb-4">
                    <input type="file"
                           id="inputGroupFile01"
                           style={{display: 'none'}}
                           onChange={e => seleccionarArchivo(e)}
                           disabled={fetching}
                    />
                    <label className={fetching ? "btn btn-dark disabled" : "btn btn-dark"}
                           htmlFor="inputGroupFile01">
                        Actualizar Imagen</label>
                </div>
                {
                    fetching && (
                        <div className="mb-4 d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Cargando...</span>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Perfil;