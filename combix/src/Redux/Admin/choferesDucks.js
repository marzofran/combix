import Axios from 'axios';

const configDuck = {
  elementos: [],
};
const CARGAR_CHOFER = 'CARGAR_CHOFER';
const EDITAR_CHOFER = 'EDITAR_CHOFER';
const REGISTRAR_CHOFER = 'REGISTRAR_CHOFER';
const BORRAR_CHOFER = 'BORRAR_CHOFER';
export default function reducerChoferes(state = configDuck, action) {
  switch (action.type) {
    case CARGAR_CHOFER:
      return {...state, elementos: action.payload};
    case EDITAR_CHOFER:
      return {...state, elementos: action.payload};
    case REGISTRAR_CHOFER:
      return {...state, elementos: action.payload};
    case BORRAR_CHOFER:
      return {...state, elementos: action.payload};
    default:
      return state;
  }
}

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

export const registrarChofer =
  (nombre, apellido, mail, DNI, telefono, fecha) => () => {
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

export const editarChofer =
  (nombre, apellido, mail, dni, telefono, fechaNacimiento, idVieja) =>
  (dispatch) => {
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
