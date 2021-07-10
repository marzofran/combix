import Axios from 'axios';

const configDuck = {
  elementos: [],
};
const CARGAR_CHOFER = 'CARGAR_CHOFER';
const EDITAR_CHOFER = 'EDITAR_CHOFER';
const REGISTRAR_CHOFER = 'REGISTRAR_CHOFER';
const BORRAR_CHOFER = 'BORRAR_CHOFER';
const DAR_DE_ALTA_CHOFER = 'DAR_DE_ALTA_CHOFER';
const BORRADO_FISICO_CHOFER = 'BORRADO_FISICO_CHOFER';
export default function reducerChoferes(state = configDuck, action) {
  switch (action.type) {
    case CARGAR_CHOFER:
      return { ...state, elementos: action.payload };
    case EDITAR_CHOFER:
      return { ...state, elementos: action.payload };
    case REGISTRAR_CHOFER:
      return { ...state, elementos: action.payload };
    case BORRAR_CHOFER:
      return { ...state, elementos: action.payload };
    case DAR_DE_ALTA_CHOFER:
      return { ...state, elementos: action.payload };
    case BORRADO_FISICO_CHOFER:
      return { ...state, elementos: action.payload };
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
      mail: mail.toLowerCase(),
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
      mail: mail.toLowerCase(),
      telefono,
      dni,
      fechaNacimiento,
    };
    Axios.put('http://localhost:8080/drivers/' + idVieja, {
      params: { id: idVieja },
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
    params: { id: id },
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

export const darDeAltaChofer = (id, chofer) => (dispatch) => {
  Axios.put('http://localhost:8080/drivers/darAlta/' + id, {
    params: { id: id },
    chofer,
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
                  type: DAR_DE_ALTA_CHOFER,
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
export const borradoFisicoChofer = (id) => (dispatch) => {
  Axios.get('http://localhost:8080/buses/buscarPorChofer/' + id).then(
    (response) => {
      switch (response.status) {
        case 200:
          if (response.data.length > 0) {
            let mensaje;
            response.data.forEach((e) => {
              mensaje = 'patente: ' + e.patente + '';
            });
            alert(
              'No se puede borrar el elemento dado que posee las siguientes relaciones con combis:  ' +
                mensaje
            );
          } else {
            Axios.delete(
              'http://localhost:8080/drivers/borradoFisico/' + id
            ).then((response) => {
              switch (response.status) {
                case 200:
                  traerChoferes().then((choferes) => {
                    switch (choferes.status) {
                      case 200:
                        dispatch({
                          type: BORRADO_FISICO_CHOFER,
                          payload: choferes.data,
                        });
                        alert('El chofer fue eliminado fisicamente con exito');
                        break;
                      default:
                        console.log(choferes.data);
                        break;
                    }
                  });
                  break;
                default:
                  alert('ocurrio un error');
                  break;
              }
            });
          }

          break;
        default:
          alert('Ocurrio un error');
          break;
      }
    }
  );
};
