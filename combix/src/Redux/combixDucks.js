import Axios from 'axios';
//Usando ducks docs: https://github.com/erikras/ducks-modular-redux
import history from '../Components/history.js';

//constantes
const configDuck = {
  sesion: {},
  ciudades: [],
  insumos: [],
  rutas: [],
  combis: [],
};
const OBETENER_DATOS_USUARIO = 'OBTENER_DATOS_USUARIO';
const CERRAR_SESION = 'CERRAR_SESION';
const REGISTRAR_USUARIO = 'REGISTRAR_USUARIO';
const REGISTRAR_CIUDAD = 'REGISTRAR_CIUDAD';
const CARGAR_CIUDAD = 'CARGAR_CIUDAD';
const BORRAR_CIUDAD = 'BORRAR_CIUDAD';
const REGISTRAR_INSUMO = 'REGISTRAR_INSUMO';
const CARGAR_INSUMO = 'CARGAR_INSUMO';
const BORRAR_INSUMO = 'BORRAR_INSUMO';

const REGISTRAR_RUTA = 'REGISTRAR_RUTA';
const CARGAR_RUTA = 'CARGAR_RUTA';
const BORRAR_RUTA = 'BORRAR_RUTA';

const CARGAR_COMBI = 'CARGAR_COMBI';

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
    case CARGAR_CIUDAD:
      return {...state, ciudades: action.payload};
    case BORRAR_CIUDAD:
      return {...state, ciudades: action.payload};
    case REGISTRAR_INSUMO:
      return {...state, sesion: action.payload};
    case CARGAR_INSUMO:
      return {...state, insumos: action.payload};
    case BORRAR_INSUMO:
      return {...state, insumos: action.payload};
    case REGISTRAR_RUTA:
      return {...state, rutas: action.payload};
    case CARGAR_RUTA:
      return {...state, rutas: action.payload};
    case BORRAR_RUTA:
      return {...state, rutas: action.payload};
    case CARGAR_COMBI:
      return {...state, combis: action.payload};
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
            case '6094d45f56d99b266076c0bf':
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
  Axios.post('http://localhost:8080/cities', ciudad).then((response) => {
    switch (response.status) {
      case 200:
        alert('Se guardo la ciudad con exito');
        break;
      case 202:
        alert('El lugar y la ciudad ya se encuentran creados');
        break;
      default:
        alert('Hubo un error con el registro de la ciudad');
        break;
    }
  });
};

export const cargarCiudades = () => (dispatch, getState) => {
  try {
    Axios.get('http://localhost:8080/cities', {}).then((response) => {
      switch (response.status) {
        case 200:
          dispatch({
            type: CARGAR_CIUDAD,
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

export const borrarCiudad = (lugar, provincia) => (dispatch) => {
  const ciudad = {
    lugar: lugar,
    provincia: provincia,
  };
  try {
    Axios.delete('http://localhost:8080/cities', {data: {ciudad: ciudad}}).then(
      (response) => {
        switch (response.status) {
          case 200:
            alert('Se elimino con exito');
            break;
          default:
            alert('Ocurrio un error');
            break;
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const editarCiudad = (lugar, provincia, idCiudadVieja) => (dispatch) => {
  const ciudad = {
    lugar: lugar,
    provincia: provincia,
  };
  try {
    Axios.put('http://localhost:8080/cities', {
      data: {ciudad: ciudad, idCiudadVieja: idCiudadVieja},
    }).then((response) => {
      switch (response.status) {
        case 200:
          alert('Se modifico con exito');
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

export const registrarInsumo = (nombre, tipo, precio) => () => {
  const insumo = {
    nombre,
    tipo,
    precio,
  };
  Axios.post('http://localhost:8080/supplies', insumo).then((response) => {
    switch (response.status) {
      case 200:
        alert('Se guardo el insumo con exito');
        break;
      case 202:
        alert('El insumo ya se encuentra creado');
        break;
      default:
        alert('Hubo un error con el registro del insumo');
        break;
    }
  });
};

export const cargarInsumos = () => (dispatch, getState) => {
  try {
    Axios.get('http://localhost:8080/supplies', {}).then((response) => {
      switch (response.status) {
        case 200:
          dispatch({
            type: CARGAR_INSUMO,
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

export const borrarInsumo = (nombre, tipo, precio) => (dispatch) => {
  const insumo = {
    nombre,
    tipo,
    precio,
  };
  try {
    Axios.delete('http://localhost:8080/supplies', {data: {insumo}}).then(
      (response) => {
        switch (response.status) {
          case 200:
            alert('Se elimino con exito');
            break;
          default:
            alert('Ocurrio un error');
            break;
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const editarInsumo = (nombre, tipo, precio, idInsumoViejo) => (
  dispatch
) => {
  const insumo = {
    nombre,
    tipo,
    precio,
  };
  try {
    Axios.put('http://localhost:8080/supplies', {
      data: {insumo, idInsumoViejo},
    }).then((response) => {
      switch (response.status) {
        case 200:
          alert('Se modifico con exito');
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

export const cargarRutas = () => (dispatch, getState) => {
  try {
    Axios.get('http://localhost:8080/routes', {}).then((response) => {
      switch (response.status) {
        case 200:
          console.log(response.data);
          dispatch({
            type: CARGAR_RUTA,
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

export const registrarRuta = (origen, destino, combi, horario) => () => {
  const ruta = {
    origen,
    destino,
    combi,
    horario,
  };
  Axios.post('http://localhost:8080/routes', ruta).then((response) => {
    switch (response.status) {
      case 200:
        alert('Se guardo la ruta con exito');
        break;
      case 202:
        alert('la ruta ya se encuntra creada');
        break;
      default:
        alert('Hubo un error con el registro del insumo');
        break;
    }
  });
};

export const cargarCombis = () => (dispatch, getState) => {
  try {
    Axios.get('http://localhost:8080/buses', {}).then((response) => {
      switch (response.status) {
        case 200:
          dispatch({
            type: CARGAR_COMBI,
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
export const borrarRuta = (_id) => (dispatch) => {
  try {
    Axios.delete('http://localhost:8080/routes', {data: {_id}}).then(
      (response) => {
        switch (response.status) {
          case 200:
            alert('Se elimino con exito');
            break;
          default:
            alert('Ocurrio un error');
            break;
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const editarRuta = (origen, destino, combi, horario, idRutaVieja) => (
  dispatch
) => {
  const ruta = {
    origen,
    destino,
    combi,
    horario,
  };
  try {
    Axios.put('http://localhost:8080/routes', {
      data: {ruta: ruta, idRutaVieja: idRutaVieja},
    }).then((response) => {
      switch (response.status) {
        case 200:
          alert('Se modifico con exito');
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
