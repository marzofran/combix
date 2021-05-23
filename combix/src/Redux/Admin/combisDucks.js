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
  traerCombis()
    .then((response) => {
      switch (response.status) {
        case 200:
          dispatch({
            type: CARGAR_COMBI,
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

export const registrarCombi =
  (patente, modelo, cantidadAsientos, tipo, chofer) => (dispatch) => {
    const combi = {
      patente,
      modelo,
      cantidadAsientos,
      tipo,
      chofer,
    };

    Axios.post('http://localhost:8080/buses', combi)
      .then((response) => {
        switch (response.status) {
          case 202:
            alert(response.data);
            traerCombis()
              .then((response) => {
                switch (response.status) {
                  case 200:
                    dispatch({
                      type: REGISTRAR_COMBI,
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

export const editarCombi =
  (patente, modelo, cantidadAsientos, tipo, chofer, idVieja) => (dispatch) => {
    const combi = {
      patente,
      modelo,
      cantidadAsientos,
      tipo,
      chofer,
    };
    Axios.put('http://localhost:8080/buses/' + idVieja, {
      params: {id: idVieja},
      combi,
    }).then((response) => {
      switch (response.status) {
        case 200:
          alert(response.data);
          traerCombis()
            .then((response) => {
              switch (response.status) {
                case 200:
                  dispatch({
                    type: EDITAR_COMBI,
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
    });
  };

export const borrarCombi = (id) => (dispatch) => {
  Axios.delete('http://localhost:8080/buses/' + id, {
    params: {id: id},
  })
    .then((response) => {
      switch (response.status) {
        case 200:
          alert(response.data);
          traerCombis()
            .then((response) => {
              switch (response.status) {
                case 200:
                  dispatch({
                    type: ELIMINAR_COMBI,
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

async function traerCombis() {
  return await Axios.get('http://localhost:8080/buses', {})
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}
