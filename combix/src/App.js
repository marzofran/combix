import generateStore from './Redux/store';
import {Provider} from 'react-redux';
import Nav from '../src/Components/nav';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const store = generateStore();
  return (
    <Provider store={store}>
      <div className='App'>
        <header className='App-header'>
          <Nav></Nav>
          <h1>app.js component</h1>
        </header>
      </div>
    </Provider>
  );
}

export default App;
