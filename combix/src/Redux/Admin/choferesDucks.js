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
  traerChoferes()
    .then((response) => {
      switch (response.status) {
        case 200:
          dispatch({
            type: CARGAR_CHOFER,
            payload: response.data,
          });
          break;
        default:
          alert(response.data);
          break;
      }
    })
    .catch(function (error) {
      alert(error);
    });
};

export const registrarChofer =
  (nombre, apellido, mail, DNI, telefono, fecha) => (dispatch) => {
    const chofer = {
      nombre,
      apellido,
      mail,
      DNI,
      telefono,
      fecha,
    };
    Axios.post('http://localhost:8080/drivers', chofer)
      .then((response) => {
        switch (response.status) {
          case 202:
            alert(response.data);
            traerChoferes().then((response) => {
              switch (response.status) {
                case 200:
                  dispatch({
                    type: REGISTRAR_CHOFER,
                    payload: response.data,
                  });
                  break;
                default:
                  alert(response.data);
                  break;
              }
            });
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
    Axios.put('http://localhost:8080/drivers/' + idVieja, {
      params: {id: idVieja},
      chofer: chofer,
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            alert(response.data);
            traerChoferes().then((response) => {
              switch (response.status) {
                case 200:
                  dispatch({
                    type: EDITAR_CHOFER,
                    payload: response.data,
                  });
                  break;
                default:
                  alert(response.data);
                  break;
              }
            });
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

export const borrarChofer = (id) => (dispatch) => {
  Axios.delete('http://localhost:8080/drivers/' + id, {
    params: {id: id},
  })
    .then((response) => {
      console.log(response);
      switch (response.status) {
        case 200:
          alert(response.data);
          traerChoferes().then((response) => {
            switch (response.status) {
              case 200:
                dispatch({
                  type: BORRAR_CHOFER,
                  payload: response.data,
                });
                break;
              default:
                alert(response.data);
                break;
            }
          });
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
async function traerChoferes() {
  return await Axios.get('http://localhost:8080/drivers', {})
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}
