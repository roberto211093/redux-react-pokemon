import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {auth} from "./firebase";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Pokemones from './components/Pokemones';
import Perfil from "./components/Perfil";

function App() {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const fetchUser = () => {
            auth.onAuthStateChanged(res => {
                res ? setUser(res) : setUser(null);
            })
        }
        fetchUser()
    }, [user, setUser]);

    const RutaProtegida = ({component, path, ...rest}) => {
        if(localStorage.getItem('usuario')){
            const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
            if(usuarioStorage.uid === user.uid){
                // Son iguales
                return <Route component={component} path={path} {...rest} />
            }else{
                // No exite
                return <Redirect to="/login" {...rest} />
            }
        }else{
            return <Redirect to="/login" {...rest} />
        }
    }

    return user !== false ? (
        <Router>
            <div className="container-fluid p-0">
                <div className="row m-0">
                    <Navbar user={user}/>
                    <Switch>
                        <Route component={Login} path="/login"/>
                        {/* <Route component={Pokemones} path="/" exact/> */}
                        <RutaProtegida component={Pokemones} path="/" exact/>
                        <RutaProtegida component={Perfil} path="/perfil" exact/>
                    </Switch>
                </div>
            </div>
        </Router>
    ) : (<div>Cargando...</div>)
}

export default App;
