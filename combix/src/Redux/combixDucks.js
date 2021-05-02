import Axios from 'axios';
//Usando ducks docs: https://github.com/erikras/ducks-modular-redux
import history from '../Components/history.js';

//constantes
const configDuck = {
  sesion: {},
};
const OBETENER_DATOS_USUARIO = 'OBTENER DATOS USUARIO';
const CERRAR_SESION = 'CERRAR SESION';

// reducer
export default function reducer(state = configDuck, action) {
  switch (action.type) {
    case OBETENER_DATOS_USUARIO:
      return {...state, sesion: action.payload};
    case CERRAR_SESION:
      return {...state, sesion: action.payload};
    default:
      return state;
  }
}
//actions
export const obtenerDatosUsuarioAccion = (email, password) => async (
  dispatch,
  getState
) => {
  try {
    Axios.get('http://localhost:3030/login', {
      params: {
        mail: email,
        clave: password,
      },
    }) //
      .then((response) => {
        switch (response.status) {
          case 400:
            alert('contraseña erronea');
            break;
          case 203:
            alert('contraseña erronea');
            break;
          case 200:
            alert('login exitoso');
            dispatch({
              type: OBETENER_DATOS_USUARIO,
              payload: response.data,
            });
            history.push('/loged');
            break;
          default:
            alert('se produjo un error');
            break;
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export const cerrarSesion = () => (dispatch, getState) => {
  const sesion = {};
  dispatch({
    type: OBETENER_DATOS_USUARIO,
    payload: sesion,
  });
  alert('sesion cerrada');
  history.push('/');
};
