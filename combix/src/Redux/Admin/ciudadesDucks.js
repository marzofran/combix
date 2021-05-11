import Axios from 'axios';

const configDuck = {
  elementos: [],
};

const REGISTRAR_CIUDAD = 'REGISTRAR_CIUDAD';
const CARGAR_CIUDAD = 'CARGAR_CIUDAD';
const EDITAR_CIUDAD = 'CARGAR_CIUDAD';
const BORRAR_CIUDAD = 'BORRAR_CIUDAD';

export default function reducerCiudades(state = configDuck, action) {
  switch (action.type) {
    case REGISTRAR_CIUDAD:
      return {...state, elementos: action.payload};
    case CARGAR_CIUDAD:
      return {...state, elementos: action.payload};
    case BORRAR_CIUDAD:
      return {...state, elementos: action.payload};
    case EDITAR_CIUDAD:
      return {...state, elementos: action.payload};
    default:
      return state;
  }
}

//Acciones
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
