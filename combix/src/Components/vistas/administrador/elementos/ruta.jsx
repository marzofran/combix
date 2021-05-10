import React, {useState} from 'react';
import {Accordion, Card} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {borrarRuta, editarRuta} from '../../../../Redux/combixDucks';
import {cargarCombis} from '../../../../Redux/combixDucks';

//Implementado
const Ruta = (props) => {
  const dispatch = useDispatch();

  const [origen, setOrigen] = useState(props.item.origen);
  const [destino, setDestino] = useState(props.item.destino);
  const [combi, setCombi] = useState(props.item.combi);
  const [horario, setHorario] = useState(props.item.horario);

  const handleChangeOrigen = (e) => {
    let obj = JSON.parse(e.target.value);
    setOrigen(obj);
  };
  const handleChangeDestino = (e) => {
    let obj = JSON.parse(e.target.value);
    setDestino(obj);
    dispatch(cargarCombis());
  };
  const handleChangeCombi = (e) => {
    let obj = JSON.parse(e.target.value);
    setCombi(obj);
  };
  const handleChangeHorario = (e) => {
    setHorario(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editarRuta(origen, destino, combi, horario, props.item._id));
    props.estado();
  };

  const ciudades = useSelector((store) => store.combix.ciudades);
  const combis = useSelector((store) => store.combix.combis);
  return (
    <Accordion className='row db-element'>
      <Card className='col'>
        <Card.Header className='db-element-header row'>
          <Accordion.Toggle
            className='db-element-header col-11'
            as={Card.Body}
            eventKey='1'
          >
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Salida:</label>
                <h6 className='field-display'>
                {props.item.origen?.lugar}, {props.item.origen?.provincia}
                </h6>
              </div>
              <div className='col field-admin'>
                <label className='field-label'>Destino:</label>
                <h6 className='field-display'>
                {props.item.destino?.lugar}, {props.item.destino?.provincia}
                </h6>
              </div>
            </div>
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Combi:</label>
                <h6 className='field-display'>
                  {props.item.combi?.modelo} ({props.item.combi?.patente})
                </h6>
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
              data-target={'#' + props.item.origen.provincia}
              className='field-btn edit-btn box square'
            >
              <div className='content'>
                <i class='fa fa-pencil' aria-hidden='true' />
              </div>
            </button>
            <button
              className='field-btn delete-btn box square'
              onClick={() => {
                dispatch(borrarRuta(props.item._id));
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
          <Card.Body>I have no body</Card.Body>
        </Accordion.Collapse>
      </Card>
      <div
        className='modal fade'
        id={props.item.origen.provincia}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='modalCiudad'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalCiudad'>
                Editar ruta: {props.item.origen?.lugar} {" -> "}
                {props.item.destino?.lugar}
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
                  <label htmlFor='lugar'>Origen</label>

                  <select
                    onChange={handleChangeOrigen}
                    id='origen'
                    required
                    class='form-control'
                  >
                    {ciudades.map((item, index) => (
                      item.provincia === origen.provincia && item.lugar === origen.lugar ?
                      <option value={JSON.stringify(item)} selected>
                          {item.lugar}, {item.provincia}
                        </option>
                        :
                        <option value={JSON.stringify(item)}>
                          {item.lugar}, {item.provincia}
                        </option>
                    ))}
                  </select>
                </div>
                {origen !== 'origen' && (
                  <div className='form-group'>
                    <label htmlFor='lugar'>Destino:</label>
                    <select
                      onChange={handleChangeDestino}
                      id='origen'
                      required
                      class='form-control'
                    >
                      {ciudades.map((item, index) => (
                      item.provincia === destino.provincia && item.lugar === destino.lugar ?
                      <option value={JSON.stringify(item)} selected>
                          {item.lugar}, {item.provincia}
                        </option>
                        :
                        <option value={JSON.stringify(item)}>
                          {item.lugar}, {item.provincia}
                        </option>
                    ))}
                    </select>
                  </div>
                )}

                <div className='form-group'>
                  <label htmlFor='lugar'>Combi:</label>
                  <select
                    onChange={handleChangeCombi}
                    id='combi'
                    required
                    class='form-control'
                  >
                    {combis.map((item) => (
                      item.patente === combi.patente ?
                      <option value={JSON.stringify(item)} selected>
                          {item.modelo} ({item.patente})
                        </option>
                        :
                      <option value={JSON.stringify(item)}>
                        {item.modelo} ({item.patente})
                      </option>
                    ))}
                  </select>
                </div>

                <div className='form-group'>
                  <label htmlFor='lugar'>Horario:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='lugar'
                    value={horario}
                    aria-describedby='Lugar'
                    placeholder='Ingrese el horario'
                    required
                    onChange={handleChangeHorario}
                  />
                </div>

                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{backgroundColor: '#145572'}}
                >
                  Guardar ruta editada
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

export default Ruta;
