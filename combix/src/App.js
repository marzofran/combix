import {Provider} from 'react-redux';
import Nav from '../src/Components/nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import store from './Redux/storeInstance';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <header className='App-header'>
          <Nav />
        </header>
      </div>
    </Provider>
  );
}

export default App;
