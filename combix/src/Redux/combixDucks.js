import Axios from 'axios';
//Usando ducks docs: https://github.com/erikras/ducks-modular-redux
import history from '../Components/history.js';

//constantes
const configDuck = {
  sesion: {},
};
const OBETENER_DATOS_USUARIO = 'OBTENER DATOS USUARIO';
// reducer
export default function reducer(state = configDuck, action) {
  switch (action.type) {
    case OBETENER_DATOS_USUARIO:
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
            console.log(response);
            break;
          case 203:
            alert('no se encuentra al user');
            break;
          case 200:
            console.log(response.data);
            alert('login exitoso');
            dispatch({
              type: OBETENER_DATOS_USUARIO,
              payload: response.data,
            });
            history.push('/loged');
            break;
          default:
            alert('se produjo un error');
            console.log(response.data);

            break;
        }
      });
  } catch (error) {
    console.log(error);
  }
};
