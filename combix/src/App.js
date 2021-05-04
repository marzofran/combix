import {Provider} from 'react-redux';
import Nav from '../src/Components/nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {store} from './Redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './Redux/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className='App'>
          <header className='App-header'>
            <Nav />
          </header>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
