import Axios from 'axios';
const configDuck = {
  elementos: [],
};
const REGISTRAR_INSUMO = 'REGISTRAR_INSUMO';
const CARGAR_INSUMO = 'CARGAR_INSUMO';
const BORRAR_INSUMO = 'BORRAR_INSUMO';
const EDITAR_INSUMO = 'EDITAR_INSUMO';
const DAR_DE_ALTA_INSUMOS = 'DAR_DE_ALTA_INSUMOS';
export default function reducerInsumos(state = configDuck, action) {
  switch (action.type) {
    case REGISTRAR_INSUMO:
      return { ...state, elementos: action.payload };
    case CARGAR_INSUMO:
      return { ...state, elementos: action.payload };
    case BORRAR_INSUMO:
      return { ...state, elementos: action.payload };
    case EDITAR_INSUMO:
      return { ...state, elementos: action.payload };
    case DAR_DE_ALTA_INSUMOS:
      return { ...state, elementos: action.payload };
    default:
      return state;
  }
}
//Insumos
export const registrarInsumo = (nombre, tipo, precio) => (dispatch) => {
  const insumo = {
    nombre: nombre.toLowerCase(),
    precio,
    tipo,
  };
  Axios.post('http://localhost:8080/supplies', insumo)
    .then((response) => {
      switch (response.status) {
        case 202:
          alert(response.data);
          traerInsumos()
            .then((response) => {
              switch (response.status) {
                case 200:
                  dispatch({
                    type: REGISTRAR_INSUMO,
                    payload: response.data,
                  });
                  break;
                default:
                  alert(response.data);
                  break;
              }
            })
            .catch(function (err) {
              console.log(err);
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

export const cargarInsumos = () => (dispatch, getState) => {
  traerInsumos()
    .then((response) => {
      switch (response.status) {
        case 200:
          dispatch({
            type: CARGAR_INSUMO,
            payload: response.data,
          });
          break;
        default:
          alert(response.data);
          break;
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};

export const borrarInsumo = (id) => (dispatch) => {
  Axios.get('http://localhost:8080/tickets/traerPorInsumo/' + id).then(
    (response) => {
      console.log(response.data.length);
      if (response.data.length < 1) {
        Axios.put('http://localhost:8080/supplies/bajaLogica/' + id, { id })
          .then((response) => {
            switch (response.status) {
              case 200:
                alert(response.data);
                traerInsumos()
                  .then((response) => {
                    switch (response.status) {
                      case 200:
                        dispatch({
                          type: CARGAR_INSUMO,
                          payload: response.data,
                        });
                        break;
                      default:
                        alert(response.data);
                        break;
                    }
                  })
                  .catch(function (err) {
                    console.log(err);
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
      } else {
        alert(
          'No se puede dar de baja el insumo por que tiene relaciones con pasajes activas'
        );
      }
    }
  );
};
export const borrarInsumoFisica = (id) => (dispatch) => {
  Axios.get('http://localhost:8080/tickets/traerPorInsumoSinEstado/' + id).then(
    (response) => {
      console.log(response.data.length);
      if (response.data.length < 1) {
        Axios.delete('http://localhost:8080/supplies/' + id, { id })
          .then((response) => {
            switch (response.status) {
              case 200:
                alert(response.data);
                traerInsumos()
                  .then((response) => {
                    switch (response.status) {
                      case 200:
                        dispatch({
                          type: CARGAR_INSUMO,
                          payload: response.data,
                        });
                        break;
                      default:
                        alert(response.data);
                        break;
                    }
                  })
                  .catch(function (err) {
                    console.log(err);
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
      } else {
        alert(
          'No se puede dar de baja el insumo por que tiene relaciones con pasajes '
        );
      }
    }
  );
};

export const editarInsumo = (nombre, tipo, precio, id) => (dispatch) => {
  const insumo = {
    nombre: nombre.toLowerCase(),
    tipo,
    precio,
  };
  Axios.get('http://localhost:8080/tickets/traerPorInsumo/' + id)
    .then((response) => {
      if (response.data.length < 1) {
        Axios.put('http://localhost:8080/supplies/' + id, {
          insumo: insumo,
          params: {
            id: id,
          },
        }).then((response) => {
          switch (response.status) {
            case 202:
              alert(response.data);
              traerInsumos()
                .then((response) => {
                  switch (response.status) {
                    case 200:
                      dispatch({
                        type: EDITAR_INSUMO,
                        payload: response.data,
                      });
                      break;
                    default:
                      alert(response.data);
                      break;
                  }
                })
                .catch(function (err) {
                  console.log(err);
                });
              break;
            default:
              alert(response.data);
              break;
          }
        });
      } else {
        alert(
          'No se puede editar por que el insumo tiene alguna relacion con un pasaje activa'
        );
      }
    })
    .catch(function (err) {
      alert(err);
    });
};

async function traerInsumos() {
  return await Axios.get('http://localhost:8080/supplies', {})
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}
export const darDeAltaInsumo = (id, insumo) => (dispatch) => {
  Axios.put('http://localhost:8080/supplies/darDeAlta/' + id, {
    params: { id: id },
    insumo,
  })
    .then((response) => {
      switch (response.status) {
        case 200:
          alert(response.data);
          traerInsumos()
            .then((response) => {
              switch (response.status) {
                case 200:
                  dispatch({
                    type: DAR_DE_ALTA_INSUMOS,
                    payload: response.data,
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
