import generateStore from './Redux/store';
import {Provider} from 'react-redux';

function App() {
  const store = generateStore();
  return (
    <Provider store={store}>
      <div className='App'>
        <header className='App-header'>
          <h1>app.ssjs</h1>
        </header>
      </div>
    </Provider>
  );
}

export default App;
