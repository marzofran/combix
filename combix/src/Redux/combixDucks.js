import Axios from 'axios';
//Usando ducks docs: https://github.com/erikras/ducks-modular-redux
import history from '../Components/history.js';

//constantes
const configDuck = {
  sesion: {},
  usuarios: [],
  reviews: [],
};
const OBETENER_DATOS_USUARIO = 'OBTENER_DATOS_USUARIO';
const CERRAR_SESION = 'CERRAR_SESION';
const REGISTRAR_USUARIO = 'REGISTRAR_USUARIO';
const CARGAR_USUARIO = 'CARGAR_USUARIO';
const ACTIVAR_GOLD = 'ACTIVAR_GOLD';
const CANCELAR_GOLD = 'CANCELAR_GOLD';
const MODIFICAR_USUARIO = 'MODIFICAR_USUARIO';
const OBTENER_REVIEWS = 'OBTENER_REVIEWS';

// reducer
export default function reducer(state = configDuck, action) {
  switch (action.type) {
    case OBETENER_DATOS_USUARIO:
      return { ...state, sesion: action.payload };
    case CERRAR_SESION:
      return { ...state, sesion: action.payload };
    case REGISTRAR_USUARIO:
      return { ...state, sesion: action.payload };
    case CARGAR_USUARIO:
      return { ...state, usuarios: action.payload };
    case ACTIVAR_GOLD:
      return { ...state, sesion: action.payload };
    case CANCELAR_GOLD:
      return { ...state, sesion: action.payload };
    case MODIFICAR_USUARIO:
      return { ...state, sesion: action.payload };
    case OBTENER_REVIEWS:
      return { ...state, reviews: action.payload};
    default:
      return state;
  }
}
//actions
export const obtenerDatosUsuarioAccion =
  (email, password) => async (dispatch, getState) => {
    try {
      Axios.get('http://localhost:8080/login', {
        params: {
          mail: email.toLowerCase(),
          clave: password,
        },
      }).then((response) => {
        switch (response.status) {
          case 400:
            alert('Usuario o contraseña incorrecta');
            break;
          case 203:
            alert('Usuario o contraseña incorrecta');
            break;
          case 200:
            dispatch({
              type: OBETENER_DATOS_USUARIO,
              payload: response.data,
            });
            switch (response.data.permissions) {
              case '6094d56377b5714b3473dbc5':
                history.push('/client/buscarPasajes');
                break;
              case '6094d45f56d99b266076c0bf':
                history.push('/admin');
                break;
              case '60c4c2a93690f72eb018de17':
                history.push('/client/buscarPasajes');
                break;
              case '6094d50128e541353c8cf122':
                history.push('/chofer/vistaChofer');
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
        history.push('/client/buscarPasajes');
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
  history.push('/');
  dispatch({
    type: CERRAR_SESION,
    payload: sesion,
  });
  alert('sesion cerrada');
};

export const cargarUsuarios = () => (dispatch, getState) => {
  try {
    Axios.get('http://localhost:8080/users', {}).then((response) => {
      switch (response.status) {
        case 200:
          dispatch({
            type: CARGAR_USUARIO,
            payload: response.data,
          });
          break;
        default:
          alert('Ocurrio un error');
          break;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const activarGold = (id) => (dispatch) => {
  Axios.put('http://localhost:8080/users/' + id + '/gold').then((response) => {
    switch (response.status) {
      case 200:
        dispatch({
          type: ACTIVAR_GOLD,
          payload: response.data,
        });

        alert('El usuario ahora es GOLD!');
        break;
      default:
        alert(response.data);
        break;
    }
  });
};

export const cancelarGold = (id) => (dispatch) => {
  Axios.put('http://localhost:8080/users/' + id + '/cancelargold').then(
    (response) => {
      switch (response.status) {
        case 200:
          dispatch({
            type: CANCELAR_GOLD,
            payload: response.data,
          });
          alert('Se cancelo exitosamente la subscripcion a GOLD!');
          break;
        default:
          alert(response.data);
          break;
      }
    }
  );
};

export const modificarUsuario =
  (nombre, apellido, mail, clave, dni, fechaNacimiento, id) => (dispatch) => {
    const usuario = {
      nombre,
      apellido,
      mail,
      dni: parseInt(dni),
      clave,
      fechaNacimiento,
    };

    Axios.put('http://localhost:8080/users/' + id, {
      usuario: usuario,
      params: {
        id: id,
      },
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            dispatch({
              type: MODIFICAR_USUARIO,
              payload: response.data,
            });
            alert('Se modificaron los datos de usuario con exito');
            break;
          case 203:
            alert(response.data);
            break;
          default:
            alert(response.data);
            break;
        }
      })
      .catch(function (err) {
        alert(err);
      });
  };

  export const obtenerReviews = () => (dispatch, getState) => {
    try {
      Axios.get('http://localhost:8080/reviews', {}).then((response) => {
        switch (response.status) {
          case 200:
            dispatch({
              type: OBTENER_REVIEWS,
              payload: response.data,
            });
            break;
          default:
            alert('Ocurrio un error');
            break;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };