import React, { useState } from 'react';
import { Accordion, Card, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { borrarRuta, editarRuta } from '../../../../Redux/Admin/rutasDucks';
import { darDeAltaRuta } from '../../../../Redux/Admin/rutasDucks';
const { toTitleCase } = require('../../../../scripts/toTitleCase');

//Implementado
const Ruta = (props) => {
  const dispatch = useDispatch();

  const [origen, setOrigen] = useState(props.item.origen);
  const [destino, setDestino] = useState(props.item.destino);
  const [combi, setCombi] = useState(props.item.combi);
  const [horario, setHorario] = useState(props.item.horario);

  //Handlers del  modal de elimar
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeOrigen = (e) => {
    let obj = JSON.parse(e.target.value);
    setOrigen(obj);
  };
  const handleChangeDestino = (e) => {
    let obj = JSON.parse(e.target.value);
    setDestino(obj);
  };
  const handleChangeCombi = (e) => {
    let obj = JSON.parse(e.target.value);
    setCombi(obj);
  };
  const handleChangeHorario = (e) => {
    setHorario(e.target.value);
  };
  const handleSubmit = (e) => {
    if (origen._id === destino._id) {
      e.preventDefault();
      alert('Origen y destino no pueden ser iguales');
    } else {
      e.preventDefault();
      dispatch(editarRuta(origen, destino, combi, horario, props.item._id));
    }
  };

  const ciudades = useSelector((store) => store.ciudades.elementos);
  const combis = useSelector((store) => store.combis.elementos);
  let clasesCss = 'db-element-header  ';
  ciudades.forEach(function (ciudad, index, object) {
    if (ciudad.unavailable === true) {
      object.splice(index, 1);
    }
  });
  combis.forEach(function (combi, index, object) {
    if (combi.unavailable === true) {
      object.splice(index, 1);
    }
  });
  if (props.item.unavailable) {
    clasesCss = 'db-element-header-variant ';
  }
  return (
    <Accordion className='row db-element'>
      <Card className='col'>
        <Card.Header className={clasesCss + 'row'}>
          <Accordion.Toggle
            className={clasesCss + 'col-11'}
            as={Card.Body}
            eventKey='1'
          >
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Salida:</label>
                <h6 className='field-display'>
                  {toTitleCase(props.item.origen?.lugar)},{' '}
                  {toTitleCase(props.item.origen?.provincia)}
                </h6>
              </div>
              <div className='col field-admin'>
                <label className='field-label'>Destino:</label>
                <h6 className='field-display'>
                  {toTitleCase(props.item.destino?.lugar)},{' '}
                  {toTitleCase(props.item.destino?.provincia)}
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
          {!props.item.unavailable ? (
            <div className='col-1'>
              <button
                data-toggle='modal'
                data-target={'#' + props.item._id}
                className='field-btn edit-btn box square'
              >
                <div className='content'>
                  <i class='fa fa-pencil' aria-hidden='true' />
                </div>
              </button>
              <button
                className='field-btn delete-btn box square'
                onClick={() => {
                  handleShow();
                }}
              >
                <div className='content'>
                  <i class='fa fa-trash' aria-hidden='true' />
                </div>
              </button>
            </div>
          ) : (
            <div className='col-1'>
              <button
                className='field-btn delete-btn box square'
                onClick={() => {}}
              >
                <div className='content'>
                  <i class='fa fa-times' aria-hidden='true'></i>
                </div>
              </button>
              <button
                className='field-btn bg-success
box square'
                onClick={() => {
                  dispatch(darDeAltaRuta(props.item._id));
                }}
              >
                <div className='content'>
                  <i class='fa fa-arrow-up' aria-hidden='true'></i>
                </div>
              </button>
            </div>
          )}
        </Card.Header>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>I have no body</Card.Body>
        </Accordion.Collapse>
      </Card>
      <div
        className='modal fade'
        id={props.item._id}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='modalCiudad'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalCiudad'>
                Editar ruta: {toTitleCase(props.item.origen?.lugar)} {' -> '}
                {toTitleCase(props.item.destino?.lugar)} ({props.item.horario})
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
                    {ciudades.map((item, index) =>
                      item.provincia === origen.provincia &&
                      item.lugar === origen.lugar ? (
                        <option value={JSON.stringify(item)} selected>
                          {toTitleCase(item.lugar)},{' '}
                          {toTitleCase(item.provincia)}
                        </option>
                      ) : (
                        <option value={JSON.stringify(item)}>
                          {toTitleCase(item.lugar)},{' '}
                          {toTitleCase(item.provincia)}
                        </option>
                      )
                    )}
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
                      {ciudades.map((item, index) =>
                        item.provincia === destino.provincia &&
                        item.lugar === destino.lugar ? (
                          <option value={JSON.stringify(item)} selected>
                            {toTitleCase(item.lugar)},{' '}
                            {toTitleCase(item.provincia)}
                          </option>
                        ) : (
                          <option value={JSON.stringify(item)}>
                            {toTitleCase(item.lugar)},{' '}
                            {toTitleCase(item.provincia)}
                          </option>
                        )
                      )}
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
                    {combis.map((item) =>
                      item.patente === combi.patente ? (
                        <option value={JSON.stringify(item)} selected>
                          {item.modelo} ({item.patente})
                        </option>
                      ) : (
                        <option value={JSON.stringify(item)}>
                          {item.modelo} ({item.patente})
                        </option>
                      )
                    )}
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
                  style={{ backgroundColor: '#145572' }}
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminacion</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>¿Estas seguro que desea dar de baja esta ruta?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => handleClose()}>
              Cerrar
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                dispatch(borrarRuta(props.item._id));
                handleClose();
              }}
            >
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Accordion>
  );
};

export default Ruta;
