import React, { useState } from 'react';
import { Accordion, Card, Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  borrarCiudad,
  editarCiudad,
} from '../../../../Redux/Admin/ciudadesDucks';
import { darDeAltaCiudad } from '../../../../Redux/Admin/ciudadesDucks';
import { borradoFisico } from '../../../../Redux/Admin/ciudadesDucks';
const { toTitleCase } = require('../../../../scripts/toTitleCase');

//Implementado
const Ciudad = (props) => {
  const dispatch = useDispatch();
  const [provincia, setProvincia] = useState(toTitleCase(props.item.provincia));
  const [lugar, setLugar] = useState(toTitleCase(props.item.lugar));

  //Handlers del  modal de elimar
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeLugar = (e) => {
    setLugar(toTitleCase(e.target.value));
  };
  const handleChangeProvincia = (e) => {
    setProvincia(toTitleCase(e.target.value));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editarCiudad(lugar, provincia, props.item._id));
  };

  //Implementacion de mostar desactivados
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
            eventKey='1'
          >
            <div className='row'>
              <div className='col field-admin'>
                <label className='field-label'>Ciudad:</label>
                <h6 className='field-display'>
                  {toTitleCase(props.item.lugar)}
                </h6>
              </div>
              <div className='col field-admin'>
                <label className='field-label'>Provincia:</label>
                <h6 className='field-display'>
                  {toTitleCase(props.item.provincia)}
                </h6>
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
                  dispatch(borradoFisico(props.item._id));
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
                  dispatch(darDeAltaCiudad(props.item._id, props.item));
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
                Editar ciudad: {toTitleCase(props.item.lugar)},{' '}
                {toTitleCase(props.item.provincia)}
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
                  <label htmlFor='lugar'>Nueva, Provincia</label>
                  <input
                    required
                    type='text'
                    className='form-control'
                    id='lugar'
                    aria-describedby='Lugar'
                    value={provincia}
                    onChange={handleChangeProvincia}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='lugar'>Nueva, Ciudad</label>
                  <input
                    type='text'
                    className='form-control'
                    id='lugar'
                    aria-describedby='Lugar'
                    required
                    value={lugar}
                    onChange={handleChangeLugar}
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{ backgroundColor: '#145572' }}
                >
                  Guardar ciudad editada.
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
            <p>??Estas seguro que desea dar de baja esta ciudad?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => handleClose()}>
              Cerrar
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                dispatch(borrarCiudad(props.item._id));
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

export default Ciudad;
