import React, {useState} from 'react';
import { Accordion, Card, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { eliminarReview, modificarReview } from '../../../../Redux/clienteDucks';

const { dateFormatPretty } = require('../../../../scripts/dateFormat');

//Implementado
const Review = (props) => {

  const dispatch = useDispatch();
  const sesion = useSelector((state) => state.combix.sesion);

  const [contenido, setContenido] = useState(props.item.contenido);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeContenido = (e) => {
    setContenido(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(modificarReview(contenido, sesion, props.item.fecha, props.item._id));
  };

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
              <h5 className='field-display'>{dateFormatPretty(props.item.fecha)}</h5>
            </div>
            <div className='row'>
              <h6 className='field-display'>{props.item.contenido}</h6>
            </div>
          </Accordion.Toggle>
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
        </Card.Header>
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
                Editar review
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
                  <label htmlFor='nombre'>Nuevo texto</label>
                  <input
                    required
                    value={contenido}
                    type='text'
                    className='form-control'
                    id='contenido'
                    aria-describedby='contenido'
                    onChange={handleChangeContenido}
                    style={{ wordBreak: 'break-word'}}
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{ backgroundColor: '#145572' }}
                >
                  Guardar review editado.
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
            <p>¿Está seguro que desea eliminar este review?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => handleClose()}>
              Cerrar
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                dispatch(eliminarReview(props.item._id, sesion));
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

export default Review;