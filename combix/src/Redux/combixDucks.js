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
  choferes: [],
  usuarios: [],
  viajes: [],
};
const OBETENER_DATOS_USUARIO = 'OBTENER_DATOS_USUARIO';
const CERRAR_SESION = 'CERRAR_SESION';
const REGISTRAR_USUARIO = 'REGISTRAR_USUARIO';
const CARGAR_USUARIO = 'CARGAR_USUARIO';

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

const CARGAR_CHOFER = 'CARGAR_CHOFER';

const CARGAR_VIAJES = 'CARGAR_VIAJES';
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
    case CARGAR_USUARIO:
      return {...state, usuarios: action.payload};
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
    case CARGAR_CHOFER:
      return {...state, choferes: action.payload};
    case CARGAR_VIAJES:
      return {...state, viajes: action.payload};
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
          alert('Usuario o contraseña incorrecta');
          break;
        case 203:
          alert('Usuario o contraseña incorrecta');
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

//Ciudades
export const registrarCiudad = (lugar, provincia) => () => {
  const ciudad = {
    lugar: lugar,
    provincia: provincia,
  };
  Axios.post('http://localhost:8080/cities', ciudad).then((response) => {
    switch (response.status) {
      case 202:
        alert('Se registro la ciudad con exito');
        break;
      case 203:
        alert('Esa provincia y ese lugar ya se encuentran creados');
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

export const borrarCiudad = (id) => (dispatch) => {
  try {
    Axios.delete('http://localhost:8080/cities/' + id, {
      params: {id: id},
    }).then((response) => {
      switch (response.status) {
        case 200:
          console.log(response);
          alert(response.data);
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

export const editarCiudad = (lugar, provincia, id) => (dispatch) => {
  const ciudad = {
    lugar: lugar,
    provincia: provincia,
  };
  try {
    Axios.put('http://localhost:8080/cities/' + id, {
      ciudad,
      params: {
        id: id,
      },
    }).then((response) => {
      switch (response.status) {
        case 200:
          alert('Se modifico la ciudad con exito');
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

//Insumos
export const registrarInsumo = (nombre, tipo, precio) => () => {
  const insumo = {
    nombre,
    precio,
    tipo,
  };
  Axios.post('http://localhost:8080/supplies', insumo).then((response) => {
    switch (response.status) {
      case 202:
        alert('Se registro el insumo con exito');
        break;
      case 203:
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

export const borrarInsumo = (id) => (dispatch) => {
  try {
    Axios.delete('http://localhost:8080/supplies/' + id, {id}).then(
      (response) => {
        switch (response.status) {
          case 200:
            alert('Se elimino el insumo con exito');
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

export const editarInsumo = (nombre, tipo, precio, id) => (dispatch) => {
  const insumo = {
    nombre,
    tipo,
    precio,
  };
  try {
    Axios.put('http://localhost:8080/supplies/' + id, {
      insumo: insumo,
      params: {
        id: id,
      },
    }).then((response) => {
      switch (response.status) {
        case 200:
          alert('Se modifico el insumo con exito');
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

//Rutas
export const cargarRutas = () => (dispatch, getState) => {
  try {
    Axios.get('http://localhost:8080/routes', {}).then((response) => {
      switch (response.status) {
        case 200:
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
      case 202:
        alert('Se guardo la ruta con exito');
        break;
      case 203:
        alert('la ruta ya se encuntra creada');
        break;
      default:
        alert('Hubo un error con el registro del insumo');
        break;
    }
  });
};

export const borrarRuta = (_id) => (dispatch) => {
  try {
    Axios.delete('http://localhost:8080/routes/' + _id, {data: {_id}}).then(
      (response) => {
        switch (response.status) {
          case 200:
            alert('Se elimino la ruta con exito');
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
    Axios.put('http://localhost:8080/routes/' + idRutaVieja, {
      data: {ruta: ruta, idRutaVieja: idRutaVieja},
    }).then((response) => {
      switch (response.status) {
        case 200:
          alert('Se modifico la ruta con exito');
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

//Combis
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

export const registrarCombi = (
  patente,
  modelo,
  cantidadAsientos,
  tipo,
  chofer
) => () => {
  const combi = {
    patente,
    modelo,
    cantidadAsientos,
    tipo,
    chofer,
  };

  Axios.post('http://localhost:8080/buses', combi).then((response) => {
    switch (response.status) {
      case 202:
        alert('Se guardo la combi con exito');
        break;
      case 203:
        alert('la combi ya se encuntra creada');
        break;
      default:
        alert('Hubo un error con el registro de la combi');
        break;
    }
  });
};

export const editarCombi = (
  patente,
  modelo,
  cantidadAsientos,
  tipo,
  chofer,
  idVieja
) => (dispatch) => {
  const combi = {
    patente,
    modelo,
    cantidadAsientos,
    tipo,
    chofer,
  };

  try {
    Axios.put('http://localhost:8080/buses/' + idVieja, {
      params: {id: idVieja},
      combi,
    }).then((response) => {
      switch (response.status) {
        case 200:
          alert('Se modifico la combi con exito');
          break;
        default:
          alert('Ocurrio un error');
          break;
      }
      console.log(response);
    });
  } catch (error) {
    console.log(error);
  }
};

export const borrarCombi = (id) => (dispatch) => {
  try {
    Axios.delete('http://localhost:8080/buses/' + id, {
      data: {id: id},
    }).then((response) => {
      switch (response.status) {
        case 200:
          console.log(response);
          alert('Se elimino la combi con  exito');
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

export const cargarChoferes = () => (dispatch, getState) => {
  try {
    Axios.get('http://localhost:8080/drivers', {}).then((response) => {
      switch (response.status) {
        case 200:
          dispatch({
            type: CARGAR_CHOFER,
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

export const registrarChofer = (
  nombre,
  apellido,
  mail,
  DNI,
  telefono,
  fecha
) => () => {
  const chofer = {
    nombre,
    apellido,
    mail,
    DNI,
    telefono,
    fecha,
  };
  Axios.post('http://localhost:8080/drivers', chofer).then((response) => {
    switch (response.status) {
      case 202:
        alert('Se registro el chofer con exito');
        break;
      case 203:
        alert('el chofer ya se encuntra registrado');
        break;
      default:
        alert('Hubo un error con el registro del chofer');
        break;
    }
  });
};

export const editarChofer = (
  nombre,
  apellido,
  mail,
  dni,
  telefono,
  fechaNacimiento,
  idVieja
) => (dispatch) => {
  const chofer = {
    nombre,
    apellido,
    mail,
    telefono,
    dni,
    fechaNacimiento,
  };
  try {
    Axios.put('http://localhost:8080/drivers/' + idVieja, {
      params: {id: idVieja},
      chofer: chofer,
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

export const borrarChofer = (id) => (dispatch) => {
  try {
    Axios.delete('http://localhost:8080/drivers/' + id, {
      data: {id: id},
    }).then((response) => {
      switch (response.status) {
        case 200:
          console.log(response);
          alert('Se elimino el chofer con  exito');
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

export const registrarViaje = (ruta, fecha, precio) => () => {
  const viaje = {
    ruta,
    fecha,
    precio,
  };

  Axios.post('http://localhost:8080/travels', viaje).then((response) => {
    switch (response.status) {
      case 202:
        alert('Se registro el viaje con exito');
        break;
      case 203:
        alert('El viaje ya se encuentra registrado');
        break;
      default:
        alert('Hubo un error con el registro del del viaje');
        break;
    }
  });
};

export const cargarViajes = () => (dispatch, getState) => {
  try {
    Axios.get('http://localhost:8080/travels').then((response) => {
      switch (response.status) {
        case 200:
          dispatch({
            type: CARGAR_VIAJES,
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

export const borrarViaje = (id) => (dispatch) => {
  try {
    Axios.delete('http://localhost:8080/travels/' + id, {
      data: {id: id},
    }).then((response) => {
      switch (response.status) {
        case 200:
          console.log(response);
          alert('Se elimino el viaje con exito');
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
export const editarViaje = (ruta, fecha, precio, idVieja) => (dispatch) => {
  const viaje = {
    ruta,
    fecha,
    precio,
  };
  try {
    Axios.put('http://localhost:8080/travels/' + idVieja, {
      params: {id: idVieja},
      viaje,
    }).then((response) => {
      switch (response.status) {
        case 200:
          alert('Se modifico el viaje con exito');
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
