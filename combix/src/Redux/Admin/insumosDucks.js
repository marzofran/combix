import Axios from 'axios';
const configDuck = {
  elementos: [],
};
const REGISTRAR_INSUMO = 'REGISTRAR_INSUMO';
const CARGAR_INSUMO = 'CARGAR_INSUMO';
const BORRAR_INSUMO = 'BORRAR_INSUMO';
export default function reducerInsumos(state = configDuck, action) {
  switch (action.type) {
    case REGISTRAR_INSUMO:
      return {...state, elementos: action.payload};
    case CARGAR_INSUMO:
      return {...state, elementos: action.payload};
    case BORRAR_INSUMO:
      return {...state, elementos: action.payload};
    default:
      return state;
  }
}
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
