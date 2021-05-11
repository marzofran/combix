import Axios from 'axios';

const configDuck = {
  elementos: [],
};
const CARGAR_COMBI = 'CARGAR_COMBI';
const REGISTRAR_COMBI = 'REGISTRAR_COMBI';
const ELIMINAR_COMBI = 'ELIMINAR_COMBI ';
const EDITAR_COMBI = 'EDITAR_COMBI';

export default function reducerCombis(state = configDuck, action) {
  switch (action.type) {
    case REGISTRAR_COMBI:
      return {...state, elementos: action.payload};
    case CARGAR_COMBI:
      return {...state, elementos: action.payload};
    case ELIMINAR_COMBI:
      return {...state, elementos: action.payload};
    case EDITAR_COMBI:
      return {...state, elementos: action.payload};
    default:
      return state;
  }
}
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

export const registrarCombi =
  (patente, modelo, cantidadAsientos, tipo, chofer) => () => {
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

export const editarCombi =
  (patente, modelo, cantidadAsientos, tipo, chofer, idVieja) => (dispatch) => {
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
