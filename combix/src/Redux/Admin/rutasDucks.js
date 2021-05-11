import Axios from 'axios';

const configDuck = {
  elementos: [],
};

const REGISTRAR_RUTA = 'REGISTRAR_RUTA';
const CARGAR_RUTA = 'CARGAR_RUTA';
const BORRAR_RUTA = 'BORRAR_RUTA';
export default function reducerRutas(state = configDuck, action) {
  switch (action.type) {
    case REGISTRAR_RUTA:
      return {...state, elementos: action.payload};
    case CARGAR_RUTA:
      return {...state, elementos: action.payload};
    case BORRAR_RUTA:
      return {...state, elementos: action.payload};
    default:
      return state;
  }
}
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

export const editarRuta =
  (origen, destino, combi, horario, idRutaVieja) => (dispatch) => {
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
