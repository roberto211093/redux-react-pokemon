import React from 'react';
import {useDispatch} from 'react-redux';
import {withRouter, Link, NavLink} from 'react-router-dom';
import {closeSessionAction} from "../redux/userDucks";

const Navbar = (props) => {
    const dispatch = useDispatch();
    const {user, history} = props;

    const closeSession = () => {
        dispatch(closeSessionAction())
        history.push('/login');
    }
    return (
        <div className="col-sm-12 navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">App Poke</Link>
            <div className="d-flex">
                {
                    user !== null
                        ?
                        <React.Fragment>
                            <NavLink to="/" className="btn btn-dark mr-2" exact>
                                Inicio
                            </NavLink>
                            <button
                                className="btn btn-dark"
                                type="button"
                                onClick={() => closeSession()}
                            >
                                Cerrar Session
                            </button>
                        </React.Fragment>
                        : <NavLink
                            className="btn btn-dark"
                            to="/login"
                        >
                            Login
                        </NavLink>
                }
            </div>
        </div>
    )
}

export default withRouter(Navbar);