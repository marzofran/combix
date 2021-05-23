import {Provider} from 'react-redux';
import Nav from '../src/Components/nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import storeInstance from './Redux/storeInstance';
//import {PersistGate} from 'redux-persist/integration/react';
//import {persistor} from './Redux/store';

function App() {
  return (
    <Provider store={storeInstance}>
      <div className='App'>
        <header className='App-header'>
          <Nav />
        </header>
      </div>
    </Provider>
  );
}

export default App;
