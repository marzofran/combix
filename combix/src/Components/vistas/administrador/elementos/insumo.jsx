import React, { useState } from 'react';
import { Accordion, Card, Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { borrarInsumoFisica } from '../../../../Redux/Admin/insumosDucks';
import { darDeAltaInsumo } from '../../../../Redux/Admin/insumosDucks';
import {
  borrarInsumo,
  editarInsumo,
} from '../../../../Redux/Admin/insumosDucks';
const { toTitleCase } = require('../../../../scripts/toTitleCase');

//Implementado
const Insumo = (props) => {
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState(toTitleCase(props.item.nombre));
  const [tipo, setTipo] = useState(props.item.tipo);
  const [precio, setPrecio] = useState(
    parseFloat(props.item.precio).toFixed(2)
  );

  //Handlers del  modal de elimar
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };
  const handleChangeTipo = (e) => {
    setTipo(toTitleCase(e.target.value));
  };
  const handleChangePrecio = (e) => {
    setPrecio(parseFloat(e.target.value).toFixed(2));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editarInsumo(nombre, tipo, precio, props.item._id));
  };
  let clasesCss = 'db-element-header  ';

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
            eventKey='0'
          >
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Nombre:</label>
                <h7 className='field-display'>
                  {toTitleCase(props.item.nombre)}
                </h7>
              </div>
              <div className='col field-admin'>
                <label className='field-label'>Tipo:</label>
                <h7 className='field-display'>{props.item.tipo}</h7>
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
                  dispatch(borrarInsumoFisica(props.item._id));
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
                  dispatch(darDeAltaInsumo(props.item._id, props.item));
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
              <div className='col-6 field-admin'>
                <label className='field-label'>Precio:</label>
                <h7 className='field-display'>
                  ${parseFloat(props.item.precio).toFixed(2)}
                </h7>
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
        aria-labelledby='modalInsumo'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalInsumo'>
                Editar insumo: {toTitleCase(props.item.nombre)}
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
                  <label htmlFor='nombre'>Nuevo, Nombre</label>
                  <input
                    required
                    value={nombre}
                    type='text'
                    className='form-control'
                    id='nombre'
                    aria-describedby='Nombre'
                    onChange={handleChangeNombre}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='tipo'>Nuevo, Tipo</label>
                  <input
                    type='text'
                    value={tipo}
                    className='form-control'
                    id='tipo'
                    aria-describedby='Tipo'
                    required
                    onChange={handleChangeTipo}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='precio'>Nuevo, Precio</label>
                  <input
                    type='text'
                    value={precio}
                    className='form-control'
                    id='precio'
                    aria-describedby='Precio'
                    required
                    onChange={handleChangePrecio}
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{ backgroundColor: '#145572' }}
                >
                  Guardar insumo editado.
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
            <p>??Estas seguro que desea dar de baja este insumo?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => handleClose()}>
              Cerrar
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                dispatch(borrarInsumo(props.item._id));
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

export default Insumo;
