import React from 'react';
import Pokemones from './components/Pokemones';
import {Provider} from 'react-redux';
import generateStore from './redux/store';

function App() {
  const store = generateStore();
  return (
    <Provider store={store}>
        <div className="container-fluid p-0">
            <div className="row m-0">
                <Pokemones/>
            </div>
        </div>
    </Provider>
  );
}

export default App;
