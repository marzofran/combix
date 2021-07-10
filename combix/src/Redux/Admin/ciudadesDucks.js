import Axios from 'axios';

const configDuck = {
  elementos: [],
};

const REGISTRAR_CIUDAD = 'REGISTRAR_CIUDAD';
const CARGAR_CIUDAD = 'CARGAR_CIUDAD';
const EDITAR_CIUDAD = 'EDITAR_CIUDAD';
const BORRAR_CIUDAD = 'BORRAR_CIUDAD';
const DAR_DE_ALTA_CIUDAD = 'DAR_DE_ALTA_CIUDAD';
const BORRADO_FISICO_CIUDAD = 'BORRADO_FISICO_CIUDAD';
export default function reducerCiudades(state = configDuck, action) {
  switch (action.type) {
    case REGISTRAR_CIUDAD:
      return { ...state, elementos: action.payload };
    case CARGAR_CIUDAD:
      return { ...state, elementos: action.payload };
    case BORRAR_CIUDAD:
      return { ...state, elementos: action.payload };
    case EDITAR_CIUDAD:
      return { ...state, elementos: action.payload };
    case DAR_DE_ALTA_CIUDAD:
      return { ...state, elementos: action.payload };
    case BORRADO_FISICO_CIUDAD:
      return { ...state, elementos: action.payload };
    default:
      return state;
  }
}

//Acciones
export const registrarCiudad = (lugar, provincia) => (dispatch) => {
  const ciudad = {
    lugar: lugar.toLowerCase(),
    provincia: provincia.toLowerCase(),
  };
  Axios.post('http://localhost:8080/cities', ciudad)
    .then((response) => {
      switch (response.status) {
        case 202:
          alert(response.data);
          traerCiudades().then((ciudades) => {
            switch (ciudades.status) {
              case 200:
                dispatch({
                  type: REGISTRAR_CIUDAD,
                  payload: ciudades.data,
                });
                break;
              default:
                console.log(ciudades.data);
                break;
            }
          });
          break;
        default:
          alert(response.data);
          break;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const cargarCiudades = () => (dispatch, getState) => {
  traerCiudades().then((ciudades) => {
    switch (ciudades.status) {
      case 200:
        dispatch({
          type: CARGAR_CIUDAD,
          payload: ciudades.data,
        });
        break;
      default:
        console.log(ciudades.data);
        break;
    }
  });
};

export const borrarCiudad = (id) => (dispatch) => {
  Axios.delete('http://localhost:8080/cities/' + id, {
    params: { id: id },
  })
    .then((response) => {
      switch (response.status) {
        case 200:
          console.log(response);
          alert(response.data);
          traerCiudades().then((ciudades) => {
            switch (ciudades.status) {
              case 200:
                dispatch({
                  type: BORRAR_CIUDAD,
                  payload: ciudades.data,
                });
                break;
              default:
                console.log(ciudades.data);
                break;
            }
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

export const editarCiudad = (lugar, provincia, id) => (dispatch) => {
  const ciudad = {
    lugar: lugar.toLowerCase(),
    provincia: provincia.toLowerCase(),
  };

  Axios.put('http://localhost:8080/cities/' + id, {
    ciudad,
    params: {
      id: id,
    },
  })
    .then((response) => {
      switch (response.status) {
        case 200:
          alert('Se modifico la ciudad con exito');
          traerCiudades().then((ciudades) => {
            switch (ciudades.status) {
              case 200:
                dispatch({
                  type: EDITAR_CIUDAD,
                  payload: ciudades.data,
                });
                break;
              default:
                console.log(ciudades.data);
                break;
            }
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

//get

async function traerCiudades() {
  return await Axios.get('http://localhost:8080/cities', {})
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}
export const darDeAltaCiudad = (id, ciudad) => (dispatch) => {
  Axios.put('http://localhost:8080/cities/darDeAlta/' + id, {
    params: { id: id },
    ciudad,
  })
    .then((response) => {
      switch (response.status) {
        case 200:
          console.log(response);
          alert(response.data);
          traerCiudades().then((ciudades) => {
            switch (ciudades.status) {
              case 200:
                dispatch({
                  type: DAR_DE_ALTA_CIUDAD,
                  payload: ciudades.data,
                });
                break;
              default:
                console.log(ciudades.data);
                break;
            }
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

export const borradoFisico = (id) => (dispatch) => {
  Axios.get('http://localhost:8080/routes/buscarPorCiudad/' + id).then(
    (response) => {
      switch (response.status) {
        case 200:
          if (response.data.length > 0) {
            console.log(response.data);
            let mensaje;
            response.data.forEach((e) => {
              mensaje =
                'origen: ' +
                e.origen.provincia +
                ' ' +
                'destino: ' +
                e.destino.provincia +
                ' ';
            });
            alert(
              'No se puede borrar el elemento dado que posee las siguientes relaciones con rutas:  ' +
                mensaje
            );
          } else {
            Axios.delete(
              'http://localhost:8080/cities/borradoFisico/' + id
            ).then((response) => {
              switch (response.status) {
                case 200:
                  traerCiudades().then((ciudades) => {
                    switch (ciudades.status) {
                      case 200:
                        dispatch({
                          type: BORRADO_FISICO_CIUDAD,
                          payload: ciudades.data,
                        });
                        alert('La ciudad se elimino fisicamente con exito');
                        break;
                      default:
                        console.log(ciudades.data);
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
