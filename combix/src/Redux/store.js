import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './combixDucks';
import reducerCidades from './Admin/ciudadesDucks';
import reducerInsumos from './Admin/insumosDucks';
import reducerRutas from './Admin/rutasDucks';
import reducerViajes from './Admin/viajesDucks';
import reducerCombis from './Admin/combisDucks';
import reducerChoferes from './Admin/choferesDucks';
//import {persistStore, persistReducer} from 'redux-persist';
//import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  combix: reducer,
  ciudades: reducerCidades,
  insumos: reducerInsumos,
  rutas: reducerRutas,
  viajes: reducerViajes,
  combis: reducerCombis,
  choferes: reducerChoferes,
});

/*
const persistConfig = {
  key: 'Demo1',
  storage,
};
*/
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//onst pReducer = persistReducer(persistConfig, rootReducer);

//const store = createStore(pReducer, composeEnhancers(applyMiddleware(thunk)));
//const persistor = persistStore(store);

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}

//export {persistor, store};
