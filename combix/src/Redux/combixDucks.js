import Axios from 'axios';
//Usando ducks docs: https://github.com/erikras/ducks-modular-redux
import history from '../Components/history.js';

//constantes
const configDuck = {
  sesion: {},
};
const OBETENER_DATOS_USUARIO = 'OBTENER_DATOS_USUARIO';
const CERRAR_SESION = 'CERRAR_SESION';
const REGISTRAR_USUARIO = 'REGISTRAR_USUARIO';
const REGISTRAR_CIUDAD = 'REGISTRAR_CIUDAD';
// reducer
export default function reducer(state = configDuck, action) {
  switch (action.type) {
    case OBETENER_DATOS_USUARIO:
      return {...state, sesion: action.payload};
    case CERRAR_SESION:
      return {...state, sesion: action.payload};
    case REGISTRAR_USUARIO:
      return {...state, sesion: action.payload};
    case REGISTRAR_CIUDAD:
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
    Axios.get('http://localhost:8080/login', {
      params: {
        mail: email,
        clave: password,
      },
    }).then((response) => {
      switch (response.status) {
        case 400:
          alert('Usuario o contraseña erronea');
          break;
        case 203:
          alert('Usuario o contraseña erronea');
          break;
        case 200:
          alert('login exitoso');
          dispatch({
            type: OBETENER_DATOS_USUARIO,
            payload: response.data,
          });
          switch (response.data.permissions) {
            case 'usuario':
              history.push('/loged');
              break;
            case 'administrador':
              history.push('/admin');
              break;
            case 'chofer':
              history.push('/chofer');
              break;
            default:
              console.log('no se tienen permisos');
              break;
          }

          break;
        default:
          console.log(response);
          alert('se produjo un error');
          break;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const registrarUsuario = (newUser) => (dispatch, getState) => {
  Axios.post('http://localhost:8080/users', newUser).then((response) => {
    switch (response.status) {
      case 202:
        alert('El registro fue exitoso');

        dispatch({
          type: REGISTRAR_USUARIO,
          payload: response.data,
        });
        history.push('/loged');
        break;
      case 203:
        alert('El email ya está registrado');
        break;
      default:
        alert('Hubo un error con el registro');
        break;
    }
  });
};

export const cerrarSesion = () => (dispatch, getState) => {
  const sesion = {};
  dispatch({
    type: CERRAR_SESION,
    payload: sesion,
  });
  alert('sesion cerrada');
  history.push('/');
};

export const registrarCiudad = (lugar, provincia) => () => {
  const ciudad = {
    lugar: lugar,
    provincia: provincia,
  };
  Axios.post('http://localhost:8080/ciudad', ciudad).then((response) => {
    switch (response.status) {
      case 200:
        alert('Se guardo la ciudad con exito');
        break;
      default:
        alert('Hubo un error con el registro de la ciudad');
        break;
    }
  });
};
