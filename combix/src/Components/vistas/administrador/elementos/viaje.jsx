import React, {useState} from 'react';
import {Accordion, Card} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
//import {borrarViaje, editarViaje} from '../../../../Redux/combixDucks';
import {cargarCombis} from '../../../../Redux/combixDucks';
import {cargarChoferes} from '../../../../Redux/combixDucks';
import {cargarRutas} from '../../../../Redux/combixDucks';
import dateFormat from '../../../../scripts/dateFormat'

//Implementado, faltan cruds
const Viaje = (props) => {
  const dispatch = useDispatch();
  const fechaViaje = Date.parse(props.item.fecha)

  const [ruta, setRuta] = useState('ruta');
  const [fecha, setFecha] = useState('fecha');
  const [horario, setHorario] = useState('horario');
  const [precio, setPrecio] = useState('precio');
  const [combi, setCombi] = useState('combi');
  const [chofer, setChofer] = useState('chofer');

  const handleChangeRuta = (e) => {
    let obj = JSON.parse(e.target.value);
    setRuta(obj);
  };
  const handleChangeFecha = (e) => {
    let obj = JSON.parse(e.target.value);
    setFecha(obj);
  };
  const handleChangeHorario = (e) => {
    let obj = JSON.parse(e.target.value);
    setHorario(obj);
  };
  const handleChangePrecio = (e) => {
    let obj = JSON.parse(e.target.value);
    setPrecio(obj);
    dispatch(cargarCombis());
  };
  const handleChangeCombi = (e) => {
    let obj = JSON.parse(e.target.value);
    setCombi(obj);
    dispatch(cargarChoferes());
  };
  const handleChangeChofer = (e) => {
    let obj = JSON.parse(e.target.value);
    setChofer(obj);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch(editarViaje(ruta, fecha, horario, precio, combi, chofer, props.item._id));
    props.estado();
  };

  const rutas = useSelector((store) => store.combix.rutas);
  const combis = useSelector((store) => store.combix.combis);
  const choferes = useSelector((store) => store.combix.choferes);

  return (
    <Accordion className='row db-element'>
      <Card className='col'>
        <Card.Header className='db-element-header row'>
          <Accordion.Toggle
            className='db-element-header col-11'
            as={Card.Body}
            eventKey='0'
          >
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Ruta:</label>
                <h6 className='field-display'>
                  {props.item.ruta?.origen.lugar}({props.item.ruta?.origen.provincia}) -> {props.item.ruta?.destino.lugar}({props.item.ruta?.destino.provincia})
                </h6>
              </div>
            </div>
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Fecha:</label>
                <h6 className='field-display'>{dateFormat(fechaViaje,"dd/mm/yyyy")}</h6>
              </div>
              <div className='col field-admin'>
                <label className='field-label'>Horario:</label>
                <h6 className='field-display'>{props.item.horario}</h6>
              </div>
            </div>
          </Accordion.Toggle>
          <div className='col-1'>
            <button
              data-toggle='modal'
              data-target={'#' + props.item.ruta}
              className='field-btn edit-btn box square'
            >
              <div className='content'>
                <i class='fa fa-pencil' aria-hidden='true' />
              </div>
            </button>
            <button
              className='field-btn delete-btn box square'
              onClick={() => {
                //dispatch(borrarViaje(props.item._id));
                props.estado();
              }}
            >
              <div className='content'>
                <i class='fa fa-trash' aria-hidden='true' />
              </div>
            </button>
          </div>
        </Card.Header>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
          <div className="row">
              <div className="col field-admin">
                <label className="field-label">Precio:</label>
                <h6 className="field-display">{props.item.precio}</h6>
              </div>
              <div className="col field-admin">
                <label className="field-label">Combi:</label>
                <h6 className="field-display">{props.item.combi?.modelo}({props.item.combi?.patente})</h6>
              </div>
            </div>
            <div className="row">
              <div className="col field-admin">
                <label className="field-label">Chofer:</label>
                <h6 className="field-display">{props.item.chofer?.nombre} {props.item.chofer?.apellido} ({props.item.chofer?.mail})</h6>
              </div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <div
        className='modal fade'
        id={props.item.ruta}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='modalViaje'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalViaje'>
                Cargar nuevo viaje
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='ruta'>Ruta:</label>

                  <select
                    onChange={handleChangeRuta}
                    id='ruta'
                    required
                    class='form-control'
                  >
                    <option>Seleccione una ruta</option>
                    {rutas.map((item, index) => (
                      <option value={JSON.stringify(item)}>
                        {item.origen.lugar} ({item.origen.provincia}) -> {item.destino.lugar} ({item.destino.provincia})
                      </option>
                    ))}
                  </select>
                </div>
                {ruta !== 'ruta' && (
                  <div className='form-group'>
                    <label htmlFor='fecha'>Fecha:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='fecha'
                      aria-describedby='Fecha'
                      placeholder='Seleccione la fecha'
                      required
                      onChange={handleChangeFecha}
                    />
                  </div>
                )}
                {fecha !== 'fecha' && (
                  <div className='form-group'>
                    <label htmlFor='horario'>Horario:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='horario'
                      aria-describedby='Horario'
                      placeholder='Seleccione el horario'
                      required
                      onChange={handleChangeHorario}
                    />
                  </div>
                )}
                {horario !== 'horario' && (
                  <div className='form-group'>
                    <label htmlFor='precio'>Precio:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='precio'
                      aria-describedby='Precio'
                      placeholder='Seleccione el precio'
                      required
                      onChange={handleChangePrecio}
                    />
                  </div>
                )}
                {precio !== 'precio' && (
                  <div className='form-group'>
                    <label htmlFor='combi'>Combi:</label>
                    <select
                      onChange={handleChangeCombi}
                      id='combi'
                      required
                      class='form-control'
                    >
                      <option>Seleccione una combi</option>
                      {combis.map((item) => (
                        <option value={JSON.stringify(item)}>
                          {item.modelo}, {item.patente}, {item.asientos}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {combi !== 'combi' && (
                  <div className='form-group'>
                  <label htmlFor='lugar'>Chofer:</label>
                  <select
                    onChange={handleChangeChofer}
                    id='chofer'
                    required
                    class='form-control'
                  >
                    <option>Seleccione una chofer</option>
                    {choferes.map((item) => (
                      <option value={JSON.stringify(item)}>
                        {item.nombre} {item.apellido} ({item.mail})
                      </option>
                    ))}
                  </select>
                </div>
                )}
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{backgroundColor: '#145572'}}
                >
                  Guardar viaje
                </button>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default Viaje;
