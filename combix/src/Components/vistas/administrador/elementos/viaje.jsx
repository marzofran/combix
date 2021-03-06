import React, { useState } from 'react';
import { Accordion, Card, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { borrarViaje, editarViaje } from '../../../../Redux/Admin/viajesDucks';
import { darDeAltaViaje } from '../../../../Redux/Admin/viajesDucks';
import { borradoFisicoViajes } from '../../../../Redux/Admin/viajesDucks';
const { dateFormat } = require('../../../../scripts/dateFormat');
const { toTitleCase } = require('../../../../scripts/toTitleCase');

//Implementado, faltan cruds
const Viaje = (props) => {
  const dispatch = useDispatch();
  const [ruta, setRuta] = useState(props.item.ruta);
  const [fecha, setFecha] = useState(props.item.fecha);
  const [precio, setPrecio] = useState(
    parseFloat(props.item.precio).toFixed(2)
  );

  //Handlers del  modal de elimar
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeRuta = (e) => {
    let obj = JSON.parse(e.target.value);
    setRuta(obj);
  };
  const handleChangeFecha = (e) => {
    setFecha(e.target.value);
  };
  const handleChangePrecio = (e) => {
    let obj = JSON.parse(e.target.value);
    setPrecio(obj);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editarViaje(ruta, fecha, precio, props.item._id));
  };

  const rutas = useSelector((store) => store.rutas.elementos);
  let clasesCss = 'db-element-header  ';

  if (props.item.unavailable) {
    clasesCss = 'db-element-header-variant ';
  }
  rutas.forEach(function (ruta, index, object) {
    if (ruta.unavailable === true) {
      object.splice(index, 1);
    }
  });

  return (
    <Accordion className='row db-element'>
      <Card className='col'>
        <Card.Header className={clasesCss + 'row'}>
          <Accordion.Toggle
            className={clasesCss + 'col-11'}
            as={Card.Body}
            eventKey='0'
          >
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Ruta:</label>
                <h6 className='field-display'>
                  {toTitleCase(props.item?.ruta.origen?.lugar)},{' '}
                  {toTitleCase(props.item?.ruta.origen?.provincia)} {' -> '}
                  {toTitleCase(props.item?.ruta.destino?.lugar)},{' '}
                  {toTitleCase(props.item?.ruta.destino?.provincia)}
                </h6>
              </div>
            </div>
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Fecha:</label>
                <h6 className='field-display'>
                  {dateFormat(props.item.fecha)}
                </h6>
              </div>
              <div className='col field-admin'>
                <label className='field-label'>Horario:</label>
                <h6 className='field-display'>{props.item.ruta.horario}</h6>
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
                onClick={() => {
                  dispatch(borradoFisicoViajes(props.item._id));
                }}
              >
                <div className='content'>
                  <i class='fa fa-times' aria-hidden='true'></i>
                </div>
              </button>
              <button
                className='field-btn bg-success
box square'
                onClick={() => {
                  dispatch(darDeAltaViaje(props.item._id, props.item));
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
          <Card.Body>
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Precio:</label>
                <h6 className='field-display'>
                  ${parseFloat(props.item.precio).toFixed(2)}
                </h6>
              </div>
              <div className='col field-admin'>
                <label className='field-label'>Combi:</label>
                <h6 className='field-display'>
                  {props.item.ruta.combi?.modelo}(
                  {props.item.ruta.combi?.patente})
                </h6>
              </div>
            </div>
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Chofer:</label>
                <h6 className='field-display'>
                  {props.item.ruta.combi?.chofer?.nombre}{' '}
                  {props.item.ruta.combi?.chofer?.apellido} (
                  {props.item.ruta.combi?.chofer?.mail})
                </h6>
              </div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <div
        className='modal fade'
        id={props.item._id}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='modalViaje'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalViaje'>
                Editar viaje: {toTitleCase(props.item.ruta?.origen?.lugar)}{' '}
                {' -> '}
                {toTitleCase(props.item.ruta?.destino?.lugar)},{' '}
                {dateFormat(props.item.fecha, 'dd/mm/yyyy')} (
                {props.item?.ruta.horario})
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
                    {rutas.map((item, index) =>
                      item.ruta === ruta ? (
                        <option value={JSON.stringify(item)} selected>
                          {toTitleCase(item.origen.lugar)},{' '}
                          {toTitleCase(item.origen.provincia)} {' -> '}
                          {toTitleCase(item.destino.lugar)},{' '}
                          {toTitleCase(item.destino.provincia)} ({item.horario})
                        </option>
                      ) : (
                        <option value={JSON.stringify(item)}>
                          {toTitleCase(item.origen.lugar)},{' '}
                          {toTitleCase(item.origen.provincia)} {' -> '}
                          {toTitleCase(item.destino.lugar)},{' '}
                          {toTitleCase(item.destino.provincia)} ({item.horario})
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className='form-group'>
                  <label htmlFor='fecha'>Fecha:</label>
                  <input
                    type='date'
                    className='form-control'
                    id='fecha'
                    value={fecha}
                    aria-describedby='Fecha'
                    placeholder='Seleccione la fecha'
                    required
                    onChange={handleChangeFecha}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='precio'>Precio:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='precio'
                    value={precio}
                    aria-describedby='Precio'
                    placeholder='Seleccione el precio'
                    required
                    onChange={handleChangePrecio}
                  />
                </div>

                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{ backgroundColor: '#145572' }}
                >
                  Guardar viaje editado
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
            <p>??Estas seguro que desea eliminar este viaje?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => handleClose()}>
              Cerrar
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                dispatch(borrarViaje(props.item._id));
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

export default Viaje;
