import Axios from 'axios';

const configDuck = {
  elementos: [],
};

const REGISTRAR_RUTA = 'REGISTRAR_RUTA';
const CARGAR_RUTA = 'CARGAR_RUTA';
const BORRAR_RUTA = 'BORRAR_RUTA';
const EDITAR_RUTA = 'EDITAR_RUTA';
const DAR_DE_ALTA_RUTA = 'DAR_DE_ALTA_RUTA,';

export default function reducerRutas(state = configDuck, action) {
  switch (action.type) {
    case REGISTRAR_RUTA:
      return { ...state, elementos: action.payload };
    case CARGAR_RUTA:
      return { ...state, elementos: action.payload };
    case BORRAR_RUTA:
      return { ...state, elementos: action.payload };
    case EDITAR_RUTA:
      return { ...state, elementos: action.payload };
    case DAR_DE_ALTA_RUTA:
      return { ...state, elementos: action.payload };
    default:
      return state;
  }
}
export const cargarRutas = () => (dispatch, getState) => {
  traerRutas()
    .then((response) => {
      switch (response.status) {
        case 200:
          dispatch({
            type: CARGAR_RUTA,
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
};

export const registrarRuta =
  (origen, destino, combi, horario) => (dispatch) => {
    const ruta = {
      origen,
      destino,
      combi,
      horario,
    };
    Axios.post('http://localhost:8080/routes', ruta)
      .then((response) => {
        switch (response.status) {
          case 202:
            alert(response.data);
            traerRutas()
              .then((response) => {
                switch (response.status) {
                  case 200:
                    dispatch({
                      type: REGISTRAR_RUTA,
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

export const borrarRuta = (_id) => (dispatch) => {
  Axios.delete('http://localhost:8080/routes/' + _id, {
    params: {
      id: _id,
    },
  })
    .then((response) => {
      switch (response.status) {
        case 200:
          alert(response.data);
          traerRutas()
            .then((response) => {
              switch (response.status) {
                case 200:
                  dispatch({
                    type: BORRAR_RUTA,
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

export const editarRuta =
  (origen, destino, combi, horario, idRutaVieja) => (dispatch) => {
    const ruta = {
      origen,
      destino,
      combi,
      horario,
    };
    Axios.put('http://localhost:8080/routes/' + idRutaVieja, {
      data: { ruta: ruta },
      params: { id: idRutaVieja },
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            alert('Se modifico la ruta con exito');
            traerRutas()
              .then((response) => {
                switch (response.status) {
                  case 200:
                    dispatch({
                      type: EDITAR_RUTA,
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

async function traerRutas() {
  return await Axios.get('http://localhost:8080/routes', {})
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}
export const darDeAltaRuta = (_id) => (dispatch) => {
  Axios.put('http://localhost:8080/routes/darDeAlta/' + _id, {
    params: {
      id: _id,
    },
  })
    .then((response) => {
      switch (response.status) {
        case 200:
          alert(response.data);
          traerRutas()
            .then((response) => {
              switch (response.status) {
                case 200:
                  dispatch({
                    type: DAR_DE_ALTA_RUTA,
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
